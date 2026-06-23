'use client'

import { useState, useEffect } from 'react'
import { Image as ImageIcon, Check, X } from 'lucide-react'

export function EditableImage({ src, alt, onChange, className = "", isEditor = false }: any) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempSrc, setTempSrc] = useState(src)
  const [tempAlt, setTempAlt] = useState(alt)

  useEffect(() => {
    setTempSrc(src)
    setTempAlt(alt)
  }, [src, alt])

  if (!isEditor) {
    return <img src={src} alt={alt} className={className} />
  }

  return (
    <div className={`group relative inline-block overflow-hidden ${className}`}>
      <img src={src || 'https://via.placeholder.com/800x600?text=Placeholder'} alt={alt} className="w-full h-full object-cover" />
      
      <div 
        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" 
        onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
      >
        <ImageIcon className="text-white w-8 h-8 drop-shadow-md" />
      </div>

      {isEditing && (
        <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 flex flex-col items-center justify-center p-4 z-50 min-h-[150px]" onClick={e => e.stopPropagation()}>
          <input 
            className="w-full text-sm px-2 py-1 border rounded mb-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary/50" 
            value={tempSrc} 
            onChange={e => setTempSrc(e.target.value)} 
            placeholder="Image URL" 
          />
          <input 
            className="w-full text-sm px-2 py-1 border rounded mb-3 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-primary/50" 
            value={tempAlt} 
            onChange={e => setTempAlt(e.target.value)} 
            placeholder="Alt Text" 
          />
          <div className="flex gap-2 self-end">
            <button onClick={() => setIsEditing(false)} className="p-1 text-slate-500 hover:text-slate-700 bg-slate-100 rounded hover:bg-slate-200 transition-colors"><X size={14}/></button>
            <button onClick={() => { onChange({ src: tempSrc, alt: tempAlt }); setIsEditing(false); }} className="p-1 text-green-600 hover:text-green-700 bg-green-50 rounded hover:bg-green-100 transition-colors"><Check size={14}/></button>
          </div>
        </div>
      )}
    </div>
  )
}
