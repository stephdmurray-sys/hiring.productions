'use client'

import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Star, Folder, PenTool, FileText, Target, Users, Globe } from 'lucide-react'

const items = [
  {
    number: 1,
    icon: Star,
    title: 'A verified proof layer from the people who\'ve actually worked with you.',
    what: 'RepVera collects real messages, emails, and feedback from your managers, teammates, and clients — verified and portable. It\'s not a reference. It\'s a receipt.',
    why: 'Most professionals assume their reputation travels with them. It doesn\'t. What your colleagues say about you lives in inboxes and Slack threads nobody ever sees.',
    signals: 'That you\'re confident enough in how you work to let the people who\'ve seen it speak. That\'s a different category of candidate entirely.',
    start: 'Go to repvera.com, create your profile, and send the link to one person who\'s worked with you. That\'s it. The receipts build from there.',
    isRepVera: true,
    coral: true,
  },
  {
    number: 2,
    icon: Folder,
    title: 'A public record of something you actually made.',
    what: 'One project, one result, one real decision — documented and linkable. A Google Doc, Notion page, or simple site that shows the work itself, not a description of it.',
    why: 'It takes an hour and feels presumptuous. It isn\'t. Hiring managers Google candidates. Most searches return nothing.',
    signals: 'That you do work worth showing. That you\'re not hiding behind a resume. That you have enough confidence in your output to make it visible.',
    start: 'Pick one project you\'re proud of. Write three paragraphs: what it was, what you did, what changed. Publish it anywhere. Put the link on your resume and LinkedIn.',
    href: '/tools/resume-recruiter-eyes',
  },
  {
    number: 3,
    icon: PenTool,
    title: 'One piece of writing that shows how you actually think.',
    what: 'Not career advice. Not a how-to. Your actual perspective on something real in your field — one LinkedIn article, one Substack post, one thing that shows your mind at work.',
    why: 'People are afraid to be wrong publicly. But hiring managers aren\'t looking for perfect opinions. They\'re looking for evidence that you have them.',
    signals: 'Intellectual confidence. That you engage with your field beyond your job description. That you\'re interesting to be in a room with.',
    start: 'Write 300 words about one thing you\'ve seen work — or fail — in your industry. Post it. Link to it everywhere.',
    href: '/tools/how-you-come-across',
  },
  {
    number: 4,
    icon: FileText,
    title: 'A one-page document about you, sent before you walk in.',
    what: 'Who you are, what you\'ve done, what you\'re thinking about the role — prepared and sent the night before an interview. Like a creative brief but for yourself.',
    why: 'Nobody told them it was an option. Now you know.',
    signals: 'Preparation, strategic thinking, and respect for the interviewer\'s time. It also means they walk in already thinking about you — not reading your resume cold.',
    start: 'Write: one paragraph on your background, one on why this role specifically, one question you have about the team. Send it the evening before. Watch what happens.',
    href: '/tools/what-theyre-asking',
  },
  {
    number: 5,
    icon: Target,
    title: '25 companies you actually want, researched, with a name at each one.',
    what: 'Not 200 applications. 25 deliberate moves — companies you\'ve researched, with a specific person identified at each who could influence a hire.',
    why: 'Volume feels productive. It isn\'t. The data is clear: niche and targeted dramatically outperforms spray and pray.',
    signals: 'That you know what you want and why. Hiring managers can tell the difference between someone who wants this role and someone who wants any role.',
    start: 'Write 25 company names. For each, find one person on LinkedIn who\'s in the function you\'re targeting. That\'s your list. Now work it.',
    href: '/tools/where-you-have-a-shot',
  },
  {
    number: 6,
    icon: Users,
    title: 'Three people, prepped, specific, and linked — not "available on request."',
    what: 'A page or section that names your references, describes your relationship, and says specifically what they\'ll speak to. Ready before anyone asks.',
    why: 'They wait to be asked. By then it\'s reactive and rushed. The candidates who stand out have this ready.',
    signals: 'Confidence in how others experience you. Transparency. That you\'ve thought about what proof looks like, not just what claims look like.',
    start: 'Ask three people if they\'d be a reference. Write one sentence about what they\'ll speak to. Put it at the bottom of your resume as "References available — details on request" with a link.',
    isRepVera: true,
  },
  {
    number: 7,
    icon: Globe,
    title: 'Anything. Just something that makes a Google search a good experience.',
    what: 'A project. A talk. A piece. A GitHub. A Behance. A Substack. Anything that means "let me Google this person" returns something real instead of silence.',
    why: 'They assume their LinkedIn is enough. It isn\'t. Hiring managers Google candidates and form an impression in seconds.',
    signals: 'That you exist professionally beyond the documents you submitted. That you\'re engaged with your field. That you\'re not hiding.',
    start: 'Google yourself right now. If the first result isn\'t you — or there are no results — spend one hour today creating one thing that is.',
    href: '/tools/recruiter-find-you',
  },
]

export default function StandOutPage() {
  return (
    <div style={{ background: '#0F0F12', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation />

      {/* Hero Section */}
      <section style={{
        background: '#0F0F12',
        padding: '100px 40px 60px',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: '#8B8AA0',
          marginBottom: '20px',
        }}>
          STAND OUT IN THE CROWD
        </div>
        <h1 style={{
          fontFamily: "'Figtree', sans-serif",
          fontSize: 'clamp(36px, 5vw, 60px)',
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: '20px',
          letterSpacing: '-0.02em',
          color: '#F2F0FF',
        }}>
          What the candidates who actually get hired are doing differently.
        </h1>
        <p style={{
          fontFamily: "'Figtree', sans-serif",
          fontSize: '18px',
          fontWeight: 400,
          fontStyle: 'italic',
          color: '#8B8AA0',
          lineHeight: 1.7,
          maxWidth: '600px',
          margin: '20px auto 0',
        }}>
          Every great performance looks effortless. What you don't see is what happened before they walked in the room.
        </p>
        <p style={{
          fontFamily: "'Figtree', sans-serif",
          fontSize: '14px',
          fontWeight: 500,
          color: '#8B8AA0',
          marginTop: '32px',
        }}>
          Most candidates do none of these. The ones who do get the part.
        </p>
      </section>

      {/* Items Section */}
      <section style={{
        maxWidth: '860px',
        margin: '60px auto 0',
        padding: '0 40px 100px',
        width: '100%',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {items.map((item) => {
            const IconComponent = item.icon
            return (
              <div
                key={item.number}
                style={{
                  background: '#1A1A22',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  padding: '36px 40px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(108,71,255,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                }}
              >
                {/* Top row: number circle + icon circle + pill if needed */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  {/* Number circle */}
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(108,71,255,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Figtree', sans-serif",
                      fontSize: '16px',
                      fontWeight: 900,
                      color: '#6C47FF',
                      flexShrink: 0,
                    }}
                  >
                    {item.number}
                  </div>

                  {/* Icon circle */}
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(108,71,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#A78BFA',
                      flexShrink: 0,
                    }}
                  >
                    <IconComponent size={20} />
                  </div>

                  {/* Coral pill if RepVera */}
                  {item.coral && (
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '10px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        background: 'rgba(255,79,106,0.15)',
                        color: '#FF4F6A',
                        marginLeft: 'auto',
                      }}
                    >
                      Most Powerful
                    </div>
                  )}
                </div>

                {/* Title */}
                <h2 style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: '22px',
                  fontWeight: 900,
                  color: '#F2F0FF',
                  marginTop: '20px',
                  marginBottom: '24px',
                  lineHeight: 1.3,
                }}>
                  {item.title}
                </h2>

                {/* Four labeled rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                  {[
                    { label: 'WHAT IT IS', content: item.what },
                    { label: 'WHY ALMOST NOBODY DOES IT', content: item.why },
                    { label: 'WHAT IT SIGNALS TO A HIRING TEAM', content: item.signals },
                    { label: 'HOW TO START IN UNDER AN HOUR', content: item.start },
                  ].map((row, idx) => (
                    <div key={idx}>
                      <div
                        style={{
                          fontFamily: "'Figtree', sans-serif",
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          color: '#8B8AA0',
                          marginBottom: '8px',
                        }}
                      >
                        {row.label}
                      </div>
                      <p
                        style={{
                          fontFamily: "'Figtree', sans-serif",
                          fontSize: '15px',
                          fontWeight: 400,
                          color: '#F2F0FF',
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {row.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Button */}
                {item.isRepVera ? (
                  <a
                    href="https://www.repvera.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{
                      display: 'inline-flex',
                      padding: '12px 24px',
                      fontSize: '14px',
                      fontWeight: 800,
                      textDecoration: 'none',
                    }}
                  >
                    Start your RepVera — free
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="btn-ghost"
                    style={{
                      display: 'inline-flex',
                      padding: '12px 24px',
                      fontSize: '14px',
                      fontWeight: 800,
                      textDecoration: 'none',
                    }}
                  >
                    Get the inside look →
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: '#1A1A22',
        padding: '60px 40px',
        marginTop: '40px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#8B8AA0',
              marginBottom: '16px',
            }}
          >
            THE MISSING PIECE
          </div>
          <h2 style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '36px',
            fontWeight: 900,
            color: '#F2F0FF',
            marginBottom: '24px',
            letterSpacing: '-0.02em',
          }}>
            Most of this list is about proof.
          </h2>
          <p style={{
            fontFamily: "'Figtree', sans-serif",
            fontSize: '17px',
            fontWeight: 400,
            color: '#8B8AA0',
            lineHeight: 1.8,
            marginBottom: '32px',
          }}>
            Resumes are claims. Interviews are performances. References are opinions. RepVera is the only thing on this list that lets other people — the ones who've actually worked with you — put it on record.
          </p>
          <a
            href="https://www.repvera.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              display: 'inline-flex',
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: 800,
              textDecoration: 'none',
              marginBottom: '16px',
            }}
          >
            Start your RepVera — free
          </a>
          <p
            style={{
              fontFamily: "'Figtree', sans-serif",
              fontSize: '13px',
              color: '#8B8AA0',
              margin: '16px 0 0',
            }}
          >
            Free to start. Takes 10 minutes. Stays with you everywhere.
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
