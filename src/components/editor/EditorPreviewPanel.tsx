'use client'

import { MinimalTemplate } from '../templates/MinimalTemplate'
import { DeveloperTemplate } from '../templates/DeveloperTemplate'
import { CreativeTemplate } from '../templates/CreativeTemplate'
import { ProfessionalTemplate } from '../templates/ProfessionalTemplate'
import { ExecutiveTemplate } from '../templates/ExecutiveTemplate'
import { SocialTemplate } from '../templates/SocialTemplate'
import { MagazineTemplate } from '../templates/MagazineTemplate'
import { EliteDashboardTemplate } from '../templates/EliteDashboardTemplate'

export function EditorPreviewPanel({ portfolio, profile, setProfile, projects, setProjects, experience, setExperience, galleries, setGalleries, blocks, setBlocks }: any) {
  const props = { portfolio, profile, setProfile, projects, setProjects, experience, setExperience, galleries, setGalleries, blocks, setBlocks, isEditor: true };

  switch (portfolio?.template_id) {
    case 1:
      return <MinimalTemplate {...props} />;
    case 2:
      return <DeveloperTemplate {...props} />;
    case 3:
      return <CreativeTemplate {...props} />;
    case 4:
      return <ProfessionalTemplate {...props} />;
    case 5:
      return <ExecutiveTemplate {...props} />;
    case 6:
      return <SocialTemplate {...props} />;
    case 7:
      return <MagazineTemplate {...props} />;
    case 8:
      return <EliteDashboardTemplate {...props} />;
    default:
      return <MinimalTemplate {...props} />;
  }
}
