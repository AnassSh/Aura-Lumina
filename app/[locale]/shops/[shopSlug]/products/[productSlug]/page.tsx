import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import ProductActions from "@/components/ProductActions";

// Types
interface Product {
  slug: string;
  name: string;
  price: string;
  description: string;
  details: string[];
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  category: string;
  fabric: string;
  care: string[];
}

interface Shop {
  slug: string;
  name: string;
  city: string;
  neighborhood: string;
  phone: string;
  whatsapp: string;
  instagram?: string;
}

// Mock data - Products organized by shop
const shopProducts: Record<string, { shop: Shop; products: Record<string, Product> }> = {
  "dar-el-yasmine": {
    shop: {
      slug: "dar-el-yasmine",
      name: "Dar El Yasmine",
      city: "Casablanca",
      neighborhood: "Maarif",
      phone: "+212 522 123 456",
      whatsapp: "+212661234567",
      instagram: "darelysamine_casa",
    },
    products: {
      "jasmine-embroidered-abaya": {
        slug: "jasmine-embroidered-abaya",
        name: "Jasmine Embroidered Abaya",
        price: "1,850 MAD",
        description:
          "A stunning handcrafted abaya featuring delicate jasmine-inspired embroidery along the sleeves and neckline. Made from premium crepe fabric, this piece combines traditional Moroccan craftsmanship with contemporary elegance.",
        details: [
          "Hand-embroidered jasmine motifs",
          "Premium Korean crepe fabric",
          "Hidden snap buttons at front",
          "Matching belt included",
          "Loose, flowing silhouette",
        ],
        images: [
          "/images/abaya-1.svg",
          "/images/product-detail-1.svg",
          "/images/product-detail-2.svg",
        ],
        colors: [
          { name: "Black", hex: "#1a1a1a" },
          { name: "Navy", hex: "#1e3a5f" },
          { name: "Burgundy", hex: "#722f37" },
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        category: "Embroidered Abayas",
        fabric: "Premium Korean Crepe",
        care: [
          "Dry clean recommended",
          "Iron on low heat",
          "Store on padded hanger",
        ],
      },
      "pearl-silk-abaya": {
        slug: "pearl-silk-abaya",
        name: "Pearl Silk Abaya",
        price: "2,200 MAD",
        description:
          "Luxurious silk abaya adorned with genuine freshwater pearl details. Perfect for special occasions, weddings, and Eid celebrations. The subtle sheen of the silk catches light beautifully.",
        details: [
          "Genuine freshwater pearl accents",
          "100% mulberry silk",
          "Concealed zipper closure",
          "Silk lining for comfort",
          "A-line silhouette",
        ],
        images: [
          "/images/abaya-2.svg",
          "/images/product-detail-3.svg",
          "/images/product-detail-4.svg",
        ],
        colors: [
          { name: "Champagne", hex: "#f7e7ce" },
          { name: "Dusty Rose", hex: "#dcae96" },
          { name: "Ivory", hex: "#fffff0" },
        ],
        sizes: ["S", "M", "L", "XL"],
        category: "Silk Abayas",
        fabric: "100% Mulberry Silk",
        care: [
          "Professional dry clean only",
          "Do not iron directly on pearls",
          "Store in garment bag",
        ],
      },
      "classic-black-gold-trim": {
        slug: "classic-black-gold-trim",
        name: "Classic Black with Gold Trim",
        price: "1,650 MAD",
        description:
          "Timeless elegance meets everyday practicality. This classic black abaya features subtle gold trim along the edges, making it perfect for both daily wear and semi-formal occasions.",
        details: [
          "Gold metallic trim detailing",
          "Wrinkle-resistant Nidha fabric",
          "Front open design",
          "Side pockets",
          "Straight cut silhouette",
        ],
        images: [
          "/images/abaya-3.svg",
          "/images/product-detail-5.svg",
          "/images/product-detail-6.svg",
        ],
        colors: [{ name: "Black", hex: "#1a1a1a" }],
        sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
        category: "Classic Abayas",
        fabric: "Premium Nidha",
        care: [
          "Machine washable on gentle",
          "Tumble dry low",
          "Iron on medium heat",
        ],
      },
    },
  },
  "atelier-nour": {
    shop: {
      slug: "atelier-nour",
      name: "Atelier Nour",
      city: "Rabat",
      neighborhood: "Agdal",
      phone: "+212 537 654 321",
      whatsapp: "+212662345678",
      instagram: "ateliernour_rabat",
    },
    products: {
      "nour-collection-abaya": {
        slug: "nour-collection-abaya",
        name: "Nour Collection Abaya",
        price: "1,450 MAD",
        description:
          "The signature piece from our Nour collection. Clean lines, minimal design, maximum impact. This contemporary abaya is designed for the modern woman who values simplicity and quality.",
        details: [
          "Minimalist clean design",
          "Japanese crepe fabric",
          "Invisible magnetic closures",
          "Dropped shoulders",
          "Relaxed fit",
        ],
        images: [
          "/images/abaya-4.svg",
          "/images/product-detail-7.svg",
          "/images/product-detail-8.svg",
        ],
        colors: [
          { name: "Charcoal", hex: "#36454f" },
          { name: "Camel", hex: "#c19a6b" },
          { name: "Olive", hex: "#808000" },
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        category: "Contemporary Abayas",
        fabric: "Japanese Crepe",
        care: [
          "Hand wash cold",
          "Hang to dry",
          "Steam instead of ironing",
        ],
      },
      "minimalist-linen-abaya": {
        slug: "minimalist-linen-abaya",
        name: "Minimalist Linen Abaya",
        price: "1,250 MAD",
        description:
          "Breathable, lightweight, and effortlessly chic. Our linen abaya is perfect for warm Moroccan days. The natural fabric keeps you cool while the relaxed silhouette ensures comfort all day.",
        details: [
          "100% European linen",
          "Breathable and lightweight",
          "Coconut shell buttons",
          "Side slits for movement",
          "Oversized fit",
        ],
        images: [
          "/images/abaya-5.svg",
          "/images/product-detail-9.svg",
          "/images/product-detail-10.svg",
        ],
        colors: [
          { name: "Natural", hex: "#f5f5dc" },
          { name: "Sage", hex: "#9dc183" },
          { name: "Terracotta", hex: "#e2725b" },
        ],
        sizes: ["One Size"],
        category: "Linen Collection",
        fabric: "100% European Linen",
        care: [
          "Machine wash cold",
          "Tumble dry low",
          "Iron while damp",
          "Gets softer with each wash",
        ],
      },
      "evening-velvet-abaya": {
        slug: "evening-velvet-abaya",
        name: "Evening Velvet Abaya",
        price: "2,400 MAD",
        description:
          "Make an entrance with our luxurious velvet abaya. Rich, deep color and sumptuous texture create a dramatic effect perfect for evening events, weddings, and special celebrations.",
        details: [
          "Premium Italian velvet",
          "Satin lining throughout",
          "Bell sleeves",
          "Crystal button details",
          "Floor-length with train option",
        ],
        images: [
          "/images/abaya-6.svg",
          "/images/product-detail-11.svg",
          "/images/product-detail-12.svg",
        ],
        colors: [
          { name: "Emerald", hex: "#50c878" },
          { name: "Ruby", hex: "#e0115f" },
          { name: "Sapphire", hex: "#0f52ba" },
        ],
        sizes: ["S", "M", "L", "XL"],
        category: "Evening Wear",
        fabric: "Italian Velvet with Satin Lining",
        care: [
          "Professional dry clean only",
          "Store flat or on padded hanger",
          "Steam only, do not iron",
        ],
      },
    },
  },
};

// Generate static params for all products (per locale)
export async function generateStaticParams() {
  const params: { locale: string; shopSlug: string; productSlug: string }[] = [];

  routing.locales.forEach((locale) => {
    Object.entries(shopProducts).forEach(([shopSlug, { products }]) => {
      Object.keys(products).forEach((productSlug) => {
        params.push({ locale, shopSlug, productSlug });
      });
    });
  });

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { shopSlug: string; productSlug: string };
}): Promise<Metadata> {
  const shopData = shopProducts[params.shopSlug];
  if (!shopData) return { title: "Product Not Found" };

  const product = shopData.products[params.productSlug];
  if (!product) return { title: "Product Not Found" };

  const { shop } = shopData;

  return {
    title: `${product.name} | ${shop.name} - ${shop.city}`,
    description: `${product.description.slice(0, 150)}... Available at ${shop.name} in ${shop.neighborhood}, ${shop.city}. ${product.price}.`,
    keywords: [
      product.name,
      product.category,
      "abaya",
      "modest fashion",
      shop.city,
      shop.name,
      product.fabric,
    ],
    openGraph: {
      title: `${product.name} - ${product.price}`,
      description: product.description,
      images: product.images,
      type: "website",
    },
  };
}

export default function ProductPage({
  params,
}: {
  params: { locale: string; shopSlug: string; productSlug: string };
}) {
  const shopData = shopProducts[params.shopSlug];

  if (!shopData) {
    return (
      <div className="pt-32 pb-20 text-center">
        <div className="container-custom">
          <h1 className="text-4xl font-serif font-bold text-softBlack-900 mb-4">
            Shop Not Found
          </h1>
          <Link href="/shops" className="btn-primary">
            Browse All Shops
          </Link>
        </div>
      </div>
    );
  }

  const { shop, products } = shopData;
  const product = products[params.productSlug];

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <div className="container-custom">
          <h1 className="text-4xl font-serif font-bold text-softBlack-900 mb-4">
            Product Not Found
          </h1>
          <Link href={`/shops/${shop.slug}`} className="btn-primary">
            Back to {shop.name}
          </Link>
        </div>
      </div>
    );
  }

  // Get other products from same shop
  const otherProducts = Object.values(products)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="pt-24 pb-20">
      {/* JSON-LD Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: product.images.map((img) => `https://auralumina.com${img}`),
            brand: {
              "@type": "Brand",
              name: shop.name,
            },
            offers: {
              "@type": "Offer",
              price: product.price.replace(/[^0-9]/g, ""),
              priceCurrency: "MAD",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "LocalBusiness",
                name: shop.name,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: shop.city,
                  addressCountry: "MA",
                },
              },
            },
          }),
        }}
      />

      {/* Breadcrumb */}
      <nav className="container-custom py-4">
        <ol className="flex items-center gap-2 text-sm text-softBlack-500">
          <li>
            <Link href="/shops" className="hover:text-gold-600">
              Shops
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href={`/shops/${shop.slug}`} className="hover:text-gold-600">
              {shop.name}
            </Link>
          </li>
          <li>/</li>
          <li className="text-softBlack-900 font-medium">{product.name}</li>
        </ol>
      </nav>

      {/* Product Section */}
      <section className="container-custom py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-beige-100">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden bg-beige-100 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={image}
                    alt={`${product.name} detail ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 33vw, 200px"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:py-8">
            {/* Shop Badge */}
            <Link
              href={`/shops/${shop.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-beige-100 rounded-full text-sm font-medium text-softBlack-700 hover:bg-beige-200 transition-colors mb-4"
            >
              <svg
                className="w-4 h-4 text-gold-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              {shop.name} • {shop.city}
            </Link>

            {/* Category */}
            <p className="text-gold-600 font-medium mb-2">{product.category}</p>

            {/* Title & Price */}
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-softBlack-900 mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-gold-600 mb-6">
              {product.price}
            </p>

            {/* Description */}
            <p className="text-softBlack-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Interactive Product Actions (Colors, Sizes, Quantity, Buy Now, WhatsApp, Call) */}
            <ProductActions
              product={{
                slug: product.slug,
                name: product.name,
                price: product.price,
                colors: product.colors,
                sizes: product.sizes,
                images: product.images,
              }}
              shop={{
                slug: shop.slug,
                phone: shop.phone,
                whatsapp: shop.whatsapp,
              }}
            />

            {/* Shop Info */}
            <div className="bg-beige-50 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-gold-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-softBlack-900">{shop.name}</p>
                  <p className="text-sm text-softBlack-500">
                    {shop.neighborhood}, {shop.city}
                  </p>
                </div>
              </div>
              <Link
                href={`/shops/${shop.slug}`}
                className="text-gold-600 text-sm font-medium hover:underline"
              >
                Visit shop profile →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="bg-beige-50 py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Details */}
            <div>
              <h3 className="text-lg font-semibold text-softBlack-900 mb-4">
                Details
              </h3>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-softBlack-600 text-sm"
                  >
                    <svg
                      className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Fabric */}
            <div>
              <h3 className="text-lg font-semibold text-softBlack-900 mb-4">
                Fabric
              </h3>
              <p className="text-softBlack-600 text-sm">{product.fabric}</p>
            </div>

            {/* Care */}
            <div>
              <h3 className="text-lg font-semibold text-softBlack-900 mb-4">
                Care Instructions
              </h3>
              <ul className="space-y-2">
                {product.care.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-softBlack-600 text-sm"
                  >
                    <span className="text-gold-500">•</span>
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* More from this Shop */}
      {otherProducts.length > 0 && (
        <section className="container-custom py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-semibold text-softBlack-900">
              More from {shop.name}
            </h2>
            <Link
              href={`/shops/${shop.slug}/products`}
              className="text-gold-600 font-medium hover:underline"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {otherProducts.map((otherProduct) => (
              <article key={otherProduct.slug} className="card group flex flex-col">
                <Link
                  href={`/shops/${shop.slug}/products/${otherProduct.slug}`}
                  className="block flex-1"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-beige-100">
                    <Image
                      src={otherProduct.images[0]}
                      alt={otherProduct.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 pb-2">
                    <p className="text-xs text-gold-600 font-medium mb-1">
                      {otherProduct.category}
                    </p>
                    <h3 className="font-medium text-softBlack-800 mb-1 group-hover:text-gold-600 transition-colors">
                      {otherProduct.name}
                    </h3>
                    <p className="text-gold-600 font-semibold">
                      {otherProduct.price}
                    </p>
                  </div>
                </Link>
                <div className="px-4 pb-4 pt-1">
                  <Link
                    href={`/contact?product=${encodeURIComponent(otherProduct.name)}&price=${encodeURIComponent(otherProduct.price)}&image=${encodeURIComponent(otherProduct.images[0])}&shopSlug=${encodeURIComponent(shop.slug)}&productSlug=${encodeURIComponent(otherProduct.slug)}&sizes=${encodeURIComponent(otherProduct.sizes.join(","))}`}
                    className="w-full py-2 bg-gold-600 text-white text-xs font-medium rounded-full hover:bg-gold-700 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Buy Now
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Trust Footer */}
      <section className="bg-softBlack-900 py-12">
        <div className="container-custom text-center">
          <p className="text-beige-300 mb-2">
            This product is sold by a verified Aura Lumina partner shop
          </p>
          <p className="text-beige-400 text-sm">
            Contact the shop directly for availability, sizing advice, and purchases
          </p>
        </div>
      </section>
    </div>
  );
}

