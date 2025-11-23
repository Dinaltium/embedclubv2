import { CollectionConfig } from 'payload/types';

export const Timeline: CollectionConfig = {
  slug: 'timeline',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'tag', 'side'],
  },
  fields: [
    {
      name: 'date',
      type: 'text',
      required: true,
      admin: {
        description: 'Display date (e.g., "January 15, 2025")',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'tag',
      type: 'text',
      required: true,
      admin: {
        description: 'Category tag for the timeline item',
      },
    },
    {
      name: 'side',
      type: 'select',
      required: true,
      defaultValue: 'right',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Order of appearance (lower numbers appear first)',
      },
    },
  ],
};
