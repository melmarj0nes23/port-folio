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
  if (!portfolios || portfolios.length === 0) {
    console.log("No portfolios found");
    return;
  }
  const portfolioId = portfolios[0].id;
  const table = 'experience';
  
  // Test safe deletion
  const keepIds = ['00000000-0000-0000-0000-000000000000'];
  const { data: existing, error: err1 } = await supabase.from(table).select('id').eq('portfolio_id', portfolioId);
  console.log("Existing:", existing);

  if (existing) {
    const toDelete = existing.map(e => e.id).filter(id => !keepIds.includes(id));
    if (toDelete.length > 0) {
      console.log("To delete:", toDelete);
      const { error: delErr } = await supabase.from(table).delete().in('id', toDelete);
      console.log("Delete error:", delErr);
    }
  }

  // Test upserting a new record with crypto.randomUUID
  const crypto = require('crypto');
  const fakeId = crypto.randomUUID();
  console.log("Fake ID:", fakeId);
  const { data, error: upErr } = await supabase.from(table).upsert([{
    id: fakeId,
    portfolio_id: portfolioId,
    company: 'Test Company DB Check',
    role: 'Test Role',
    start_date: '2024',
    end_date: 'Present'
  }]).select();

  console.log("Upsert Error:", upErr);
  console.log("Upsert Data:", data);
}

run();
