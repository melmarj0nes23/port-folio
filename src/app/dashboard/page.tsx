import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus, Globe, Pencil, Eye, ExternalLink, Copy, Trash2 } from 'lucide-react'
import { createPortfolio, togglePublishStatus } from './actions'
import { Sidebar } from '@/components/ui/original/Sidebar'
import { Btn } from '@/components/ui/original/Btn'
import { Badge } from '@/components/ui/original/Badge'

export default async function DashboardPage() {
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

  // Fetch portfolios
  const { data: portfolios } = await supabase
    .from('portfolios')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  const totalPortfolios = portfolios?.length || 0
  const publishedCount = portfolios?.filter(p => p.is_published).length || 0

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden pb-16 md:pb-0">
      <Sidebar active="Dashboard" />
      <main className="flex-1 overflow-auto">
        <header className="h-14 border-b border-border flex items-center justify-between px-6">
          <div>
            <h1 className="text-sm font-semibold">My Portfolios</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/${profile?.username}`} target="_blank" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Globe size={13} /> View public profile
            </Link>
            <Link href="/templates" className="inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 cursor-pointer select-none bg-primary text-primary-foreground md:hover:opacity-90 active:scale-[0.98] px-3 py-1.5 text-sm rounded-[6px]">
              <Plus size={13} /> New portfolio
            </Link>
          </div>
        </header>

        <div className="p-6">
          {/* Stats row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Total portfolios</p>
              <p className="text-2xl font-bold tracking-tight">{totalPortfolios}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Published</p>
              <p className="text-2xl font-bold tracking-tight">{publishedCount}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Total views (30d)</p>
              <p className="text-2xl font-bold tracking-tight">0</p>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-border overflow-hidden overflow-x-auto">
            <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
              <p className="text-sm font-medium">All portfolios</p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">Template ID</th>
                  <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">Status</th>
                  <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">Views</th>
                  <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">Updated</th>
                  <th className="text-right px-4 py-2.5 text-xs text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {portfolios?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground text-sm">
                      No portfolios yet. Create your first one to get started.
                    </td>
                  </tr>
                ) : (
                  portfolios?.map((p) => (
                    <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors group">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-foreground">Template {p.template_id}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={p.is_published ? "success" : "muted"}>{p.is_published ? "Published" : "Draft"}</Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-sm">0</td>
                      <td className="px-4 py-3 text-muted-foreground text-sm">{new Date(p.updated_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link href={`/editor/${p.id}`} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Edit">
                              <Pencil size={13} />
                            </Link>
                            {p.is_published && (
                              <Link href={`/p/${p.id}`} target="_blank" className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Visit">
                                <ExternalLink size={13} />
                              </Link>
                            )}
                            <form action={async () => {
                              'use server'
                              await togglePublishStatus(p.id, p.is_published)
                            }}>
                              <button type="submit" className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title={p.is_published ? "Unpublish" : "Publish"}>
                                <Globe size={13} className={p.is_published ? "text-emerald-500" : ""} />
                              </button>
                            </form>
                            <form action={async () => {
                               'use server'
                               const { deletePortfolio } = await import('./actions')
                               await deletePortfolio(p.id)
                            }}>
                              <button type="submit" className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-destructive transition-colors" title="Delete">
                                <Trash2 size={13} />
                              </button>
                            </form>
                          </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
