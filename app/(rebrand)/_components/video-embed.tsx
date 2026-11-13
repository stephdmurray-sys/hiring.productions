'use client'

import { useState } from 'react'

/**
 * Click-to-play YouTube embed. Shows the thumbnail until the visitor asks
 * for the video, so the page does not load a dozen players up front and
 * YouTube sets no cookies until someone presses play.
 */
export function VideoEmbed({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  return (
    <button
      type="button"
      className="vfacade"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
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
