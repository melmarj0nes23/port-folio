import React from 'react'

export function Btn({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: (e?: any) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) {
  const base = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-primary text-primary-foreground md:hover:opacity-90 active:scale-[0.98]",
    secondary: "bg-secondary text-secondary-foreground md:hover:bg-muted active:scale-[0.98]",
    ghost: "text-muted-foreground md:hover:text-foreground md:hover:bg-muted active:scale-[0.98]",
    outline: "border border-border text-foreground md:hover:bg-muted active:scale-[0.98]",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-[6px]",
    md: "px-4 py-2 text-sm rounded-[7px]",
    lg: "px-5 py-2.5 text-[15px] rounded-[8px]",
  };
  return (
    <button type={type} disabled={disabled} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
