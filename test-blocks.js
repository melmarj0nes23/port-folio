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
  const { data: portfolios } = await supabase.from('portfolios').select('id').limit(1);
  if (!portfolios || portfolios.length === 0) return;
  const { data: pages } = await supabase.from('pages').select('id').eq('portfolio_id', portfolios[0].id).limit(1);
  if (!pages || pages.length === 0) return;
  
  const { data: blocks } = await supabase.from('blocks').select('*').eq('page_id', pages[0].id).eq('type', 'about');
  console.log("Blocks:", JSON.stringify(blocks, null, 2));
}

run();
