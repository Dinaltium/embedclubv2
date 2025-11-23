import { Timeline } from "./components/Timeline";

// Example data - replace this with data fetched from Payload CMS API
const timelineData = [
  {
    id: 1,
    date: "January 15, 2025",
    title: "My road to glory!",
    description: "Exciting new plans for a rewarding career in my new field of interest",
    tag: "Challenges",
    side: "right" as const,
  },
  {
    id: 2,
    date: "October 20, 2024",
    title: "Started my first blog post ever",
    description: "It was about my journey learning to code",
    tag: "First move",
    side: "right" as const,
  },
  {
    id: 3,
    date: "September 12, 2024",
    title: "Created my blog and wrote my first post",
    description: "Documenting my career transition",
    tag: "Blog",
    side: "left" as const,
  },
  {
    id: 4,
    date: "January 12, 2024",
    title: "Learning anything on 100 days challenge",
    description: "Started a 100-day coding challenge",
    tag: "100 Days",
    side: "right" as const,
  },
  {
    id: 5,
    date: "August 5, 2023",
    title: "Got 3 start Codewars on Python",
    description: "Achieved 3 start rating solving Python challenges",
    tag: "Codewars #1",
    side: "left" as const,
  },
  {
    id: 6,
    date: "March 20, 2023",
    title: "Started learning Web Development",
    description: "Began my journey into frontend development",
    tag: "New Start",
    side: "right" as const,
  },
  {
    id: 7,
    date: "December 1, 2022",
    title: "Completed my first online course",
    description: "Finished Python basics certification",
    tag: "Education",
    side: "left" as const,
  },
];

export default function App() {
  // In your Payload project, fetch data like this:
  // const { data } = await fetch('/api/timeline?sort=order').then(r => r.json());
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Timeline 
        items={timelineData}
        startYear={2025}
        endYear={2022}
      />
    </div>
  );
}