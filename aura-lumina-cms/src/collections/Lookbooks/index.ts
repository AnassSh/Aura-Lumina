import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const Lookbooks: CollectionConfig = {
  slug: 'lookbooks',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'titleKey',
    defaultColumns: ['titleKey', 'slug', 'order'],
    description: 'Explore Lookbooks collections (e.g. Winter Elegance, Everyday Essentials)',
  },
  fields: [
    {
      name: 'titleKey',
      type: 'text',
      required: true,
      admin: { description: 'Translation key for title (e.g. lb1Title)' },
    },
    {
      name: 'descKey',
      type: 'text',
      required: true,
      admin: { description: 'Translation key for description (e.g. lb1Desc)' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL slug (e.g. winter-elegance-2026)' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'imageUrl',
      type: 'text',
      admin: { description: 'Fallback: static path e.g. /images/lookbook-1.svg' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Display order (lower first)' },
    },
  ],
}
