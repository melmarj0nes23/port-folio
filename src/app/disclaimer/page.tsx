import React from 'react'
import Link from 'next/link'
import { Layers, ArrowLeft } from 'lucide-react'

export default function DisclaimerPage() {
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
            <span className="text-sm font-semibold tracking-tight">Melmar's Portfolio Maker</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold tracking-tight mb-8">Disclaimer</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground">
          <p>Last updated: June 2026</p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. General Information</h2>
          <p>
            The information provided by Melmar's Portfolio Maker ("we," "us," or "our") on our website is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. External Links Disclaimer</h2>
          <p>
            The site may contain (or you may be sent through the site) links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Professional Disclaimer</h2>
          <p>
            The site cannot and does not contain professional advice. The portfolio templates and building tools are provided for general informational and educational purposes only and are not a substitute for professional career advice.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. User-Generated Content</h2>
          <p>
            Melmar's Portfolio Maker allows users to generate and publish their own portfolio websites. We are not responsible for the content, accuracy, or legality of any user-generated content hosted on our subdomains.
          </p>
        </div>
      </main>
    </div>
  )
}
