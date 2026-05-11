'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import './get-found.css'

export default function GetFoundPage() {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <div className="get-found-page">
      <Navigation variant="dark" />

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <p className="hero-eyebrow">For Individual Job Seekers</p>
          <h1>You&apos;re not being ignored. <em>You&apos;re just not being found.</em></h1>
          <p className="hero-sub">Most job seekers are optimizing the wrong thing. I&apos;ll show you how recruiters actually search, what the LinkedIn algorithm ranks, and how to get surfaced before the job is even posted.</p>
          <div className="hero-ctas">
            <button onClick={openModal} className="btn-primary">Request a Session</button>
            <a href="https://www.linkedin.com/in/stephaniemurray11/" target="_blank" rel="noopener noreferrer" className="btn-secondary">Follow on LinkedIn →</a>
          </div>
        </div>
        <div className="hero-photo">
          <div className="hero-photo-circle">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/stephanie-murray.jpg" alt="Stephanie Murray" />
          </div>
        </div>
      </section>

      {/* Award Strip */}
      <div className="award-strip">
        <span className="award-text"><strong>Transform Award Winner</strong></span>
        <div className="award-dot"></div>
        <span className="award-text"><strong>Talent Strategy of the Year 2025</strong></span>
        <div className="award-dot"></div>
        <span className="award-text">20 Years Inside Recruiting</span>
      </div>

      {/* Problem Section */}
      <section className="problem">
        <h2>The applicant funnel has <em>quietly broken.</em> Most candidates are fixing the wrong things.</h2>
        <p className="problem-sub">Six ways I can <em>make you findable.</em></p>
        
        <div className="cards-grid">
          <div className="card">
            <div className="card-num">01</div>
            <h3>Headline Optimization</h3>
            <p>Rewriting your headline using the formula recruiters search for. Role title, industry, skill, credential. Every word is inventory.</p>
          </div>
          <div className="card">
            <div className="card-num">02</div>
            <h3>Skills Section Rebuild</h3>
            <p>LinkedIn lets you list 50 skills. Most people use a fraction. 48% of recruiters now fill roles using skills data alone. We fix that.</p>
          </div>
          <div className="card">
            <div className="card-num">03</div>
            <h3>Experience Keywords</h3>
            <p>Turning vague leadership-speak into specific, indexed, searchable language. Tools, platforms, metrics, outcomes.</p>
          </div>
          <div className="card">
            <div className="card-num">04</div>
            <h3>Open to Work Strategy</h3>
            <p>The public green banner vs. the private recruiter-only setting. Which one fits your situation and why it matters more than you think.</p>
          </div>
          <div className="card">
            <div className="card-num">05</div>
            <h3>Recommended Matches Setup</h3>
            <p>Getting your profile into the pre-built shortlist LinkedIn hands recruiters before they type a single search.</p>
          </div>
          <div className="card">
            <div className="card-num">06</div>
            <h3>Recruiter-View Audit</h3>
            <p>Running the exact boolean search a recruiter would run for your target role. Showing you where you rank and why.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-col">
          <p className="about-label">Who I work with</p>
          <h2>Professionals who know <em>something isn&apos;t working</em> and are ready to fix it.</h2>
          <p>Mid-career to senior professionals who&apos;ve been applying and hearing silence. People who know their experience is real but their profile isn&apos;t converting. Anyone who&apos;s been told the market is rough and wants to actually do something about it. If you&apos;re tailoring resumes for jobs that go to someone else entirely, this is for you.</p>
        </div>
        <div className="about-col">
          <p className="about-label">Background</p>
          <h2>Nearly two decades of <em>real results,</em> built inside recruiting.</h2>
          <p>I&apos;ve spent nearly 20 years on the other side of the desk. Building sourcing engines, scaling hiring functions, coaching recruiters on how to find the right candidates fast. I know exactly what lights up in LinkedIn Recruiter and what gets scrolled past. I know the filters, the spotlights, the AI matching layer, and the 6-second scan. I&apos;ll teach you how to build a profile that wins that scan.</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="how-it-works-inner">
          <h2>How it <em>works.</em></h2>
          
          <div className="steps">
            <div className="step">
              <div className="step-num">01</div>
              <h3>Request a session</h3>
              <p>Fill out a short form so I know a bit about you and your target role. I&apos;ll review and reach out if it&apos;s a fit.</p>
            </div>
            <div className="step">
              <div className="step-num">02</div>
              <h3>Show me your profile</h3>
              <p>We screen-share and I walk through it the way a recruiter would. You see exactly where you rank, what&apos;s missing, and what&apos;s working against you.</p>
            </div>
            <div className="step">
              <div className="step-num">03</div>
              <h3>Walk away with a plan</h3>
              <p>You leave with a prioritized fix list, the recruiter-view data, and the recording. Request another session any time you want a second pair of eyes on your rewrite.</p>
            </div>
          </div>

          <div className="how-it-works-cta">
            <button onClick={openModal} className="btn-primary">Request a Session</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to <em>get found?</em></h2>
        <p>One hour. One recruiter in your corner. Book as many sessions as you need.</p>
        <div className="cta-buttons">
          <button onClick={openModal} className="btn-white">Request a Session</button>
          <a href="https://www.linkedin.com/in/stephaniemurray11/" target="_blank" rel="noopener noreferrer" className="btn-outline-white">Connect on LinkedIn</a>
        </div>
      </section>

      <Footer />

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
          <div className="modal-card">
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">×</button>
            
            <h2 className="modal-headline">Let&apos;s get <em>started.</em></h2>
            <p className="modal-subhead">Tell me a bit about you and your target role. I&apos;ll review and reach out within 48 hours if it&apos;s a fit.</p>

            <form action="https://formspree.io/f/xzdykpoj" method="POST" className="modal-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="linkedin">LinkedIn profile URL</label>
                <input type="url" id="linkedin" name="linkedin" placeholder="https://linkedin.com/in/yourname" required />
              </div>

              <div className="form-group">
                <label htmlFor="current-role">Current role or most recent role</label>
                <input type="text" id="current-role" name="current_role" required />
              </div>

              <div className="form-group">
                <label htmlFor="target-role">Target role or industry</label>
                <input type="text" id="target-role" name="target_role" placeholder="e.g. Senior Marketing Manager, B2B SaaS" required />
              </div>

              <div className="form-group">
                <label>Where are you in your search?</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input type="radio" name="search_status" value="Actively applying and not getting responses" required />
                    <span>Actively applying and not getting responses</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="search_status" value="Employed and quietly exploring" />
                    <span>Employed and quietly exploring</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="search_status" value="Between roles" />
                    <span>Between roles</span>
                  </label>
                  <label className="radio-label">
                    <input type="radio" name="search_status" value="Just thinking ahead" />
                    <span>Just thinking ahead</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="frustration">What&apos;s your biggest frustration right now?</label>
                <textarea id="frustration" name="frustration" maxLength={300} placeholder="A few sentences is plenty." required></textarea>
                <p className="char-count">
                  <span id="char-count">0</span> / 300
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="source">How did you hear about this?</label>
                <input type="text" id="source" name="source" />
              </div>

              <input type="hidden" name="_subject" value="New Get Found session request" />
              <input type="hidden" name="_replyto" value="" />

              <button type="submit" className="btn-submit">Send Request</button>
            </form>
          </div>
        </div>
      )}

      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          const textArea = document.getElementById('frustration');
          const charCount = document.getElementById('char-count');
          const backdrop = document.querySelector('.modal-backdrop');
          
          if (textArea) {
            textArea.addEventListener('input', function() {
              if (charCount) charCount.textContent = this.value.length;
            });
          }
          
          if (backdrop) {
            document.addEventListener('keydown', function(e) {
              if (e.key === 'Escape' && backdrop) {
                const closeBtn = backdrop.querySelector('.modal-close');
                if (closeBtn) closeBtn.click();
              }
            });
          }
        })();
      `}} />
    </div>
  )
}

