import type { CollectionConfig } from 'payload'

export const Achievements: CollectionConfig = {
  slug: 'achievements',
  admin: {
    useAsTitle: 'title',
    description: 'Achievements for the timeline page - ordered by date (newest first)',
    defaultColumns: ['title', 'date', 'image'],
  },
  access: {
    read: () => true,
  },
  fields: [
    // Title - shown to editors in admin (used internally, not displayed on timeline)
    { 
      name: 'title', 
      label: 'Title', 
      type: 'text', 
      required: true,
      admin: {
        description: 'Internal title for organization (not shown on public timeline)',
      },
    },

    // Summary - Rich text editor (lexical). This becomes the card text on the timeline.
    {
      name: 'summary',
      label: 'Achievement Text',
      type: 'richText',
      required: true,
      admin: {
        description: 'The text content that will appear on the timeline card',
      },
    },

    // Date - required for ordering achievements (newest first)
    {
      name: 'date',
      label: 'Achievement Date',
      type: 'date',
      required: true,
      admin: {
        description: 'Date of the achievement (determines order on timeline - newest first)',
        date: { 
          pickerAppearance: 'dayAndTime',
          displayFormat: 'MMM d, yyyy',
        },
      },
    },

    // Optional image - will appear on opposite side of text on timeline
    {
      name: 'image',
      label: 'Image (optional)',
      type: 'relationship',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Optional image - will appear opposite the text card on the timeline',
      },
    },
  ],
}

export default Achievements
