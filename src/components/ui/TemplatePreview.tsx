'use client'

import { MinimalTemplate } from '@/components/templates/MinimalTemplate'
import { DeveloperTemplate } from '@/components/templates/DeveloperTemplate'
import { CreativeTemplate } from '@/components/templates/CreativeTemplate'
import { ProfessionalTemplate } from '@/components/templates/ProfessionalTemplate'
import { ExecutiveTemplate } from '@/components/templates/ExecutiveTemplate'
import { SocialTemplate } from '@/components/templates/SocialTemplate'

export function TemplatePreview({ templateName }: { templateName: string }) {
  const dummyProfile = { full_name: 'Alex Chen', headline: 'Senior Product Designer', bio: 'I design products used by millions of people. Currently focused on payments infrastructure and developer tools.', skills: ['UI/UX', 'Prototyping', 'Design Systems'] }
  const dummyProjects = [{ title: 'Payments Dashboard', description: 'Redesigned the core payments flow.', tech_stack: ['React', 'Figma'] }]
  const dummyExperience = [{ role: 'Senior Designer', company: 'Stripe', start_date: '2021', end_date: 'Present', description: 'Leading design for merchant products.' }]
  const props = { profile: dummyProfile, projects: dummyProjects, experience: dummyExperience, portfolio: {} }

  switch (templateName) {
    case 'Minimal': return <MinimalTemplate {...props} isPreview={true} />
    case 'Developer': return <DeveloperTemplate {...props} isPreview={true} />
    case 'Creative': return <CreativeTemplate {...props} isPreview={true} />
    case 'Professional': return <ProfessionalTemplate {...props} isPreview={true} />
    case 'Executive': return <ExecutiveTemplate {...props} isPreview={true} />
    case 'Social': return <SocialTemplate {...props} isPreview={true} />
    default: return null
  }
}
