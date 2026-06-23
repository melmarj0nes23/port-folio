import { createClient } from '@/utils/supabase/server'
import { TemplatesClient } from './TemplatesClient'

export default async function TemplatesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <TemplatesClient isLoggedIn={!!user} />
}
