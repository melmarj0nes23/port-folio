const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Or NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('experience').upsert([{
    id: "9c08db9a-1789-43f9-9fb5-b71401cc0bab", // some fake uuid
    role: "Test",
    company: "Test Co",
    start_date: "2024",
    end_date: "Present",
    portfolio_id: "9c08db9a-1789-43f9-9fb5-b71401cc0bab" // use the portfolio_id from logs
  }]).select();
  console.log("Error:", error);
  console.log("Data:", data);
}
test();
