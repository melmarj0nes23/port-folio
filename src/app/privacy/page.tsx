import React from 'react'
import Link from 'next/link'
import { Layers, ArrowLeft } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
              <Layers size={11} className="text-white" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Portfoilo Maker</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground">
          <p>Last updated: June 2026</p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
          <p>
            When you use Portfoilo Maker, we may collect the personal information you voluntarily provide such as your name, email address, professional history, and other details necessary to generate your portfolio.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect primarily to provide, maintain, protect, and improve our current services and to develop new ones. Your professional details are solely used for the generation and hosting of your portfolio website.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. All supplied sensitive information is transmitted via Secure Socket Layer (SSL) technology and encrypted into our database.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Third-Party Disclosure</h2>
          <p>
            We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Contact Us</h2>
          <p>
            If you have any questions regarding this privacy policy, you may contact us using the information on our website.
          </p>
        </div>
      </main>
    </div>
  )
}
