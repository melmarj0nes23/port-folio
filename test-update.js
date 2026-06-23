const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if (key && val.length) acc[key] = val.join('=').replace(/"/g, '');
  return acc;
}, {});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data: portfolios } = await supabase.from('portfolios').select('id').limit(1);
  if (!portfolios || portfolios.length === 0) return console.log("no portfolios");
  const pid = portfolios[0].id;
  
  const { data: pages } = await supabase.from('pages').select('id').eq('portfolio_id', pid).limit(1);
  if (!pages || pages.length === 0) return console.log("no pages");
  
  const { data: blocks } = await supabase.from('blocks').select('*').eq('page_id', pages[0].id);
  console.log("Blocks before:", blocks.map(b => b.content));

  // Let's modify a block
  const blockToModify = blocks.find(b => b.type === 'about');
  if (blockToModify) {
    const newContent = { about: "TEST EDIT " + Date.now() };
    const { error } = await supabase.from('blocks').upsert([{
      ...blockToModify,
      content: newContent
    }]);
    console.log("Upsert error:", error);
  }

  const { data: blocksAfter } = await supabase.from('blocks').select('*').eq('page_id', pages[0].id);
  console.log("Blocks after:", blocksAfter.map(b => b.content));
}

test();
