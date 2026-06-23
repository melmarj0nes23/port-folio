'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Layers, ArrowRight, Star } from 'lucide-react'
import { Btn } from '@/components/ui/original/Btn'
import { Input } from '@/components/ui/original/Input'
import { signup } from '../login/actions'

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    try {
      const result = await signup(formData)
      if (result?.error) {
        setError(result.error)
        setIsLoading(false)
      }
    } catch (err) {
      if ((err as Error).message === 'NEXT_REDIRECT') throw err;
      setError('An error occurred during sign up.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Left pane */}
      <div className="hidden lg:flex flex-col w-[480px] border-r border-border bg-card p-10">
        <Link href="/" className="flex items-center gap-2 mb-auto">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
            <Layers size={13} className="text-white" />
          </div>
          <span className="text-sm font-semibold">Melmar's Portfolio Maker</span>
        </Link>
        <div className="py-16">
          <blockquote className="text-xl font-medium leading-relaxed mb-6">
            "I had my portfolio published in 8 minutes. The editor is exactly what I wanted — no friction, just building."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-semibold">S</div>
            <div>
              <p className="text-sm font-medium">Sarah Kim</p>
              <p className="text-xs text-muted-foreground">Senior Product Designer, Stripe</p>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={13} className="text-amber-400 fill-amber-400" />)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Rated 4.9/5 by 2,400+ users</p>
        </div>
      </div>

      {/* Right pane */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <Layers size={13} className="text-white" />
            </div>
            <span className="text-sm font-semibold">Melmar's Portfolio Maker</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight mb-1">
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Start building your portfolio today.
          </p>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input name="fullName" label="Full name" placeholder="Alex Chen" />
            <Input name="email" label="Email address" type="email" placeholder="you@example.com" required />
            <Input name="password" label="Password" type="password" placeholder="At least 8 characters" required />
            
            <div className="mt-6">
              <Btn type="submit" variant="primary" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create account'} <ArrowRight size={14} />
              </Btn>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:opacity-80 transition-opacity"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
