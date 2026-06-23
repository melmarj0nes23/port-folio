import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: portfolios } = await supabase.from('portfolios').select('id').limit(1);
    if (!portfolios || portfolios.length === 0) {
      return NextResponse.json({ error: "No portfolios found" });
    }
    const portfolioId = portfolios[0].id;

    const table = 'experience';
    const parentColumn = 'portfolio_id';
    const parentId = portfolioId;
    const keepIds = ['00000000-0000-0000-0000-000000000000'];

    const { data: existing, error: err1 } = await supabase.from(table).select('id').eq(parentColumn, parentId);
    if (err1) throw err1;

    let delErr = null;
    if (existing) {
      const toDelete = existing.map((e: any) => e.id).filter((id: string) => !keepIds.includes(id));
      if (toDelete.length > 0) {
        const { error } = await supabase.from(table).delete().in('id', toDelete);
        delErr = error;
      }
    }

    const fakeId = crypto.randomUUID();
    const { error: upErr } = await supabase.from(table).upsert([{
      id: fakeId,
      portfolio_id: portfolioId,
      company: 'Test Company',
      role: 'Test Role',
      start_date: '2024',
      end_date: 'Present'
    }]);

    return NextResponse.json({ 
      success: true, 
      portfolioId, 
      existingIds: existing?.map(e => e.id),
      delErr,
      upErr
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
}
