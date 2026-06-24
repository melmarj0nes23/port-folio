'use client'

import { Layers, Palette, Type, Check, X } from 'lucide-react'

export function EditorRightPanel({ portfolio, setPortfolio, onClose }: any) {
  const templates = [
    { id: 1, name: "Minimal" },
    { id: 2, name: "Developer" },
    { id: 3, name: "Creative" },
    { id: 4, name: "Professional" },
    { id: 5, name: "Executive" },
    { id: 6, name: "Social" },
    { id: 7, name: "Magazine" },
    { id: 8, name: "Elite Dashboard" },
    { id: 9, name: "Bento Showcase" },
  ];
  const fonts = ["Inter", "DM Sans", "Geist", "Manrope"];

  return (
    <div className="flex flex-col h-full overflow-auto bg-card border-l border-border w-full md:w-64 shrink-0">
      <div className="h-14 border-b border-border flex items-center justify-between px-4 shrink-0">
        <p className="text-sm font-semibold">Appearance</p>
        <button onClick={onClose} className="md:hidden p-2 text-muted-foreground hover:text-foreground">
          <X size={16} />
        </button>
      </div>
      <div className="flex-1 p-3 overflow-auto flex flex-col gap-6">
        {/* Template picker */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1.5"><Layers size={11} /> Template</p>
          <div className="flex flex-col gap-1">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setPortfolio({ ...portfolio, template_id: t.id })}
                className={`text-left px-3 py-2 rounded-[6px] text-sm transition-colors flex items-center justify-between ${
                  portfolio.template_id === t.id ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-foreground"
                }`}
              >
                {t.name}
                {portfolio.template_id === t.id && <Check size={12} />}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1.5"><Palette size={11} /> Accent color</p>
          <div className="flex gap-2 flex-wrap">
            {["#030213", "#5e4ff0", "#2563eb", "#059669", "#d97706", "#e11d48"].map((c) => (
              <button
                key={c}
                onClick={() => setPortfolio({ ...portfolio, theme_color: c })}
                className={`w-7 h-7 rounded-full border-2 transition-transform ${portfolio.theme_color === c ? "border-foreground scale-110" : "border-transparent hover:scale-105"}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        {/* Font */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 flex items-center gap-1.5"><Type size={11} /> Font</p>
          <div className="flex flex-col gap-1">
            {fonts.map((f) => (
              <button
                key={f}
                onClick={() => setPortfolio({ ...portfolio, font: f })}
                className={`text-left px-3 py-1.5 rounded-[6px] text-sm transition-colors ${
                  portfolio.font === f ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
