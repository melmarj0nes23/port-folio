'use client'

import React, { useState } from 'react'
import { updateProfile } from './actions'
import { Btn } from '@/components/ui/original/Btn'
import { Check } from 'lucide-react'

export function ProfileForm({ profile }: { profile: any }) {
  const [isLoading, setIsLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setSaved(false)
    try {
      await updateProfile(formData)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Full Name</label>
          <input 
            type="text" 
            name="full_name" 
            defaultValue={profile?.full_name || ''} 
            className="w-full h-10 px-3 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Username</label>
          <input 
            type="text" 
            name="username" 
            defaultValue={profile?.username || ''} 
            className="w-full h-10 px-3 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="johndoe"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Headline</label>
        <input 
          type="text" 
          name="headline" 
          defaultValue={profile?.headline || ''} 
          className="w-full h-10 px-3 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Software Engineer"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Bio</label>
        <textarea 
          name="bio" 
          defaultValue={profile?.bio || ''} 
          rows={4}
          className="w-full p-3 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          placeholder="A short bio about yourself..."
        />
      </div>

      <div className="flex items-center gap-4">
        <Btn type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Profile'}
        </Btn>
        {saved && (
          <span className="text-sm text-green-600 flex items-center gap-1">
            <Check size={14} /> Saved successfully
          </span>
        )}
      </div>
    </form>
  )
}
