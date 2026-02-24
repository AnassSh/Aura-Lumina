/**
 * Seed Shops and Products from Aura Lumina static data.
 * Run via POST /next/seed-shops-products when logged in.
 */
import type { Payload, PayloadRequest } from 'payload'

const shopsData = [
  {
    slug: 'dar-el-yasmine',
    name: 'Dar El Yasmine',
    tagline: 'Where tradition meets modern elegance',
    location: {
      city: 'Casablanca',
      neighborhood: 'Maarif',
      address: '45 Rue Ibn Batouta, Maarif, Casablanca',
      mapUrl: 'https://maps.google.com/?q=Maarif+Casablanca',
    },
    contact: {
      phone: '+212 522 123 456',
      whatsapp: '+212661234567',
      instagram: 'darelysamine_casa',
    },
    story: `Dar El Yasmine was founded in 2015 by Fatima Bennani, a passionate artisan who learned the art of abaya-making from her grandmother in Fes. What started as a small corner in her family home has blossomed into one of Casablanca's most beloved modest fashion boutiques.

Every piece at Dar El Yasmine is crafted with intention. Fatima works directly with local seamstresses, ensuring fair wages and preserving traditional Moroccan embroidery techniques. Her philosophy is simple: "Elegance should never compromise comfort, and beauty should always tell a story."

When you visit Dar El Yasmine, you're not just shopping—you're becoming part of a community of women who value quality, craftsmanship, and timeless style.`,
    established: '2015',
    imageUrl: '/images/shop-hero-1.svg',
    specialties: [
      { label: 'Handcrafted Abayas' },
      { label: 'Bridal Collections' },
      { label: 'Custom Embroidery' },
      { label: 'Moroccan Kaftans' },
    ],
    hours: {
      weekdays: '10:00 AM - 8:00 PM',
      saturday: '10:00 AM - 9:00 PM',
      sunday: 'Closed',
    },
    productSlugs: ['jasmine-embroidered-abaya', 'pearl-silk-abaya', 'classic-black-gold-trim'],
  },
  {
    slug: 'atelier-nour',
    name: 'Atelier Nour',
    tagline: 'Light up your modesty',
    location: {
      city: 'Rabat',
      neighborhood: 'Agdal',
      address: '12 Avenue Fal Ould Oumeir, Agdal, Rabat',
      mapUrl: 'https://maps.google.com/?q=Agdal+Rabat',
    },
    contact: {
      phone: '+212 537 654 321',
      whatsapp: '+212662345678',
      instagram: 'ateliernour_rabat',
    },
    story: `Atelier Nour began as a dream shared between two sisters, Nadia and Salma, who wanted to create a space where Moroccan women could find modern modest wear that didn't sacrifice style for coverage.

After years of searching for abayas that felt both contemporary and appropriate, they decided to create their own. In 2018, Atelier Nour opened its doors in Rabat's trendy Agdal neighborhood.

The sisters believe that modesty is a personal journey, and their boutique reflects this philosophy. With a warm, welcoming atmosphere and personalized styling consultations, every woman who walks through their doors leaves feeling seen and celebrated.`,
    established: '2018',
    imageUrl: '/images/shop-hero-2.svg',
    specialties: [
      { label: 'Contemporary Abayas' },
      { label: 'Hijab Styling' },
      { label: 'Ready-to-Wear' },
      { label: 'Personal Consultations' },
    ],
    hours: {
      weekdays: '10:30 AM - 7:30 PM',
      saturday: '11:00 AM - 8:00 PM',
      sunday: 'Closed',
    },
    productSlugs: ['nour-collection-abaya', 'minimalist-linen-abaya', 'evening-velvet-abaya'],
  },
]

const productsData = [
  { slug: 'jasmine-embroidered-abaya', name: 'Jasmine Embroidered Abaya', price: '1,850 MAD', imageUrl: '/images/abaya-1.svg', shopSlug: 'dar-el-yasmine', category: 'Embroidered Abayas' },
  { slug: 'pearl-silk-abaya', name: 'Pearl Silk Abaya', price: '2,200 MAD', imageUrl: '/images/abaya-2.svg', shopSlug: 'dar-el-yasmine', category: 'Silk Abayas' },
  { slug: 'classic-black-gold-trim', name: 'Classic Black with Gold Trim', price: '1,650 MAD', imageUrl: '/images/abaya-3.svg', shopSlug: 'dar-el-yasmine', category: 'Classic Abayas' },
  { slug: 'nour-collection-abaya', name: 'Nour Collection Abaya', price: '1,450 MAD', imageUrl: '/images/abaya-4.svg', shopSlug: 'atelier-nour', category: 'Contemporary Abayas' },
  { slug: 'minimalist-linen-abaya', name: 'Minimalist Linen Abaya', price: '1,250 MAD', imageUrl: '/images/abaya-5.svg', shopSlug: 'atelier-nour', category: 'Linen Collection' },
  { slug: 'evening-velvet-abaya', name: 'Evening Velvet Abaya', price: '2,400 MAD', imageUrl: '/images/abaya-6.svg', shopSlug: 'atelier-nour', category: 'Evening Wear' },
]

export async function seedShopsAndProducts({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> {
  payload.logger.info('Seeding shops and products...')

  // Clear existing shops and products (optional - preserves your manually added products if we skip)
  const existingShops = await payload.find({
    collection: 'shops',
    limit: 0,
    pagination: false,
  })
  const existingProducts = await payload.find({
    collection: 'products',
    limit: 0,
    pagination: false,
  })

  if (existingShops.totalDocs > 0 || existingProducts.totalDocs > 0) {
    payload.logger.info(`— Clearing ${existingShops.totalDocs} shops and ${existingProducts.totalDocs} products...`)
    await payload.db.deleteMany({ collection: 'products', req, where: {} })
    await payload.db.deleteMany({ collection: 'shops', req, where: {} })
  }

  payload.logger.info('— Creating shops...')
  const shopDocs: Record<string, { id: number | string }> = {}

  for (const shop of shopsData) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- imageUrl exists on Shop config but may not be in generated types yet
    const shopData: any = {
      name: shop.name,
      slug: shop.slug,
      tagline: shop.tagline,
      location: shop.location,
      contact: shop.contact,
      story: shop.story,
      established: shop.established,
      specialties: shop.specialties,
      hours: shop.hours,
      imageUrl: shop.imageUrl,
    }
    const doc = await payload.create({
      collection: 'shops',
      data: shopData,
      req,
    })
    shopDocs[shop.slug] = doc
  }

  payload.logger.info('— Creating products...')
  const productDocs: Record<string, { id: number | string }> = {}

  for (const prod of productsData) {
    const shop = shopDocs[prod.shopSlug]
    const doc = await payload.create({
      collection: 'products',
      data: {
        name: prod.name,
        slug: prod.slug,
        price: prod.price,
        imageUrl: prod.imageUrl,
        shop: shop ? (shop.id as number) : undefined,
      },
      req,
    })
    productDocs[prod.slug] = doc
  }

  payload.logger.info('— Linking featured products to shops...')
  for (const shop of shopsData) {
    const featuredIds = shop.productSlugs
      .map((slug) => productDocs[slug]?.id)
      .filter((id): id is number => typeof id === 'number')
    if (featuredIds.length) {
      await payload.update({
        collection: 'shops',
        id: shopDocs[shop.slug].id,
        data: { featuredProducts: featuredIds },
        req,
      })
    }
  }

  payload.logger.info('Shops and products seeded successfully!')
}
