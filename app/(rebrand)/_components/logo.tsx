/**
 * Brand logo tile. The real logo loads in the visitor's browser; a
 * lettermark sits underneath so the tile still reads if the image is
 * blocked. The tool's name is always printed next to it, so the image
 * is decorative (alt="").
 */
export function Logo({ domain, name, size = 44, round = false, className = '' }: { domain: string; name: string; size?: number; round?: boolean; className?: string }) {
  return (
    <span
      className={`lg${round ? ' lg-round' : ''}${className ? ` ${className}` : ''}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.42) }}
      title={name}
    >
      <span className="lg-letter" aria-hidden="true">
        {name.charAt(0)}
      </span>
      <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`} alt="" loading="lazy" />
    </span>
  )
}

export const PUBLISHER_DOMAINS: Record<string, string> = {
  Zapier: 'zapier.com',
  Geekflare: 'geekflare.com',
  'Fast Company': 'fastcompany.com',
  SkillScouter: 'skillscouter.com',
  'Forbes Vetted': 'forbes.com',
  'Forbes Advisor': 'forbes.com',
  TechRadar: 'techradar.com',
  'The Muse': 'themuse.com',
  Money: 'money.com',
  MakeUseOf: 'makeuseof.com',
  FlexJobs: 'flexjobs.com',
  Monster: 'monster.com',
  Indeed: 'indeed.com',
  TechPP: 'techpp.com',
}
