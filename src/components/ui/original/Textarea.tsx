import React from 'react'

export function Textarea({
  label,
  placeholder,
  name,
  value,
  onChange,
  rows = 3,
}: {
  label?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (v: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <textarea
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-[7px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all resize-none"
      />
    </div>
  );
}
