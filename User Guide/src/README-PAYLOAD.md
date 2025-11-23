# Payload CMS Integration for Timeline Component

## Setup Instructions

### 1. Add Collection to Payload Config

In your `payload.config.ts`, import and add the Timeline collection:

```typescript
import { Timeline } from './payload/collections/Timeline';

export default buildConfig({
  collections: [
    Timeline,
    // ... your other collections
  ],
  // ... rest of your config
});
```

### 2. Fetch Timeline Data in Your Project

Replace the example data in `App.tsx` with an API call to Payload:

```typescript
// For Next.js (App Router)
async function getTimelineData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/timeline?sort=order`, {
    next: { revalidate: 60 } // Optional: ISR revalidation
  });
  const data = await res.json();
  return data.docs;
}

export default async function Page() {
  const timelineItems = await getTimelineData();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Timeline 
        items={timelineItems}
        startYear={2025}
        endYear={2022}
      />
    </div>
  );
}
```

```typescript
// For Next.js (Pages Router) or React
import { useEffect, useState } from 'react';

export default function App() {
  const [timelineItems, setTimelineItems] = useState([]);
  
  useEffect(() => {
    fetch('/api/timeline?sort=order')
      .then(r => r.json())
      .then(data => setTimelineItems(data.docs));
  }, []);
  
  if (timelineItems.length === 0) return <div>Loading...</div>;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Timeline 
        items={timelineItems}
        startYear={2025}
        endYear={2022}
      />
    </div>
  );
}
```

### 3. Admin Usage

1. Login to your Payload admin panel
2. Navigate to the "Timeline" collection
3. Click "Create New" to add timeline entries
4. Fill in the fields:
   - **Date**: Display date (e.g., "January 15, 2025")
   - **Title**: Title of the timeline item
   - **Description**: Description text
   - **Tag**: Category tag
   - **Side**: Choose "Left" or "Right" for card placement
   - **Order**: Number to control ordering (lower = appears first)
5. Save and publish

The timeline will automatically update when new items are added or existing items are modified.

## API Endpoints

- `GET /api/timeline` - Fetch all timeline items
- `GET /api/timeline?sort=order` - Fetch sorted by order field
- `GET /api/timeline/:id` - Fetch specific timeline item

## TypeScript Types

The timeline types are defined in `/types/timeline.ts` for type safety across your project.
