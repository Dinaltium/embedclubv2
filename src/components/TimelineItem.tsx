'use client'
import { useRef, useEffect, useState } from 'react'
import { motion } from 'motion/react'

interface Achievement {
  id: string
  title: string
  text: string
  image: string | null
}

interface TimelineItemProps {
  achievement: Achievement
  isLeft: boolean
  index: number
  totalItems: number
  scrollProgress: number
}

export function TimelineItem({
  achievement,
  isLeft,
  index,
  totalItems,
  scrollProgress,
}: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const itemProgress = index / (totalItems - 1)
  const visibilityThreshold = itemProgress - 0.1

  useEffect(() => {
    if (scrollProgress >= visibilityThreshold) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [scrollProgress, visibilityThreshold])

  const hasImage = achievement.image !== null

  return (
    <div ref={itemRef} className="relative mb-48">
      <div className="flex items-center gap-16 px-8 max-w-7xl mx-auto">
        {/* Left Side */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {isLeft ? (
            // Card text on left
            <div className="bg-card/80 dark:bg-white/5 backdrop-blur-sm border border-border dark:border-white/10 rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <h3 className="text-card-foreground dark:text-white text-xl font-semibold mb-3">
                {achievement.title}
              </h3>
              <p className="text-card-foreground/90 dark:text-white/90 leading-relaxed">
                {achievement.text}
              </p>
            </div>
          ) : hasImage ? (
            // Image on left (when card is on right)
            <div className="rounded-lg overflow-hidden">
              <img
                src={achievement.image || ''}
                alt="Achievement"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          ) : (
            // Empty space when no image and card is on right
            <div />
          )}
        </motion.div>

        {/* Center Space for Timeline */}
        <div className="w-0" />

        {/* Right Side */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          {!isLeft ? (
            // Card text on right
            <div className="bg-card/80 dark:bg-white/5 backdrop-blur-sm border border-border dark:border-white/10 rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <h3 className="text-card-foreground dark:text-white text-xl font-semibold mb-3">
                {achievement.title}
              </h3>
              <p className="text-card-foreground/90 dark:text-white/90 leading-relaxed">
                {achievement.text}
              </p>
            </div>
          ) : hasImage ? (
            // Image on right (when card is on left)
            <div className="rounded-lg overflow-hidden">
              <img
                src={achievement.image || ''}
                alt="Achievement"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          ) : (
            // Empty space when no image and card is on left
            <div />
          )}
        </motion.div>
      </div>
    </div>
  )
}
