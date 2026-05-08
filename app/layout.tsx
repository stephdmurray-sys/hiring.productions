import type { Metadata, Viewport } from 'next'
import { Figtree } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
  description: 'The only place where candidates see how they\'re actually evaluated. Four polished inside looks built by a 20-year recruiter. Free to start.',
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
    url: 'https://hiring.productions',
    siteName: 'hiring.productions',
    title: 'hiring.productions',
    description: 'Both sides of hiring. Finally in the open.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'hiring.productions - Both sides of hiring',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'hiring.productions',
    description: 'Both sides of hiring. Finally in the open.',
    images: ['/images/og-image.jpg'],
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
      description: 'Talent acquisition consulting and career coaching services. Recruitment marketing strategy, employer branding, and LinkedIn optimization.',
    },
    {
      '@type': 'Person',
      '@id': 'https://hiring.productions/#person',
      name: 'Stephanie Murray',
      jobTitle: 'Talent Acquisition Consultant',
      worksFor: {
        '@id': 'https://hiring.productions/#organization',
      },
      url: 'https://hiring.productions',
      sameAs: [
        'https://www.linkedin.com/in/stephaniemurray11/',
      ],
      description: '18+ years of talent acquisition experience. Transform Award Winner, Talent Strategy of the Year 2025.',
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
      description: 'Tools, consulting, and coaching for the two sides of hiring.',
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
    <html lang="en" className={figtree.className} style={{ backgroundColor: '#0F0F12' }}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          *, *::before, *::after { font-family: 'Figtree', sans-serif !important; }
          html, body { background-color: #0F0F12 !important; color: #F2F0FF; }
        `}} />
      </head>
      <body style={{ backgroundColor: '#0F0F12', color: '#F2F0FF' }}>{children}</body>
    </html>
  )
}
