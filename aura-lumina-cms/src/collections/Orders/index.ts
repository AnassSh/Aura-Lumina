import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { incomingApiOrAuthenticated } from '../../access/incomingApiOrAuthenticated'

/**
 * Orders – product orders from the contact form.
 * Data structure matches OrderPayload from Aura-Lumina /api/contact.
 * Main site POSTs here when PAYLOAD_INCOMING_API_KEY is set; or n8n can forward with API key.
 */
export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'productName', 'createdAt'],
    description: 'Product orders submitted via the contact form',
  },
  access: {
    create: incomingApiOrAuthenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'formType', type: 'text', defaultValue: 'order', admin: { readOnly: true } },
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'message', type: 'textarea' },
    { name: 'newsletter', type: 'checkbox', defaultValue: false },
    { name: 'locale', type: 'text' },
    { name: 'submittedAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'productName', type: 'text' },
    { name: 'productPrice', type: 'text' },
    { name: 'productImage', type: 'text' },
    { name: 'selectedSize', type: 'text' },
    { name: 'selectedColor', type: 'text' },
    { name: 'quantity', type: 'number' },
    { name: 'shopSlug', type: 'text' },
    { name: 'productSlug', type: 'text' },
    { name: 'address', type: 'textarea' },
    { name: 'instagram', type: 'text' },
    { name: 'facebook', type: 'text' },
  ],
  timestamps: true,
}
