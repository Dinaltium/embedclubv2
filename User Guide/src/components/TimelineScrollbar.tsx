import { useState, useRef, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface TimelineScrollbarProps {
  scrollProgress: number;
  onScrollChange: (progress: number) => void;
  startYear: number;
  endYear: number;
}

export function TimelineScrollbar({
  scrollProgress,
  onScrollChange,
  startYear,
  endYear,
}: TimelineScrollbarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updateScrollFromMouse(e.clientY);
  };

  const updateScrollFromMouse = (clientY: number) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const y = clientY - rect.top;
    const progress = Math.max(0, Math.min(1, y / rect.height));
    onScrollChange(progress);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateScrollFromMouse(e.clientY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleTrackClick = (e: React.MouseEvent) => {
    updateScrollFromMouse(e.clientY);
  };

  const scrollUp = () => {
    onScrollChange(Math.max(0, scrollProgress - 0.1));
  };

  const scrollDown = () => {
    onScrollChange(Math.min(1, scrollProgress + 0.1));
  };

  return (
    <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
      {/* Up Arrow */}
      <button
        onClick={scrollUp}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Scroll up"
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      {/* Year Label - Top */}
      <span className="text-sm text-gray-700">{startYear}</span>

      {/* Scrollbar Track */}
      <div
        ref={trackRef}
        className="relative w-1 h-96 bg-gray-300 rounded-full cursor-pointer"
        onClick={handleTrackClick}
      >
        {/* Progress Fill */}
        <div
          className="absolute top-0 left-0 right-0 w-full bg-red-500 rounded-full transition-all"
          style={{ height: `${scrollProgress * 100}%` }}
        />

        {/* Thumb */}
        <div
          className="absolute -translate-x-1/2 w-4 h-8 bg-red-500 rounded-full cursor-grab active:cursor-grabbing shadow-md left-1/2"
          style={{ top: `${scrollProgress * 100}%`, marginTop: '-16px' }}
          onMouseDown={handleMouseDown}
        />
      </div>

      {/* Year Label - Bottom */}
      <span className="text-sm text-gray-700">{endYear}</span>

      {/* Down Arrow */}
      <button
        onClick={scrollDown}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </button>

      {/* Timeline Scrollbar Label */}
      <div className="text-center mt-2">
        <div className="text-xs text-gray-500">Timeline</div>
        <div className="text-xs text-gray-500">Scrollbar</div>
      </div>
    </div>
  );
}