'use client'

import { useState, useRef, useEffect } from 'react'
import { Pencil } from 'lucide-react'

export function EditableField({ value, onChange, multiline = false, className = "", style = {}, isEditor = false, renderDisplay }: any) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)
  const inputRef = useRef<any>(null)

  useEffect(() => {
    setTempValue(value)
  }, [value])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  if (!isEditor) {
    return <>{renderDisplay ? renderDisplay : value}</>
  }

  if (isEditing) {
    return multiline ? (
      <textarea
        ref={inputRef}
        className={`bg-transparent outline-none ring-2 ring-primary/50 rounded resize-none w-full ${className}`}
        style={style}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={() => { onChange(tempValue); setIsEditing(false); }}
        rows={value ? value.split('\n').length : 3}
      />
    ) : (
      <input
        ref={inputRef}
        className={`bg-transparent outline-none ring-2 ring-primary/50 rounded w-full ${className}`}
        style={style}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={() => { onChange(tempValue); setIsEditing(false); }}
      />
    )
  }

  return (
    <span 
      className={`group relative inline-block cursor-pointer hover:bg-black/5 hover:dark:bg-white/10 rounded transition-colors w-full ${className}`}
      style={style}
      onClick={() => setIsEditing(true)}
    >
      {renderDisplay ? renderDisplay : (value || <span className="opacity-50 italic">Click to edit...</span>)}
      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm flex items-center justify-center">
        <Pencil size={12} />
      </span>
    </span>
  )
}
