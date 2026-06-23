import React from 'react'

export function Input({
  label,
  type = "text",
  placeholder,
  value,
  name,
  onChange,
  required
}: {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  onChange?: (v: string | React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={(e) => onChange?.(e)}
        className="w-full px-3 py-2 text-sm bg-input-background border border-border rounded-[7px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
      />
    </div>
  );
}
