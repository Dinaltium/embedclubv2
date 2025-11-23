import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { TimelineCard } from "./TimelineCard";
import { TimelineScrollbar } from "./TimelineScrollbar";
import { TimelineProps } from "../types/timeline";

export function Timeline({ items, startYear, endYear }: TimelineProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Calculate years from data if not provided
  const calculatedStartYear = startYear || new Date().getFullYear();
  const calculatedEndYear = endYear || calculatedStartYear - 3;
  
  // Calculate the total scrollable height
  const totalItems = items.length;
  const visibleItems = 3.5; // Show 3 full items + 1 partially visible
  const maxScroll = Math.max(0, totalItems - visibleItems);
  const itemSpacing = 180; // Consistent spacing between items - closer together

  const handleScrollChange = (progress: number) => {
    setScrollProgress(progress);
  };

  // Handle mouse wheel scrolling
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.05 : -0.05;
      setScrollProgress((prev) => Math.max(0, Math.min(1, prev + delta)));
    };

    const timeline = timelineRef.current;
    if (timeline) {
      timeline.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (timeline) {
        timeline.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  // Calculate which items should be visible and their opacity
  const getItemOpacity = (index: number) => {
    const scrollPosition = scrollProgress * maxScroll;
    const itemPosition = index;
    
    // Distance from the visible window
    const distanceFromTop = itemPosition - scrollPosition;
    const distanceFromBottom = scrollPosition + visibleItems - itemPosition;

    // Fade out if too close to top (before -0.5) or bottom (after visibleItems + 0.5)
    if (distanceFromTop < -0.5) {
      return Math.max(0, 1 + (distanceFromTop + 0.5) * 2);
    } else if (distanceFromBottom < 0.5) {
      return Math.max(0.3, distanceFromBottom * 2);
    }
    
    return 1;
  };

  const getItemTransform = (index: number) => {
    const scrollPosition = scrollProgress * maxScroll;
    const offset = (scrollPosition - index) * itemSpacing; // Use consistent spacing
    return offset;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Timeline Container */}
      <div className="relative w-full max-w-5xl h-screen flex items-center justify-center">
        {/* Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 -translate-x-1/2" />
        
        {/* Timeline Items Container */}
        <div 
          ref={timelineRef}
          className="relative w-full h-[calc(3.5*180px)] overflow-hidden cursor-default"
        >
          {items.map((item, index) => {
            const opacity = getItemOpacity(index);
            const translateY = getItemTransform(index);
            
            return (
              <motion.div
                key={item.id}
                className="absolute w-full"
                style={{
                  top: `${index * itemSpacing}px`,
                  opacity,
                  y: -translateY,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <TimelineCard
                  date={item.date}
                  title={item.title}
                  description={item.description}
                  tag={item.tag}
                  side={item.side}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Timeline Scrollbar */}
        <TimelineScrollbar
          scrollProgress={scrollProgress}
          onScrollChange={handleScrollChange}
          startYear={calculatedStartYear}
          endYear={calculatedEndYear}
        />
      </div>
    </div>
  );
}