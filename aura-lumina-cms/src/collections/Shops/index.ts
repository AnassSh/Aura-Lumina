import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from 'payload'

export const Shops: CollectionConfig = {
  slug: 'shops',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'location'],
    description: 'Partner shops / boutiques',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    slugField({ fieldToUse: 'name' }),
    { name: 'tagline', type: 'text' },
    {
      name: 'location',
      type: 'group',
      fields: [
        { name: 'city', type: 'text' },
        { name: 'neighborhood', type: 'text' },
        { name: 'address', type: 'textarea' },
        { name: 'mapUrl', type: 'text', admin: { description: 'Google Maps URL' } },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'phone', type: 'text' },
        { name: 'whatsapp', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
      ],
    },
    { name: 'story', type: 'textarea' },
    { name: 'established', type: 'text', admin: { description: 'e.g. 2015' } },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: { description: 'Hero / main shop image' },
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'specialties',
      type: 'array',
      fields: [{ name: 'label', type: 'text' }],
      admin: { description: 'e.g. Handcrafted Abayas, Bridal Collections' },
    },
    {
      name: 'featuredProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: { description: 'Products to show on this shop profile' },
    },
    {
      name: 'hours',
      type: 'group',
      fields: [
        { name: 'weekdays', type: 'text' },
        { name: 'saturday', type: 'text' },
        { name: 'sunday', type: 'text' },
      ],
    },
  ],
}
