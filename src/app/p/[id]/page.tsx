import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { MinimalTemplate } from '@/components/templates/MinimalTemplate'
import { DeveloperTemplate } from '@/components/templates/DeveloperTemplate'
import { CreativeTemplate } from '@/components/templates/CreativeTemplate'
import { ProfessionalTemplate } from '@/components/templates/ProfessionalTemplate'
import { ExecutiveTemplate } from '@/components/templates/ExecutiveTemplate'
import { SocialTemplate } from '@/components/templates/SocialTemplate'
import { MagazineTemplate } from '@/components/templates/MagazineTemplate'
import { EliteDashboardTemplate } from '@/components/templates/EliteDashboardTemplate'
import { BentoShowcaseTemplate } from '@/components/templates/BentoShowcaseTemplate'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()

  const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)
  
  let query = supabase.from('portfolios').select('user_id')
  if (isUuid) {
    query = query.eq('id', id)
  } else {
    query = query.eq('slug', id)
  }
  
  const { data: portfolio } = await query.single()
  
  if (portfolio?.user_id) {
    const { data: profile } = await supabase
      .from('users_profile')
      .select('full_name')
      .eq('user_id', portfolio.user_id)
      .single()
      
    if (profile?.full_name) {
      return {
        title: `${profile.full_name}`,
        description: `View ${profile.full_name}'s professional portfolio.`
      }
    }
  }

  return {
    title: 'Portfolio'
  }
}

export default async function PublicPortfolioPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const supabase = await createClient()

  const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)

  // Fetch portfolio
  let query = supabase.from('portfolios').select('*')
  if (isUuid) {
    query = query.eq('id', id)
  } else {
    query = query.eq('slug', id)
  }
  
  const { data: portfolio } = await query.single()

  if (!portfolio) {
    notFound()
  }

  // We must use the resolved portfolio.id for subsequent queries, in case the slug was used
  const portfolioId = portfolio.id


  // Fetch user profile
  const { data: profile } = await supabase
    .from('users_profile')
    .select('*')
    .eq('user_id', portfolio.user_id)
    .single()

  // Fetch projects
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('portfolio_id', portfolioId)
    .order('created_at', { ascending: true })

  // Fetch experience
  const { data: experience } = await supabase
    .from('experience')
    .select('*')
    .eq('portfolio_id', portfolioId)
    .order('start_date', { ascending: false })

  // Fetch galleries
  const { data: galleries } = await supabase
    .from('galleries')
    .select('*')
    .eq('portfolio_id', portfolioId)

  // Fetch pages
  const { data: pages } = await supabase
    .from('pages')
    .select('*')
    .eq('portfolio_id', portfolioId)
    .order('order_index', { ascending: true })

  // Fetch blocks
  let blocks: any[] = []
  if (pages && pages.length > 0) {
    const pageIds = pages.map((p: any) => p.id)
    const { data: fetchedBlocks } = await supabase
      .from('blocks')
      .select('*')
      .in('page_id', pageIds)
      .order('order_index', { ascending: true })
    blocks = fetchedBlocks || []
  }

  const props = {
    portfolio,
    profile,
    projects: projects || [],
    experience: experience || [],
    galleries: galleries || [],
    pages: pages || [],
    blocks: blocks || [],
    isEditor: false
  }

  switch (portfolio.template_id) {
    case 1:
      return <MinimalTemplate {...props} />
    case 2:
      return <DeveloperTemplate {...props} />
    case 3:
      return <CreativeTemplate {...props} />
    case 4:
      return <ProfessionalTemplate {...props} />
    case 5:
      return <ExecutiveTemplate {...props} />
    case 6:
      return <SocialTemplate {...props} />
    case 7: return <MagazineTemplate {...props} />
    case 8: return <EliteDashboardTemplate {...props} />
    case 9: return <BentoShowcaseTemplate {...props} />
    default:
      return <MinimalTemplate {...props} />
  }
}
