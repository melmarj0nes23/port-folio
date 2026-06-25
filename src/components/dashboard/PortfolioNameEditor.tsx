'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Pencil, Check, X } from 'lucide-react'
import { updatePortfolioName } from '@/app/dashboard/actions'

export function PortfolioNameEditor({ portfolioId, initialName }: { portfolioId: string, initialName: string }) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(initialName || 'Untitled Portfolio')
  const [tempName, setTempName] = useState(name)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleSave = async () => {
    if (tempName.trim() === '') {
      setTempName(name)
      setIsEditing(false)
      return
    }
    
    setIsLoading(true)
    try {
      await updatePortfolioName(portfolioId, tempName.trim())
      setName(tempName.trim())
      setIsEditing(false)
    } catch (e) {
      console.error(e)
      // fallback on error
      setTempName(name)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setTempName(name)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="text-sm font-medium bg-background border border-border rounded px-2 py-1 outline-none focus:border-primary w-48 text-foreground"
        />
        <button onClick={handleSave} disabled={isLoading} className="text-green-600 hover:text-green-700 p-1">
          <Check size={14} />
        </button>
        <button onClick={() => { setTempName(name); setIsEditing(false); }} disabled={isLoading} className="text-muted-foreground hover:text-foreground p-1">
          <X size={14} />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditing(true)}>
      <p className="font-medium text-foreground">{name}</p>
      <Pencil size={12} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  )
}
