import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'price', 'shop', 'badge'],
    description: 'Abaya products / shop items',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    slugField({ fieldToUse: 'name' }),
    { name: 'price', type: 'text', required: true, admin: { description: 'e.g. 1,850 MAD' } },
    {
      name: 'originalPrice',
      type: 'text',
      admin: { description: 'Original price for sale items (e.g. 2,000 MAD)' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: { description: 'Product image' },
    },
    {
      name: 'imageUrl',
      type: 'text',
      admin: {
        description: 'Fallback: external or static path (e.g. /images/abaya-1.svg)',
      },
    },
    {
      name: 'colors',
      type: 'array',
      fields: [{ name: 'color', type: 'text' }],
    },
    {
      name: 'sizes',
      type: 'array',
      fields: [{ name: 'size', type: 'text' }],
    },
    {
      name: 'badge',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Bestseller', value: 'bestseller' },
        { label: 'Sale', value: 'sale' },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'lookbookFeatured', type: 'checkbox', defaultValue: false },
    {
      name: 'filterCategory',
      type: 'select',
      options: [
        { label: 'All', value: 'all' },
        { label: 'New Arrivals', value: 'new' },
        { label: 'Bestsellers', value: 'bestseller' },
        { label: 'On Sale', value: 'sale' },
        { label: 'Everyday', value: 'everyday' },
        { label: 'Formal', value: 'formal' },
      ],
    },
    {
      name: 'shop',
      type: 'relationship',
      relationTo: 'shops',
      admin: { description: 'Shop this product belongs to' },
    },
  ],
}
