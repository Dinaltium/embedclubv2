import { SidebarShell, MainbarShell } from "@/components/FrontendShell";
import React from "react";
import AchievementCard from '@/components/AchievementCard'

type Achievement = {
  id: number
  title: string
  summary: any
  date?: string
  image?: { url?: string } | null
  order?: number
  layout?: string
}
async function fetchAchievements() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_BASE_URL || 'http://localhost:3000'
  const url = new URL('/api/achievements', base)
  url.searchParams.set('depth', '1')
  url.searchParams.set('sort', 'order')

  const res = await fetch(url.toString(), {
    cache: 'no-store',
  })
  if (!res.ok) throw new Error ('Failed to fetch achievements')
    const json = await res.json()
  return json.docs as Achievement[]
}
export default async function Page() {
  const items = await fetchAchievements()

  return (
    <SidebarShell>
      <MainbarShell>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid gap-8">
            {items.map((it) => (
              <AchievementCard key={it.id} item={it} />
            ))}
          </div>
        </div>
      </MainbarShell>
    </SidebarShell>
  )
}
