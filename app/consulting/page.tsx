'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { submitLead } from '@/lib/submit-lead'
import './consulting.css'

export default function ConsultingPage() {
  const [showModal, setShowModal] = useState(false)
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const openModal = () => {
    setShowModal(true)
    setSubmitState('idle')
  }
  const closeModal = () => setShowModal(false)

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitState('submitting')

    const formData = new FormData(e.currentTarget)
    const fullName = (formData.get('name') ?? '').toString().trim()
    const [firstName, ...rest] = fullName.split(/\s+/)
    const lastName = rest.join(' ')

    // Consulting inquiries carry richer fields (company, goals, timeline,
    // etc.) that don't fit Resend's contact schema. Those still land in
    // the legacy Google Sheet via submitLead's `legacyExtras` so Stephanie
    // can read the full inquiry there. Resend just gets the contact + a
    // "got it, will reply personally" welcome.
    const result = await submitLead({
      email: (formData.get('email') ?? '').toString(),
      source: 'consulting',
      firstName,
      lastName,
      audience: 'hiring',
      role: (formData.get('role') ?? '').toString(),
      legacyExtras: {
        company: (formData.get('company') ?? '').toString(),
        company_url: (formData.get('company_url') ?? '').toString(),
        hiring_stage: (formData.get('hiring_stage') ?? '').toString(),
        goals: (formData.get('goals') ?? '').toString(),
        timeline: (formData.get('timeline') ?? '').toString(),
        referral_source: (formData.get('source') ?? '').toString(),
      },
    })

    if (result.resendOk) {
      setSubmitState('success')
      ;(e.target as HTMLFormElement).reset()
    } else {
      setSubmitState('error')
    }
  }

  const consultingSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Talent Acquisition Consulting',
    provider: {
      '@type': 'Person',
      name: 'Stephanie Murray',
      jobTitle: 'Talent Acquisition Consultant',
      url: 'https://hiring.productions',
      sameAs: 'https://www.linkedin.com/in/stephaniemurray11/',
    },
    areaServed: 'Worldwide',
    serviceType: ['Recruitment Marketing', 'Employer Branding', 'Job Description SEO', 'Talent Acquisition Strategy'],
    description: 'Expert talent acquisition consulting for hiring teams. Build recruitment marketing strategy, employer branding, and JD SEO.',
    url: 'https://hiring.productions/consulting',
  }

  return (
    <div className="consulting-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(consultingSchema) }}
      />
      <Navigation variant="light" />

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <p className="hero-eyebrow">Talent Acquisition Consulting</p>
          <h1>Recruitment is marketing. Most organizations just haven&apos;t caught up yet.</h1>
          <p className="hero-sub">Nearly 20 years building the strategies, systems, and stories that make organizations impossible to ignore — for the people they actually want to hire.</p>
          <div className="hero-ctas">
            <button onClick={openModal} className="btn-primary">Request Services</button>
          </div>
        </div>
        <div className="hero-photo">
          <div className="hero-photo-circle">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/stephanie.jpg" alt="Stephanie Murray — Hiring.Productions" />
          </div>
        </div>
      </section>

      {/* Award Strip */}
      <div className="award-strip">
        <div className="award-dot"></div>
        <span className="award-text"><strong>Transform Award Winner</strong> · Talent Strategy of the Year 2025 · Two-time finalist 2024 &amp; 2025</span>
      </div>

      {/* Recruitment Marketing Section */}
      <section className="rec-marketing">
        <div className="rec-marketing-inner">
          <h2>Your recruiters are the face of your organization. Are they telling the right story?</h2>
          <div className="rec-blocks">
            <div className="rec-block">
              <div className="rec-block-title">Recruitment Marketing Strategy</div>
              <div className="rec-block-desc">Building the inbound engine that drives qualified applicant flow — so recruiters spend time closing, not chasing.</div>
            </div>
            <div className="rec-block">
              <div className="rec-block-title">Employer Brand &amp; Positioning</div>
              <div className="rec-block-desc">Defining what makes you different as an employer and making sure that story lands consistently across every platform and touchpoint.</div>
            </div>
            <div className="rec-block">
              <div className="rec-block-title">Job Description SEO &amp; Visibility</div>
              <div className="rec-block-desc">JDs are search assets. The right keywords and structure determine whether you get found — or buried by competitors.</div>
            </div>
            <div className="rec-block">
              <div className="rec-block-title">Social Media &amp; Content Strategy</div>
              <div className="rec-block-desc">LinkedIn, Instagram, TikTok — building the content presence that attracts talent before they ever see a job posting.</div>
            </div>
            <div className="rec-block">
              <div className="rec-block-title">Candidate Experience as Brand</div>
              <div className="rec-block-desc">Every touchpoint from first impression to final offer shapes how candidates feel — and what they tell others. This is your brand in action.</div>
            </div>
            <div className="rec-block">
              <div className="rec-block-title">Community &amp; Pipeline Building</div>
              <div className="rec-block-desc">Talent communities that reduce sourcing dependency, create hiring predictability, and keep your best candidates warm before demand hits.</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div>
          <p className="about-label">Who I work with</p>
          <h2>Organizations that know something isn&apos;t working — and are ready to fix it.</h2>
          <p>Healthcare and telehealth companies scaling fast. HR leaders who&apos;ve inherited a broken process. Startups building a recruiting function for the first time. If you&apos;re spending more on sourcing than results show, your JDs aren&apos;t converting, or your employer brand doesn&apos;t reflect who you actually are — that&apos;s exactly where I start.</p>
        </div>
        <div>
          <p className="about-label">Background</p>
          <h2>Nearly two decades of real results, built inside the work.</h2>
          <p>I joined Brightside Health as employee #19 — fewer than 50 clinicians across 5 states. By building their recruitment marketing function from the ground up — employer brand, JD strategy, sourcing systems, candidate experience — we scaled to 1,500+ clinicians nationwide.</p>
          <p>With nearly 20 years in healthcare recruiting, I&apos;ve learned that recruitment done right is indistinguishable from great marketing. I know how LinkedIn&apos;s AI matching engine reads your postings. I know what makes a candidate apply — and what makes them ghost you at the offer stage. Every framework I bring has been stress-tested in high-growth, high-stakes environments.</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="services-inner">
          <div className="section-header">
            <p className="section-label">What I do</p>
            <h2>Six ways I can move the needle for your team.</h2>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <p className="service-num">01</p>
              <h3>Recruitment Marketing Strategy</h3>
              <p>The inbound engine that drives qualified applicant flow — channel mix, content cadence, and messaging architecture that reduces sourcing dependency and scales with your growth.</p>
            </div>
            <div className="service-card">
              <p className="service-num">02</p>
              <h3>Job Description SEO &amp; Optimization</h3>
              <p>Rewritten and optimized for Indeed, LinkedIn, Google for Jobs, and AI matching engines — so the right candidates find you before they find your competitors.</p>
            </div>
            <div className="service-card">
              <p className="service-num">03</p>
              <h3>Employer Branding &amp; Identity</h3>
              <p>Audits of your full employer presence, a distinctive employee value proposition, and a content strategy that makes your organization the obvious choice for the talent you want.</p>
            </div>
            <div className="service-card">
              <p className="service-num">04</p>
              <h3>Talent Acquisition Optimization</h3>
              <p>Process redesign, ATS evaluation, sourcing strategy, and analytics — every part of your recruiting function rebuilt for speed, quality of hire, and scale.</p>
            </div>
            <div className="service-card">
              <p className="service-num">05</p>
              <h3>Candidate Experience &amp; Engagement</h3>
              <p>From first impression to first day — offer optimization, onboarding redesign, and the feedback systems that turn your hiring process into a competitive advantage.</p>
            </div>
            <div className="service-card">
              <p className="service-num">06</p>
              <h3>Connection &amp; Retention Strategy</h3>
              <p>Proactive retention built around career development and meaningful cultural integration — so the people you fought to hire actually stay.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="packages">
        <div className="section-header">
          <p className="section-label">Engagement Options</p>
          <h2>Choose how we work together.</h2>
        </div>
        <div className="packages-grid">
          <button onClick={openModal} className="package-card package-button">
            <span className="package-tag">Hourly Advisory</span>
            <h3>On-demand strategic support</h3>
            <p>Sharp, focused thinking exactly when you need it — for targeted consultation, quick reviews, or executive advisory. No long-term commitment required.</p>
          </button>
          <button onClick={openModal} className="package-card package-button featured">
            <span className="package-tag">Most popular</span>
            <h3>Ongoing advisory retainer</h3>
            <p>Weekly sessions, async feedback, and continuous strategic guidance across recruitment marketing, employer branding, and candidate experience. Outcome-focused, not hour-counted.</p>
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to make your hiring a real production?</h2>
        <p>Let&apos;s talk about where your talent strategy is and where it needs to be.</p>
        <div className="cta-buttons">
          <button onClick={openModal} className="btn-white">Request Services</button>
        </div>
      </section>

      <Footer />

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
          <div className="modal-card">
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">×</button>
            
            <h2 className="modal-headline">Let&apos;s talk strategy.</h2>
            <p className="modal-subhead">Tell me about your hiring goals and where things are stuck. I&apos;ll review and reach out within 48 hours if there&apos;s a fit.</p>

            {submitState === 'success' ? (
              <div className="form-success">
                <h3>Got it.</h3>
                <p>Your inquiry is in. I&apos;ll review and be in touch within 48 hours if there&apos;s a fit.</p>
                <button type="button" className="btn-submit" onClick={closeModal}>Close</button>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Work email</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input type="text" id="company" name="company" required />
              </div>

              <div className="form-group">
                <label htmlFor="role">Your role</label>
                <input type="text" id="role" name="role" placeholder="e.g. VP People, Head of Talent, Founder" required />
              </div>

              <div className="form-group">
                <label htmlFor="company-url">Company website or LinkedIn</label>
                <input type="url" id="company-url" name="company_url" required />
              </div>

              <div className="form-group">
                <label>What stage is your hiring function?</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" name="hiring_stage" value="Building it from scratch" required />
                    <span>Building it from scratch</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="hiring_stage" value="Have a function, scaling fast" />
                    <span>Have a function, scaling fast</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="hiring_stage" value="Function exists but isnt working" />
                    <span>Function exists but isn&apos;t working</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="hiring_stage" value="Just exploring" />
                    <span>Just exploring</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="goals">What are you hoping to achieve?</label>
                <textarea id="goals" name="goals" maxLength={500} placeholder="What's the outcome you're trying to reach? What's getting in the way right now?" required></textarea>
                <p className="char-count">
                  <span id="char-count">0</span> / 500
                </p>
              </div>

              <div className="form-group">
                <label>Rough timeline</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" name="timeline" value="Need help now" required />
                    <span>Need help now</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="timeline" value="Next 30 to 60 days" />
                    <span>Next 30 to 60 days</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="timeline" value="Planning for later this year" />
                    <span>Planning for later this year</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="timeline" value="Not sure yet" />
                    <span>Not sure yet</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="source">How did you hear about me?</label>
                <input type="text" id="source" name="source" />
              </div>

              {submitState === 'error' && (
                <p className="form-error">Something went wrong sending that. Please try again, or email directly via LinkedIn.</p>
              )}

              <button
                type="submit"
                className="btn-submit"
                disabled={submitState === 'submitting'}
              >
                {submitState === 'submitting' ? 'Sending...' : 'Send Request'}
              </button>
            </form>
            )}
          </div>
        </div>
      )}

      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          const textArea = document.getElementById('goals');
          const charCount = document.getElementById('char-count');
          
          if (textArea) {
            textArea.addEventListener('input', function() {
              if (charCount) charCount.textContent = this.value.length;
            });
          }
          
          document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
              const closeBtn = document.querySelector('.modal-close');
              if (closeBtn) closeBtn.click();
            }
          });
        })();
      `}} />
    </div>
  )
}
