import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/ui/original/Sidebar'
import { ProfileForm } from './ProfileForm'
import { Coffee, Mail, LifeBuoy } from 'lucide-react'

export default async function SettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('users_profile')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden pb-16 md:pb-0">
      <Sidebar active="Settings" />
      <main className="flex-1 overflow-auto">
        <header className="h-14 border-b border-border flex items-center justify-between px-6">
          <div>
            <h1 className="text-sm font-semibold">Settings</h1>
          </div>
        </header>

        <div className="p-6 max-w-4xl mx-auto space-y-8">
          
          {/* Profile Section */}
          <section className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="border-b border-border px-6 py-4">
              <h2 className="text-base font-semibold">User Profile</h2>
              <p className="text-sm text-muted-foreground">Manage your personal information.</p>
            </div>
            <div className="p-6">
              <ProfileForm profile={profile} />
            </div>
          </section>

          {/* Support / Contact Section */}
          <section className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="border-b border-border px-6 py-4">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <LifeBuoy size={16} /> Help & Support
              </h2>
              <p className="text-sm text-muted-foreground">Need help or want to report a problem?</p>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <p className="text-sm font-medium">Contact the Developer</p>
                <div className="space-y-3">
                  <a href="https://facebook.com/melmarj0nes23" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </div>
                    <span>melmarj0nes23</span>
                  </a>
                  <a href="https://github.com/melmarj0nes23" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-neutral-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13 13 0 0 0-7 0C6.2 1.4 5 1.8 5 1.8a5.5 5.5 0 0 0-.1 3.8A5.5 5.5 0 0 0 3.4 12c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path><path d="M9 21c-3 1-4-2-4-2"></path></svg>
                    </div>
                    <span>melmarj0nes23</span>
                  </a>
                  <a href="mailto:melmarjvelasco@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                      <Mail size={16} />
                    </div>
                    <span>melmarjvelasco@gmail.com</span>
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium">Support the Project</p>
                <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-md">
                      <Coffee size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-amber-900 dark:text-amber-300">Buy me a coffee</p>
                      <p className="text-xs text-amber-700 dark:text-amber-400/80 mt-1 mb-3 leading-relaxed">
                        This project is completely free! If you find it useful, consider supporting its development.
                      </p>
                      <div className="inline-flex items-center gap-2 bg-background border border-amber-200 dark:border-amber-900/50 rounded-md px-3 py-1.5">
                        <span className="text-xs font-semibold text-muted-foreground">GCash</span>
                        <span className="text-sm font-mono font-medium tracking-wider">09562786351</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
