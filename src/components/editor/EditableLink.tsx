'use client'

import { useState, useEffect } from 'react'
import { Pencil, Check, X } from 'lucide-react'

export function EditableLink({ value, href, onChange, className = "", isEditor = false }: any) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)
  const [tempHref, setTempHref] = useState(href)

  useEffect(() => {
    setTempValue(value)
    setTempHref(href)
  }, [value, href])

  if (!isEditor) {
    return <a href={href} className={className} target="_blank" rel="noreferrer">{value}</a>
  }

  if (isEditing) {
    return (
      <div className="relative inline-flex flex-col gap-2 p-3 bg-white dark:bg-slate-800 rounded shadow-xl border border-slate-200 z-50 min-w-[200px]" onClick={e => e.stopPropagation()}>
        <input 
          className="text-sm px-2 py-1 border rounded bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary/50" 
          value={tempValue} 
          onChange={e => setTempValue(e.target.value)} 
          placeholder="Link Text" 
        />
        <input 
          className="text-sm px-2 py-1 border rounded bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary/50" 
          value={tempHref} 
          onChange={e => setTempHref(e.target.value)} 
          placeholder="https://..." 
        />
        <div className="flex gap-2 justify-end mt-1">
          <button onClick={() => setIsEditing(false)} className="p-1 text-slate-500 hover:text-slate-700 bg-slate-100 rounded hover:bg-slate-200 transition-colors"><X size={14}/></button>
          <button onClick={() => { onChange({ value: tempValue, href: tempHref }); setIsEditing(false); }} className="p-1 text-green-600 hover:text-green-700 bg-green-50 rounded hover:bg-green-100 transition-colors"><Check size={14}/></button>
        </div>
      </div>
    )
  }

  return (
    <span 
      className={`group relative inline-flex cursor-pointer hover:bg-black/5 hover:dark:bg-white/10 rounded transition-colors ${className}`}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsEditing(true); }}
    >
      <span className="pointer-events-none">{value || 'Add link text...'}</span>
      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm flex items-center justify-center">
        <Pencil size={12} />
      </span>
    </span>
  )
}
