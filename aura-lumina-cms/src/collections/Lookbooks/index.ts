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
      admin: {
        description: 'Either a translation key (e.g. lb1Title) from your locale files, or the exact title text to show (e.g. Abaya Collection for Aeid). Use a key if you need the title translated per language.',
      },
    },
    {
      name: 'descKey',
      type: 'text',
      required: true,
      admin: {
        description: 'Either a translation key (e.g. lb1Desc) from your locale files, or the exact description text to show. Use a key if you need the description translated per language.',
      },
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
