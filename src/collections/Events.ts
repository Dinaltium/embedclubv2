import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { 
      type: 'tabs',
      tabs: [
        {
          label: 'Event',
          fields: [
            {
              name: 'category',
              label: 'Category',
              type: 'text',
              required: true,
            },
            {
              name: 'title',
              label: 'Title',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          label: 'Card',
          fields: [
            {
              name: 'summary',
              label: 'Description',
              type: 'richText',
              required: true,
              admin: {
                description: 'Enter Event         Details',
              },
            },
            {
              name: "location",
              type: "group",
              fields: [
                {
                  name: "address",
                  type: "text",
                  label: "Event Address",
                  required: false,
                },
                {
                  name: "coords",
                  type: "point",
                  label: "Coordinates",
                  required: false,
                  admin: {
                    components: {
                      Field: "@/        components/payload/       MapField", 
                    },
                  },
                },
              ],
            }
          ],
        }
      ],
    },
  ],
}
