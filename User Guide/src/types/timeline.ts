export interface TimelineItem {
  id: number | string;
  date: string;
  title: string;
  description: string;
  tag: string;
  side: "left" | "right";
}

export interface TimelineProps {
  items: TimelineItem[];
  startYear?: number;
  endYear?: number;
}
