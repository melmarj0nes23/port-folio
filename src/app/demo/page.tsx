import EditorClient from '@/components/editor/EditorClient'

export default function DemoPage() {
  const mockPortfolio = {
    id: 'demo-portfolio',
    user_id: 'demo-user',
    template_id: 2, // Developer Template
    is_published: false,
    slug: 'demo-mode',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  const mockProfile = {
    id: 'demo-profile',
    user_id: 'demo-user',
    full_name: 'Alex Developer',
    username: 'alexdev',
    email: 'alex@example.com'
  }

  const mockProjects = [
    {
      id: 'proj-1',
      portfolio_id: 'demo-portfolio',
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce platform built with Next.js, Stripe, and Tailwind CSS. Features real-time inventory and seamless checkout.',
      tech_stack: ['Next.js', 'React', 'TypeScript', 'Stripe', 'Supabase'],
      image_url: '',
      project_url: 'https://example.com',
      created_at: new Date().toISOString()
    },
    {
      id: 'proj-2',
      portfolio_id: 'demo-portfolio',
      title: 'AI Image Generator',
      description: 'An open-source AI image generator utilizing Stable Diffusion APIs. Includes user authentication and a gallery for saved generations.',
      tech_stack: ['Python', 'FastAPI', 'React', 'Tailwind CSS'],
      image_url: '',
      project_url: 'https://example.com',
      created_at: new Date().toISOString()
    }
  ]

  const mockExperience = [
    {
      id: 'exp-1',
      portfolio_id: 'demo-portfolio',
      company: 'TechCorp Inc.',
      role: 'Senior Frontend Engineer',
      description: 'Led the frontend team in migrating a legacy monolithic application to a modern micro-frontend architecture using React and Webpack.',
      start_date: '2021-01-01',
      end_date: null, // Present
      is_current: true
    },
    {
      id: 'exp-2',
      portfolio_id: 'demo-portfolio',
      company: 'Startup Solutions',
      role: 'Full Stack Developer',
      description: 'Developed scalable REST APIs in Node.js and built responsive user interfaces using Vue.js and SCSS.',
      start_date: '2018-05-01',
      end_date: '2020-12-31',
      is_current: false
    }
  ]

  const mockPages = [
    {
      id: 'page-1',
      portfolio_id: 'demo-portfolio',
      title: 'Home',
      slug: 'home',
      order_index: 0
    }
  ]

  const mockBlocks = [
    { id: 'block-1', page_id: 'page-1', type: 'hero', order_index: 0, content: { headline: 'Building digital products, brands, and experiences.', subheadline: 'I am a software engineer specializing in building exceptional digital experiences. Currently, I am focused on building accessible, human-centered products.', status: 'Online & Deploying' } },
    { id: 'block-2', page_id: 'page-1', type: 'about', order_index: 1, content: { text: 'I am a software developer based in San Francisco with a passion for building scalable and maintainable web applications. I love solving complex problems and learning new technologies.' } },
    { id: 'block-3', page_id: 'page-1', type: 'skills', order_index: 2, content: { items: ['JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Git'] } },
    { id: 'block-4', page_id: 'page-1', type: 'experience', order_index: 3, content: {} },
    { id: 'block-5', page_id: 'page-1', type: 'projects', order_index: 4, content: {} },
    { id: 'block-6', page_id: 'page-1', type: 'contact', order_index: 5, content: { email: 'hello@alexdev.com', github: 'github.com/alexdev', twitter: '@alexdev' } }
  ]

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
      <EditorClient
        initialPortfolio={mockPortfolio}
        initialProfile={mockProfile}
        initialProjects={mockProjects}
        initialExperience={mockExperience}
        initialGalleries={[]}
        initialPages={mockPages}
        initialBlocks={mockBlocks}
        username={mockProfile.username}
        isDemo={true}
      />
    </div>
  )
}
