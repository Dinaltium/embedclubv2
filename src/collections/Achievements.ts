import type { CollectionConfig } from 'payload'

export const Achievements: CollectionConfig = {
    slug: 'achievements',
    admin: {
        useAsTitle: 'title',
        description: 'List of Achievements',
    },
    access: {
        read: () => true,
    },
    fields: [
    { name: 'title', label: 'Title', type: 'text', required: true },
        {
            name: 'summary',
            label: 'Summary / Short text',
            type: 'richText',
            required: true,
        },
        {
            name: 'date',
            label: 'Date',
            type: 'date',
            admin: {date: { pickerAppearance: 'dayAndTime' }},
        },
        {
            name: 'image',
            label: 'Image (optional)',
            type: 'relationship',
            relationTo: 'media',
            required: false,
            admin: {
                description: 'Select an existing media item to use as the image for this achievement.',
            },
        },
        {
            name: 'order',
            label: 'Order',
            type: 'number',
            admin: {
                description: 'Lower numbers appear first'
            },
            defaultValue: 0,
        },
        {
            name: 'layout',
            label: 'Layout / Visual style',
            type: 'select',
            options: [
                { label: 'Card (image left)', value: 'card-left' },
                { label: 'Card (image right)', value: 'card-right' },
                { label: 'Centered', value: 'centered' },
            ],
            defaultValue: 'card-left',
            admin: { description: 'Choose a layout variant for this item. '},
        },
    ],
}

export default Achievements;