import type { Metadata, Viewport } from 'next'
import { SITE_LINE } from '@/lib/site-line'
import Script from 'next/script'
import { Figtree } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { UsageProvider } from '@/components/usage-provider'
import { PageViewTracker } from '@/components/page-view-tracker'
import { ScrollReset } from '@/components/scroll-reset'
import './globals.css'

const figtree = Figtree({ 
  subsets: ["latin"], 
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-figtree"
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F0EA' },
    { media: '(prefers-color-scheme: dark)', color: '#1C1C1C' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://hiring.productions'),
  title: {
    default: 'hiring.productions',
    template: '%s | hiring.productions',
  },
  description: `${SITE_LINE} Resume tools for job seekers, applicant tracking systems for hiring teams. Every score is dated and the method is published.`,
  keywords: ['hiring', 'job search', 'recruiting', 'ATS screening', 'resume tips', 'interview prep', 'talent acquisition', 'candidate experience', 'job description SEO', 'employer branding'],
  authors: [{ name: 'Stephanie Murray', url: 'https://www.linkedin.com/in/stephaniemurray11/' }],
  creator: 'Stephanie Murray',
  publisher: 'hiring.productions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.jpg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    // No url here: it would be inherited by every page that sets no openGraph of its own,
    // telling social sites every page is the homepage. Pages that need one set their own.
    siteName: 'hiring.productions',
    title: 'hiring.productions',
    description: SITE_LINE,
    // OG image is generated dynamically from app/opengraph-image.tsx —
    // Next.js auto-includes it, no manual `images` reference needed.
  },
  twitter: {
    card: 'summary_large_image',
    title: 'hiring.productions',
    description: SITE_LINE,
    // twitter-image inherits from opengraph-image when not specified.
    creator: '@stephaniemurray',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://hiring.productions',
  },
  category: 'business',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://hiring.productions/#organization',
      name: 'Hiring.Productions',
      url: 'https://hiring.productions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hiring.productions/favicon.jpg',
      },
      sameAs: [
        'https://www.linkedin.com/in/stephaniemurray11/',
      ],
      description: 'Hiring tools ranked for job seekers and hiring teams: resume builders and ATS checkers, applicant tracking systems and recruiter training. Every score is built from dated public data and re-read monthly, and nobody pays to be featured. Made by Stephanie Murray, who also built RepVera.',
    },
    {
      '@type': 'Person',
      '@id': 'https://hiring.productions/#person',
      name: 'Stephanie Murray',
      jobTitle: 'Talent Acquisition Consultant',
      worksFor: {
        '@id': 'https://hiring.productions/#organization',
      },
      url: 'https://hiring.productions/about/stephanie',
      sameAs: [
        'https://www.linkedin.com/in/stephaniemurray11/',
      ],
      description: 'Founder of hiring.productions, 20 years in talent acquisition. Her talent team won Talent Strategy of the Year at the 2025 Transform Awards.',
      knowsAbout: [
        'Recruitment Marketing',
        'Employer Branding',
        'Talent Acquisition',
        'Job Description SEO',
        'LinkedIn Optimization',
        'Candidate Experience',
        'Career Coaching',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://hiring.productions/#website',
      url: 'https://hiring.productions',
      name: 'Hiring.Productions',
      publisher: {
        '@id': 'https://hiring.productions/#organization',
      },
      description: 'Hiring tools ranked for job seekers and hiring teams, with guides, cost comparisons and the people worth following in talent acquisition. Nobody pays to be featured.',
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://hiring.productions/#service',
      name: 'Talent Acquisition Consulting',
      provider: {
        '@id': 'https://hiring.productions/#person',
      },
      areaServed: 'Worldwide',
      serviceType: [
        'Recruitment Marketing Strategy',
        'Employer Branding',
        'Job Description SEO',
        'LinkedIn Profile Optimization',
        'Career Coaching',
        'Talent Acquisition Consulting',
      ],
      description: 'Expert consulting for hiring teams and coaching for job seekers. Recruitment marketing, employer branding, JD optimization, and LinkedIn strategy.',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={figtree.className} style={{ backgroundColor: '#FAF8F3' }}>
      <head>
        {/* Structured data for search engines — Organization + WebSite schema
            so Google/Bing can pull a knowledge panel and sitelinks search box. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <style dangerouslySetInnerHTML={{ __html: `
          html, body { color: #1A1A22; }
        `}} />
      </head>
      <body style={{ backgroundColor: '#FAF8F3', color: '#1A1A22' }}>
        <UsageProvider>{children}</UsageProvider>
        {/* Fixes scroll position persisting across navigations — see component. */}
        <ScrollReset />
        {/* First-party server-side page-view beacon — fires on every
            page load + client route change, logs to /api/track/view.
            Feeds the /admin dashboard's visitor + top-pages counts.
            Skips itself on /admin routes to avoid skewing the funnel. */}
        <PageViewTracker />
        {/* First-party pageview analytics — no cookies, GDPR-friendly.
            Vercel auto-enables collection when this component is present;
            data lives in Project → Analytics in the Vercel dashboard. */}
        <Analytics />
        {/* Real-user Core Web Vitals (LCP, INP, CLS) — feeds the page-speed
            ranking signals Google uses. Data in Project → Speed Insights. */}
        <SpeedInsights />
        {/* Microsoft Clarity — session recordings + heatmaps + scroll-depth.
            Answers "what did visitors actually do before leaving / where did
            they click / what did they look at." Privacy-friendly: anonymized
            by default, form inputs masked. Data lives at clarity.microsoft.com. */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "wqmovtuagm");`}
        </Script>
      </body>
    </html>
  )
}
