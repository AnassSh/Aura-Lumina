import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const BeautyProducts: CollectionConfig = {
  slug: 'beauty-products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'brand', 'price', 'featured'],
    description: "Beauty page – Editor's Picks products",
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'brand', type: 'text', required: true, admin: { description: 'e.g. Pure Halal Beauty' } },
    { name: 'price', type: 'text', required: true, admin: { description: 'e.g. $24' } },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'imageUrl',
      type: 'text',
      admin: { description: 'Fallback: e.g. /images/product-1.svg' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show in Editor\'s Picks section' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Display order (lower first)' },
    },
  ],
}
