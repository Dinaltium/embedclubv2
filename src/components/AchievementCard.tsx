import React from 'react'
import { PortableTextRender } from './RichTextRender'
export default function AchievementCard({ item }: { item: any }) {
  const { title, summary, date, image, layout } = item
  const imgUrl = image?.url || null

  const isRight = layout === 'card-right'

  return (
    <article className={`relative rounded-lg shadow-md bg-white p-6 flex ${isRight ? 'flex-row-reverse' : 'flex-row'} items-center`}>
      {/* small circular connector at left for timeline style */}
      <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="block w-5 h-5 bg-teal-400 rounded-full border-4 border-slate-800"></span>
      </div>

      {/* image */}
      {imgUrl && (
        <div className="w-28 h-28 flex-shrink-0 overflow-hidden rounded-md mr-4">
          <img src={imgUrl} alt={title || 'achievement image'} className="w-full h-full object-cover" />
        </div>
      )}

      {/* content */}
      <div className="flex-1">
        <h3 className="text-teal-700 font-semibold mb-2">{title}</h3>
        <div className="text-sm text-slate-700 mb-3">
          <PortableTextRender value={summary} />
        </div>
        <div className="text-xs text-slate-500">{date ? new Date(date).toLocaleDateString() : ''}</div>
      </div>

      {/* arrow decoration */}
      <div className={`pointer-events-none absolute ${isRight ? 'right-full' : 'left-full'} top-1/2 -translate-y-1/2`}>
        <svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="22" width="32" height="4" fill="#0ea5a0" />
          <path d="M32 24 L24 16 L24 32 Z" fill="#0ea5a0" />
        </svg>
      </div>
    </article>
  )
}