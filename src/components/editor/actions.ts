'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function savePortfolioData({
  portfolio,
  profile,
  projects,
  experience,
  galleries,
  pages,
  blocks,
}: {
  portfolio: any
  profile: any
  projects: any[]
  experience: any[]
  galleries?: any[]
  pages?: any[]
  blocks?: any[]
}) {
  const supabase = await createClient()

  // 1. Update Profile
  if (profile) {
    await supabase.from('users_profile').update({
      full_name: profile.full_name,
      headline: profile.headline,
      bio: profile.bio,
      avatar_url: profile.avatar_url
    }).eq('id', profile.id)
  }

  // 2. Update Portfolio settings
  if (portfolio) {
    await supabase.from('portfolios').update({
      template_id: portfolio.template_id,
      theme_color: portfolio.theme_color,
      font: portfolio.font,
      slug: portfolio.slug,
      is_published: portfolio.is_published,
      updated_at: new Date().toISOString()
    }).eq('id', portfolio.id)
  }

  async function syncCollection(table: string, items: any[], parentColumn: string, parentId: string) {
    if (!items) return;
    
    // Filter out items without an ID or with fake non-UUID IDs
    const validItems = items.filter(i => i.id && i.id.length === 36);
    const keepIds = validItems.map(i => i.id);
    
    // 1. Delete removed items
    const { data: existing } = await supabase.from(table).select('id').eq(parentColumn, parentId);
    if (existing) {
      const toDelete = existing.map((e: any) => e.id).filter((id: string) => !keepIds.includes(id));
      if (toDelete.length > 0) {
        const { error: delErr } = await supabase.from(table).delete().in('id', toDelete);
        if (delErr) console.error(`Error deleting from ${table}:`, delErr);
      }
    }

    // 2. Upsert current items
    if (items.length > 0) {
      const toUpsert = items.map(item => {
        const payload = { ...item, [parentColumn]: parentId };
        // Remove fake string IDs so Supabase can generate real UUIDs for them
        if (payload.id && payload.id.length !== 36) {
          delete payload.id;
        }
        // CRITICAL FIX: Remove created_at and updated_at to prevent bulk upsert from setting missing fields to NULL
        delete payload.created_at;
        delete payload.updated_at;
        return payload;
      });
      const { error } = await supabase.from(table).upsert(toUpsert);
      if (error) {
        console.error(`Error upserting ${table}:`, error);
      }
    }
  }

  await syncCollection('projects', projects, 'portfolio_id', portfolio.id);
  await syncCollection('experience', experience, 'portfolio_id', portfolio.id);
  if (galleries) await syncCollection('galleries', galleries, 'portfolio_id', portfolio.id);
  
  if (pages && pages.length > 0) {
    await syncCollection('pages', pages, 'portfolio_id', portfolio.id);
    if (blocks && blocks.length > 0) {
       // Since blocks belong to pages, and currently we only have one page (home), 
       // we sync blocks to that page_id. The frontend should be passing the correct page_id.
       const pageId = pages[0].id;
       await syncCollection('blocks', blocks, 'page_id', pageId);
    }
  }

  revalidatePath(`/editor/${portfolio.id}`)
}
