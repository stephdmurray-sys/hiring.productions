#!/usr/bin/env node
/**
 * Checks every YouTube video on the review site before release.
 * A video passes only if YouTube's oEmbed endpoint returns 200: it exists,
 * it's public, and its owner allows it to play on other sites. That is what
 * makes it play on our page instead of sending people to YouTube.
 *
 *   pnpm check:videos        (exit 1 if any video fails)
 *   Behind a proxy, Node's fetch needs NODE_USE_ENV_PROXY=1 (Node 22.21+); the pnpm script sets it.
 *
 * Needs www.youtube.com reachable. Run monthly (REFRESH.md) and before deploys.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ids = new Map()
const videos = JSON.parse(readFileSync('lib/evidence/videos.json', 'utf8')).videos
for (const v of videos) ids.set(v.youtubeId, { where: 'lib/evidence/videos.json', label: `${v.tool}: ${v.title}`, channel: v.channel })

const walk = (dir) => readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? walk(join(dir, f)) : [join(dir, f)]))
const re = /(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=)|youtu\.be\/|ytimg\.com\/vi\/)([A-Za-z0-9_-]{11})/g
for (const f of walk('app/(rebrand)').filter((f) => /\.(ts|tsx)$/.test(f) && !f.includes('mockups') && !f.includes('video-embed'))) {
  for (const m of readFileSync(f, 'utf8').matchAll(re)) if (!ids.has(m[1])) ids.set(m[1], { where: f, label: '' })
}

let failed = 0
for (const [id, meta] of ids) {
  const url = `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}`
  let status = 0
  let author = ''
  try {
    const res = await fetch(url)
    status = res.status
    if (res.ok) author = (await res.json()).author_name
  } catch {
    status = -1
  }
  const ok = status === 200
  const why = status === 401 ? 'embedding turned off by owner' : status === 404 || status === 400 ? 'removed, private or bad id' : status === -1 ? 'could not reach YouTube' : ''
  const channelNote = ok && meta.channel && meta.channel !== author ? ` (channel changed: was "${meta.channel}", now "${author}")` : ''
  if (!ok) failed++
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${id}  ${author || why}${channelNote}  ${meta.label || meta.where}`)
}
console.log(`\n${ids.size} videos checked, ${failed} failed.`)
process.exit(failed ? 1 : 0)
