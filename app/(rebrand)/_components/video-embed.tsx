'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Click-to-play YouTube video that plays here, on this page.
 *
 * - Shows the thumbnail until the visitor presses play, so no player (and
 *   no YouTube cookie) loads up front.
 * - Plays through YouTube's official IFrame API on youtube-nocookie.com,
 *   inline, with related videos limited to the same channel.
 * - Listens for the player's error event. If a video was removed or its
 *   owner turned off embedding since our last monthly check, the visitor
 *   sees a short note in place of a broken player, never a redirect.
 * - If the API can't load (blocked script), it falls back to a plain embed.
 *
 * Every video is also checked before release by scripts/check-videos.mjs.
 */

type YTPlayer = { destroy: () => void; playVideo: () => void }
type YTNamespace = {
  Player: new (
    el: HTMLElement,
    opts: {
      host?: string
      videoId: string
      width?: string
      height?: string
      playerVars?: Record<string, number | string>
      events?: { onReady?: (e: { target: YTPlayer }) => void; onError?: (e: { data: number }) => void }
    },
  ) => YTPlayer
}

declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

let apiPromise: Promise<YTNamespace | null> | null = null

function loadApi(): Promise<YTNamespace | null> {
  if (apiPromise) return apiPromise
  apiPromise = new Promise((resolve) => {
    if (window.YT?.Player) return resolve(window.YT)
    const prev = window.onYouTubeIframeAPIReady
    const timer = window.setTimeout(() => resolve(null), 8000)
    window.onYouTubeIframeAPIReady = () => {
      prev?.()
      window.clearTimeout(timer)
      resolve(window.YT ?? null)
    }
    const s = document.createElement('script')
    s.src = 'https://www.youtube.com/iframe_api'
    s.async = true
    s.onerror = () => {
      window.clearTimeout(timer)
      resolve(null)
    }
    document.head.appendChild(s)
  })
  return apiPromise
}

const PLAYER_VARS = { autoplay: 1, rel: 0, playsinline: 1, modestbranding: 1, iv_load_policy: 3 }

export function VideoEmbed({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [mode, setMode] = useState<'idle' | 'api' | 'plain' | 'error'>('idle')
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mode !== 'api') return
    let player: YTPlayer | null = null
    let cancelled = false
    loadApi().then((YT) => {
      if (cancelled || !host.current) return
      if (!YT) {
        setMode('plain')
        return
      }
      const el = document.createElement('div')
      host.current.appendChild(el)
      player = new YT.Player(el, {
        host: 'https://www.youtube-nocookie.com',
        videoId: youtubeId,
        width: '100%',
        height: '100%',
        playerVars: PLAYER_VARS,
        events: {
          onReady: (e) => e.target.playVideo(),
          // 2 bad id, 5 HTML5 error, 100 removed or private, 101/150 embedding turned off
          onError: () => setMode('error'),
        },
      })
    })
    return () => {
      cancelled = true
      player?.destroy()
      if (host.current) host.current.innerHTML = ''
    }
  }, [mode, youtubeId])

  if (mode === 'error') {
    return (
      <div className="vgone" role="status">
        <b>This video isn&rsquo;t available anymore.</b>
        <span>Its owner removed it or stopped it playing on other sites. We check every video monthly and replace the ones that go.</span>
      </div>
    )
  }

  if (mode === 'plain') {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  if (mode === 'api') {
    return <div ref={host} className="vplayer" title={title} />
  }

  return (
    <button
      type="button"
      className="vfacade"
      onClick={() => setMode('api')}
      aria-label={`Play video here: ${title}`}
      style={{ backgroundImage: `url(https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg)` }}
    >
      <span className="vplay" aria-hidden="true">
        <svg width="20" height="22" viewBox="0 0 20 22" fill="#1A1038">
          <path d="M2 1.5v19L19 11z" />
        </svg>
      </span>
    </button>
  )
}
