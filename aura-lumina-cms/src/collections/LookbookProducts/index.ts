import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const LookbookProducts: CollectionConfig = {
  slug: 'lookbook-products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'lookbook', 'price', 'order'],
    description: 'Products inside a lookbook collection',
  },
  fields: [
    {
      name: 'lookbook',
      type: 'relationship',
      relationTo: 'lookbooks',
      required: true,
      hasMany: false,
      admin: { description: 'Which lookbook collection this product belongs to' },
    },
    { name: 'name', type: 'text', required: true, admin: { description: 'Product name or translation key' } },
    { name: 'price', type: 'text', required: true, admin: { description: 'e.g. 1,250 MAD' } },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'imageUrl',
      type: 'text',
      admin: { description: 'Fallback: e.g. /images/abaya-1.svg' },
    },
    {
      name: 'sizes',
      type: 'array',
      fields: [{ name: 'size', type: 'text' }],
      admin: { description: 'e.g. S, M, L, XL' },
    },
    {
      name: 'colors',
      type: 'array',
      fields: [{ name: 'color', type: 'text' }],
      admin: { description: 'e.g. Black, Navy' },
    },
    {
      name: 'badge',
      type: 'select',
      options: [
        { label: 'None', value: 'none' },
        { label: 'New', value: 'new' },
        { label: 'Bestseller', value: 'bestseller' },
        { label: 'Sale', value: 'sale' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Order within the lookbook' },
    },
  ],
}
