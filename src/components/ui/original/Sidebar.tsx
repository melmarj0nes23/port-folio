import React from 'react'
import { LayoutDashboard, FileText, Layers, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { signout } from '@/app/login/actions'

export function Sidebar({ active }: { active: string }) {
  const items = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: FileText, label: "Portfolios", href: "/dashboard" },
    { icon: Layers, label: "Templates", href: "/templates" },
    { icon: Settings, label: "Settings", href: "/dashboard" },
  ];
  
  return (
    <aside className="fixed bottom-0 inset-x-0 z-50 border-t md:relative md:w-56 md:border-r md:border-t-0 border-border bg-sidebar flex md:flex-col shrink-0 h-16 md:h-auto">
      <div className="hidden md:flex h-14 items-center px-5 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
            <Layers size={13} className="text-white" />
          </div>
          <span className="text-sm font-semibold">Melmar's Portfolio Maker</span>
        </Link>
      </div>
      <nav className="flex-1 p-2 md:p-3 flex md:flex-col justify-around md:justify-start gap-1 md:gap-0.5">
        {items.map(({ icon: Icon, label, href }) => (
          <Link
            key={label}
            href={href}
            className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-2.5 px-2 md:px-3 py-1.5 md:py-2 rounded-[6px] text-[10px] md:text-sm transition-colors md:w-full md:text-left ${
              active === label ? "bg-primary/10 text-primary font-medium" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
            }`}
          >
            <Icon size={18} className="md:w-[15px] md:h-[15px]" />
            <span className="md:inline">{label}</span>
          </Link>
        ))}
      </nav>
      <div className="hidden md:block p-3 border-t border-border">
        <form action={signout}>
          <button type="submit" className="w-full flex items-center gap-2.5 px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground rounded-[6px] transition-colors text-left text-sm cursor-pointer">
            <LogOut size={15} />
            <span className="font-medium">Sign out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
