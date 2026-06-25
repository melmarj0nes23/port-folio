'use client'

import { MinimalTemplate } from '@/components/templates/MinimalTemplate'
import { DeveloperTemplate } from '@/components/templates/DeveloperTemplate'
import { CreativeTemplate } from '@/components/templates/CreativeTemplate'
import { ProfessionalTemplate } from '@/components/templates/ProfessionalTemplate'
import { ExecutiveTemplate } from '@/components/templates/ExecutiveTemplate'
import { SocialTemplate } from '@/components/templates/SocialTemplate'
import { MagazineTemplate } from '@/components/templates/MagazineTemplate'
import { EliteDashboardTemplate } from '@/components/templates/EliteDashboardTemplate'
import { BentoShowcaseTemplate } from '@/components/templates/BentoShowcaseTemplate'
import { InteractiveTemplate } from '@/components/templates/InteractiveTemplate'

export function TemplatePreview({ template, profile, isPreview = false }: { template: string, profile: any, isPreview?: boolean }) {
  const dummyProjects = [{ title: 'Payments Dashboard', description: 'Redesigned the core payments flow.', tech_stack: ['React', 'Figma'] }]
  const dummyExp = [{ role: 'Senior Designer', company: 'Tech Corp', start_date: '2020', end_date: 'Present' }]
  
  const props = {
    profile: profile || { full_name: 'Alex Chen', headline: 'Product Designer & Engineer', about: 'Building digital experiences.', username: 'alex' },
    portfolio: { theme_color: '#3b82f6', font: 'Inter' },
    projects: dummyProjects,
    experience: dummyExp,
    blocks: [],
    isEditor: false,
    isPreview
  }

  switch (template) {
    case 'Minimal': return <MinimalTemplate {...props} isPreview={true} />
    case 'Developer': return <DeveloperTemplate {...props} isPreview={true} />
    case 'Creative': return <CreativeTemplate {...props} isPreview={true} />
    case 'Professional': return <ProfessionalTemplate {...props} isPreview={true} />
    case 'Executive': return <ExecutiveTemplate {...props} isPreview={true} />
    case 'Social': return <SocialTemplate {...props} isPreview={true} />
    case 'Magazine': return <MagazineTemplate {...props} isPreview={true} />
    case 'Elite Dashboard': return <EliteDashboardTemplate {...props} isPreview={true} />
    case 'Bento Showcase': return <BentoShowcaseTemplate {...props} isPreview={true} />
    case 'Interactive': return <InteractiveTemplate {...props} isPreview={true} />
    default: return <MinimalTemplate {...props} isPreview={true} />
  }
}
