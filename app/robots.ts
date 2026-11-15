import { MetadataRoute } from 'next'

/**
 * Crawler rules. Search engines and AI assistants are welcome to read and
 * cite the whole public site: the reviews, scores, guides and research are
 * meant to be quoted. Each AI crawler is named explicitly so the intent is
 * unambiguous (some only read a site when they're named). Only private or
 * internal surfaces are closed: the API, the admin area, the internal desk
 * and the design mockups.
 */

const PRIVATE = ['/api/', '/admin', '/admin/', '/desk', '/mockups']

const AI_CRAWLERS = [
  // OpenAI: search results, user-requested reads, model training
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  // Anthropic (Claude)
  'Claude-SearchBot',
  'Claude-User',
  'ClaudeBot',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google Gemini and AI Overviews, Apple Intelligence
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  // Microsoft Copilot reads through Bingbot; Meta AI, Amazon, Mistral, DuckDuckGo
  'meta-externalagent',
  'Amazonbot',
  'MistralAI-User',
  'DuckAssistBot',
  // Common Crawl, the open dataset many AI models learn from
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE },
      { userAgent: ['Googlebot', 'Bingbot'], allow: '/', disallow: PRIVATE },
      { userAgent: AI_CRAWLERS, allow: '/', disallow: PRIVATE },
    ],
    sitemap: 'https://hiring.productions/sitemap.xml',
    host: 'https://hiring.productions',
  }
}
