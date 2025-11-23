import React from 'react'
import { SidebarShell, MainbarShell } from '@/components/FrontendShell'
import { ScrollTimeline } from '@/components/ScrollTimeline'

type Achievement = {
  id: number
  title: string
  summary: {
    root: {
      children: Array<{
        text?: string
        children?: Array<{ text?: string; [key: string]: any }>
        [key: string]: any
      }>
      [key: string]: any
    }
    [key: string]: any
  }
  date: string
  image?:
    | (number | null)
    | {
        id: number
        url?: string | null
        [key: string]: any
      }
}

type TimelineAchievement = {
  id: string
  title: string
  text: string
  image: string | null
}

/**
 * Extract plain text from Lexical rich text structure
 */
function extractTextFromLexical(summary: Achievement['summary']): string {
  if (!summary?.root?.children) return ''

  const extractText = (node: any): string => {
    if (typeof node === 'string') return node
    if (node.text) return node.text
    if (node.children && Array.isArray(node.children)) {
      return node.children.map(extractText).join('')
    }
    return ''
  }

  return summary.root.children.map(extractText).join(' ').trim()
}

/**
 * Transform PayloadCMS achievements to timeline format
 */
function transformAchievements(achievements: Achievement[]): TimelineAchievement[] {
  // Sort by date descending (newest first) as a safety measure
  // This ensures achievements are always displayed with the latest date at the top
  const sortedAchievements = [...achievements].sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0
    const dateB = b.date ? new Date(b.date).getTime() : 0
    // Descending order: newest dates (larger timestamps) come first
    return dateB - dateA
  })

  return sortedAchievements.map((achievement) => {
    // Extract text from lexical rich text
    const text = extractTextFromLexical(achievement.summary)

    // Get image URL from relationship
    let imageUrl: string | null = null
    if (achievement.image && typeof achievement.image === 'object' && 'url' in achievement.image) {
      imageUrl = achievement.image.url || null
    }

    return {
      id: achievement.id.toString(),
      title: achievement.title,
      text,
      image: imageUrl,
    }
  })
}

async function fetchAchievements(): Promise<Achievement[]> {
  // Build an absolute URL for server-side fetch (works during SSR/static generation)
  const base =
    process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_BASE_URL || 'http://localhost:3000'
  const url = new URL('/api/achievements', base)
  // Use Payload REST `sort` param: prefix with - to sort descending (newest first)
  url.searchParams.set('depth', '1')
  url.searchParams.set('sort', '-date') // Sort by date descending: newest achievements first

  // Debugging: log the URL being requested
  // eslint-disable-next-line no-console
  console.log('→ FETCHING:', url.toString())

  const res = await fetch(url.toString(), { cache: 'no-store' })
  if (!res.ok) {
    // Log response details to help debugging in development
    // eslint-disable-next-line no-console
    try {
      const text = await res.text()
      // eslint-disable-next-line no-console
      console.error('Failed to load achievements:', res.status, res.statusText, text)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to load achievements and could not read body', e)
    }
    throw new Error('Failed to load achievements')
  }
  const json = await res.json()
  return json.docs as Achievement[]
}

export default async function AchievementsPage() {
  const achievements = await fetchAchievements()
  const timelineAchievements = transformAchievements(achievements)

  return (
    <SidebarShell>
      <MainbarShell>
        <div className="w-full h-screen overflow-hidden">
          <ScrollTimeline achievements={timelineAchievements} />
        </div>
      </MainbarShell>
    </SidebarShell>
  )
}
