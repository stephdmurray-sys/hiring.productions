'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import './linkedin-guide.css'

export default function LinkedInGuidePage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    fullName: '',
    role: '',
    email: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbyUFzebPIPYH4nVKqOvbRDqtowfmIJzjFt-mB5kHPt9kxpE6e92pLupSUtXq-E8m7vk/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            tool: 'linkedin_guide',
            audience: 'candidate',
            role: formData.role,
            level: '',
            company: '',
            score: '',
            grade: '',
          }),
        }
      )

      setFormState('success')
    } catch (error) {
      console.error('Form submission error:', error)
      setFormState('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="lead-page">
      <Navigation variant="dark" />

      <main className="lead-main">
        {formState === 'success' ? (
          <div className="lead-content">
            {/* Left Column - unchanged value prop */}
            <div className="lead-value">
              <span className="lead-eyebrow">Free Download</span>
              <h1 className="lead-headline">
                Why You&apos;re Not Being Found<br />
                <em>on LinkedIn</em>
              </h1>
              <p className="lead-description">
                Most professionals aren&apos;t being ignored by recruiters. They&apos;re just not being found.
              </p>
              <div className="lead-benefits">
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 2L12.09 7.26L18 8.27L14 12.14L14.81 18.02L10 15.27L5.19 18.02L6 12.14L2 8.27L7.91 7.26L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>How recruiter search actually works</span>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 2L12.09 7.26L18 8.27L14 12.14L14.81 18.02L10 15.27L5.19 18.02L6 12.14L2 8.27L7.91 7.26L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Profile sections that matter most</span>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 2L12.09 7.26L18 8.27L14 12.14L14.81 18.02L10 15.27L5.19 18.02L6 12.14L2 8.27L7.91 7.26L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Exact fixes to show up in results</span>
                </div>
              </div>
              <p className="lead-author">From a recruiter with 18+ years of experience.</p>
            </div>

            {/* Right Column - PDF download card */}
            <div className="lead-form-card">
              <div className="download-ready">
                <div className="pdf-cover-wrap">
                  <Image
                    src="/images/linkedin-guide-cover.jpg"
                    alt="Why You're Not Being Found on LinkedIn — PDF cover"
                    width={340}
                    height={220}
                    className="pdf-cover-img"
                  />
                </div>
                <p className="download-ready-label">Your presentation is ready.</p>
                <a
                  href="/linkedin-guide.pdf"
                  download="Why-Youre-Not-Being-Found-on-LinkedIn.pdf"
                  className="download-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                    <path d="M12 16L7 11H10V4H14V11H17L12 16Z" fill="currentColor"/>
                    <path d="M5 20H19V18H5V20Z" fill="currentColor"/>
                  </svg>
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="lead-content">
            {/* Left Column - Value Proposition */}
            <div className="lead-value">
              <span className="lead-eyebrow">Free Download</span>
              <h1 className="lead-headline">
                Why You&apos;re Not Being Found<br />
                <em>on LinkedIn</em>
              </h1>
              <p className="lead-description">
                Most professionals aren&apos;t being ignored by recruiters. They&apos;re just not being found.
              </p>
              
              <div className="lead-benefits">
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 2L12.09 7.26L18 8.27L14 12.14L14.81 18.02L10 15.27L5.19 18.02L6 12.14L2 8.27L7.91 7.26L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>How recruiter search actually works</span>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 2L12.09 7.26L18 8.27L14 12.14L14.81 18.02L10 15.27L5.19 18.02L6 12.14L2 8.27L7.91 7.26L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Profile sections that matter most</span>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 2L12.09 7.26L18 8.27L14 12.14L14.81 18.02L10 15.27L5.19 18.02L6 12.14L2 8.27L7.91 7.26L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span>Exact fixes to show up in results</span>
                </div>
              </div>

              <p className="lead-author">
                From a recruiter with 18+ years of experience.
              </p>
            </div>

            {/* Right Column - Form Card */}
            <div className="lead-form-card">
              <div className="form-card-header">
                <span className="form-badge">PDF Presentation</span>
                <p className="form-card-title">Get instant access</p>
              </div>

              <form onSubmit={handleSubmit} className="lead-form">
                <div className="form-field">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Jane Smith"
                    disabled={formState === 'submitting'}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="role">Professional Title</label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    placeholder="Senior Product Manager"
                    disabled={formState === 'submitting'}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="jane@company.com"
                    disabled={formState === 'submitting'}
                  />
                </div>

                {formState === 'error' && (
                  <p className="error-message">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={formState === 'submitting'}
                >
                  {formState === 'submitting' ? 'Submitting...' : 'Download the presentation'}
                </button>

                <p className="form-disclaimer">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
