'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const full_name = formData.get('full_name') as string
  const username = formData.get('username') as string
  const headline = formData.get('headline') as string
  const bio = formData.get('bio') as string

  const { error } = await supabase
    .from('users_profile')
    .update({ full_name, username, headline, bio })
    .eq('user_id', user.id)

  if (error) {
    console.error('Error updating profile:', error)
    throw new Error('Could not update profile')
  }

  revalidatePath('/settings')
}
