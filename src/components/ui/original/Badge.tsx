import React from 'react'

export function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "success" | "muted" | "primary" }) {
  const styles = {
    default: "bg-muted text-muted-foreground",
    success: "bg-emerald-500/10 text-emerald-500",
    muted: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
}
