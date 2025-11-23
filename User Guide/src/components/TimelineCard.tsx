import { Calendar } from "lucide-react";

interface TimelineCardProps {
  date: string;
  title: string;
  description: string;
  tag: string;
  side: "left" | "right";
}

export function TimelineCard({ date, title, description, tag, side }: TimelineCardProps) {
  return (
    <div className="flex items-center justify-center w-full px-8">
      <div className={`flex items-center gap-0 w-full ${side === "left" ? "flex-row-reverse" : ""}`}>
        {/* Card */}
        <div className="w-[calc(50%-2rem)] bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <h3 className="mb-2">{title}</h3>
          <p className="text-gray-600 mb-3">{description}</p>
          <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded text-sm">
            {tag}
          </div>
        </div>

        {/* Timeline Dot - positioned absolutely relative to center */}
        <div className="relative w-16 flex items-center justify-center shrink-0">
          <div className="w-4 h-4 bg-white border-4 border-blue-500 rounded-full z-10" />
        </div>

        {/* Empty space on the other side */}
        <div className="w-[calc(50%-2rem)]" />
      </div>
    </div>
  );
}