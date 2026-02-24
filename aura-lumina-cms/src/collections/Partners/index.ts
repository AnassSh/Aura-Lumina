import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { incomingApiOrAuthenticated } from '../../access/incomingApiOrAuthenticated'

/**
 * Partners – shop partnership applications from the contact form.
 * Data structure matches PartnerPayload from Aura-Lumina /api/contact.
 * Main site POSTs here when PAYLOAD_INCOMING_API_KEY is set; or n8n can forward with API key.
 */
export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'shopName',
    defaultColumns: ['shopName', 'shopCity', 'firstName', 'email', 'createdAt'],
    description: 'Shop partnership applications submitted via the contact form',
  },
  access: {
    create: incomingApiOrAuthenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'formType', type: 'text', defaultValue: 'partner', admin: { readOnly: true } },
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'message', type: 'textarea' },
    { name: 'newsletter', type: 'checkbox', defaultValue: false },
    { name: 'locale', type: 'text' },
    { name: 'submittedAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'shopName', type: 'text', required: true },
    { name: 'shopCity', type: 'text', required: true },
    { name: 'shopNeighborhood', type: 'text' },
    { name: 'shopAddress', type: 'textarea' },
    { name: 'shopPhone', type: 'text' },
    { name: 'shopWhatsapp', type: 'text' },
    { name: 'shopInstagram', type: 'text' },
    { name: 'shopWebsite', type: 'text' },
    { name: 'shopDescription', type: 'textarea' },
  ],
  timestamps: true,
}
