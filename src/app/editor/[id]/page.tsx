import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import EditorClient from '@/components/editor/EditorClient'

export default async function EditorPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch portfolio
  const { data: portfolio } = await supabase
    .from('portfolios')
    .select('*')
    .eq('id', id)
    .single()

  if (!portfolio || portfolio.user_id !== user.id) {
    redirect('/dashboard') // Or show a 404/not authorized
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('users_profile')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // Fetch projects
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('portfolio_id', id)
    .order('created_at', { ascending: true })

  // Fetch experience
  const { data: experience } = await supabase
    .from('experience')
    .select('*')
    .eq('portfolio_id', id)
    .order('start_date', { ascending: false })

  // Fetch galleries
  const { data: galleries } = await supabase
    .from('galleries')
    .select('*')
    .eq('portfolio_id', id)

  // Fetch pages
  let { data: pages } = await supabase
    .from('pages')
    .select('*')
    .eq('portfolio_id', id)
    .order('order_index', { ascending: true })

  // Auto-create default page for older portfolios
  if (!pages || pages.length === 0) {
    const { data: newPage } = await supabase.from('pages').insert({
      portfolio_id: id,
      slug: 'home',
      title: 'Home',
      order_index: 0
    }).select().single();
    if (newPage) pages = [newPage];
  }

  // Fetch blocks for those pages
  let blocks: any[] = []
  if (pages && pages.length > 0) {
    const pageIds = pages.map((p: any) => p.id)
    const { data: fetchedBlocks } = await supabase
      .from('blocks')
      .select('*')
      .in('page_id', pageIds)
      .order('order_index', { ascending: true })
    
    blocks = fetchedBlocks || []

    // Auto-create default blocks if none exist
    if (blocks.length === 0) {
      const pageId = pages[0].id;
      const defaultBlocks = [
        { page_id: pageId, type: 'hero', order_index: 0, content: {} },
        { page_id: pageId, type: 'about', order_index: 1, content: {} },
        { page_id: pageId, type: 'skills', order_index: 2, content: {} },
        { page_id: pageId, type: 'education', order_index: 3, content: {} },
        { page_id: pageId, type: 'experience', order_index: 4, content: {} },
        { page_id: pageId, type: 'projects', order_index: 5, content: {} },
        { page_id: pageId, type: 'certifications', order_index: 6, content: {} },
        { page_id: pageId, type: 'contact', order_index: 7, content: {} }
      ];
      const { data: newBlocks } = await supabase.from('blocks').insert(defaultBlocks).select();
      if (newBlocks) blocks = newBlocks;
    }
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      <EditorClient
        initialPortfolio={portfolio}
        initialProfile={profile}
        initialProjects={projects || []}
        initialExperience={experience || []}
        initialGalleries={galleries || []}
        initialPages={pages || []}
        initialBlocks={blocks || []}
        username={profile?.username}
      />
    </div>
  )
}
