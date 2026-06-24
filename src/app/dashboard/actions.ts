'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPortfolio() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Insert a new portfolio with defaults
  const { data, error } = await supabase
    .from('portfolios')
    .insert({
      user_id: user.id,
      template_id: 1,
      theme_color: '#030213',
      font: 'Inter',
      is_published: false
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating portfolio:', error)
    throw new Error('Could not create portfolio')
  }

  await seedPortfolioData(supabase, data.id);

  revalidatePath('/dashboard')
  redirect(`/editor/${data.id}`)
}

export async function createPortfolioWithTemplate(templateName: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  let templateId = 1
  switch (templateName) {
    case 'minimal': templateId = 1; break;
    case 'developer': templateId = 2; break;
    case 'creative': templateId = 3; break;
    case 'professional': templateId = 4; break;
    case 'executive': templateId = 5; break;
    case 'social': templateId = 6; break;
    case 'magazine': templateId = 7; break;
    case 'elite dashboard': templateId = 8; break;
    case 'bento showcase': templateId = 9; break;
  }

  const { data, error } = await supabase
    .from('portfolios')
    .insert({
      user_id: user.id,
      template_id: templateId,
      theme_color: '#030213',
      font: 'Inter',
      is_published: false
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating portfolio:', error)
    throw new Error('Could not create portfolio')
  }

  await seedPortfolioData(supabase, data.id);

  revalidatePath('/dashboard')
  redirect(`/editor/${data.id}`)
}

async function seedPortfolioData(supabase: any, portfolioId: string) {
  await supabase.from('projects').insert([
    { portfolio_id: portfolioId, title: 'Payments Onboarding Redesign', description: 'Redesigned the onboarding flow, reducing drop-off by 34%.', link: 'https://github.com/example/payments', tech_stack: ['React', 'TypeScript'] },
    { portfolio_id: portfolioId, title: 'Design System v2', description: 'Built a component library used across 12 products. 220+ components.', link: 'https://github.com/example/design-system', tech_stack: ['React', 'Tailwind'] }
  ]);

  await supabase.from('experience').insert([
    { portfolio_id: portfolioId, company: 'Stripe', role: 'Senior Product Designer', start_date: '2022', end_date: 'Present', description: 'Leading design for the merchant payments experience.' },
    { portfolio_id: portfolioId, company: 'Airbnb', role: 'Product Designer', start_date: '2019', end_date: '2022', description: 'Worked on Host tools and Experiences verticals.' }
  ]);

  const { data: page } = await supabase.from('pages').insert({
    portfolio_id: portfolioId,
    slug: 'home',
    title: 'Home',
    order_index: 0
  }).select().single();

  if (page) {
    const blocks = [
      { page_id: page.id, type: 'hero', order_index: 0, content: {} },
      { page_id: page.id, type: 'about', order_index: 1, content: {} },
      { page_id: page.id, type: 'skills', order_index: 2, content: {} },
      { page_id: page.id, type: 'education', order_index: 3, content: {} },
      { page_id: page.id, type: 'experience', order_index: 4, content: {} },
      { page_id: page.id, type: 'projects', order_index: 5, content: {} },
      { page_id: page.id, type: 'certifications', order_index: 6, content: {} },
      { page_id: page.id, type: 'contact', order_index: 7, content: {} }
    ];
    await supabase.from('blocks').insert(blocks);
  }
}

export async function togglePublishStatus(portfolioId: string, currentStatus: boolean) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('portfolios')
    .update({ is_published: !currentStatus })
    .eq('id', portfolioId)
    
  if (error) {
    console.error('Error updating status:', error)
    throw new Error('Could not update status')
  }
  
  revalidatePath('/dashboard')
}

export async function deletePortfolio(portfolioId: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('portfolios')
    .delete()
    .eq('id', portfolioId)

  if (error) {
    console.error('Error deleting portfolio:', error)
    throw new Error('Could not delete portfolio')
  }

  revalidatePath('/dashboard')
}
