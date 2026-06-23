const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if (key && val.length) acc[key] = val.join('=').replace(/"/g, '');
  return acc;
}, {});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: portfolios, error: pErr } = await supabase.from('portfolios').select('id, user_id').limit(1);
  if (pErr) return console.log("Portfolios error:", pErr);
  if (!portfolios || portfolios.length === 0) {
    console.log("No portfolios found in db.");
    return;
  }
  const pid = portfolios[0].id;
  console.log("Found portfolio:", pid);

  const { data: pages } = await supabase.from('pages').select('id').eq('portfolio_id', pid);
  console.log("Pages:", pages);
  
  if (pages && pages.length > 0) {
    const { data: blocks } = await supabase.from('blocks').select('*').eq('page_id', pages[0].id).order('order_index');
    console.log("Blocks:", JSON.stringify(blocks.map(b => ({ type: b.type, content: b.content })), null, 2));
  }
}
run();
