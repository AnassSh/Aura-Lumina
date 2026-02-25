import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { getAllShopSlugsAsync, getShopAsync, getShopProductListingsAsync } from "@/lib/data";

// Types
interface Product {
  slug: string;
  name: string;
  price: string;
  description: string;
  images: string[];
  category: string;
}

interface Shop {
  slug: string;
  name: string;
  tagline: string;
  city: string;
  neighborhood: string;
  image: string;
}

// Mock data - simplified for listing
const shopData: Record<
  string,
  {
    shop: Shop;
    products: Product[];
    categories: string[];
  }
> = {
  "dar-el-yasmine": {
    shop: {
      slug: "dar-el-yasmine",
      name: "Dar El Yasmine",
      tagline: "Where tradition meets modern elegance",
      city: "Casablanca",
      neighborhood: "Maarif",
      image: "/images/shop-hero-1.svg",
    },
    categories: ["All", "Embroidered Abayas", "Silk Abayas", "Classic Abayas"],
    products: [
      {
        slug: "jasmine-embroidered-abaya",
        name: "Jasmine Embroidered Abaya",
        price: "1,850 MAD",
        description: "Stunning handcrafted abaya with jasmine-inspired embroidery",
        images: ["/images/abaya-1.svg"],
        category: "Embroidered Abayas",
      },
      {
        slug: "pearl-silk-abaya",
        name: "Pearl Silk Abaya",
        price: "2,200 MAD",
        description: "Luxurious silk abaya with freshwater pearl details",
        images: ["/images/abaya-2.svg"],
        category: "Silk Abayas",
      },
      {
        slug: "classic-black-gold-trim",
        name: "Classic Black with Gold Trim",
        price: "1,650 MAD",
        description: "Timeless elegance with subtle gold trim detailing",
        images: ["/images/abaya-3.svg"],
        category: "Classic Abayas",
      },
    ],
  },
  "atelier-nour": {
    shop: {
      slug: "atelier-nour",
      name: "Atelier Nour",
      tagline: "Light up your modesty",
      city: "Rabat",
      neighborhood: "Agdal",
      image: "/images/shop-hero-2.svg",
    },
    categories: ["All", "Contemporary Abayas", "Linen Collection", "Evening Wear"],
    products: [
      {
        slug: "nour-collection-abaya",
        name: "Nour Collection Abaya",
        price: "1,450 MAD",
        description: "Signature minimalist design for the modern woman",
        images: ["/images/abaya-4.svg"],
        category: "Contemporary Abayas",
      },
      {
        slug: "minimalist-linen-abaya",
        name: "Minimalist Linen Abaya",
        price: "1,250 MAD",
        description: "Breathable linen perfect for warm Moroccan days",
        images: ["/images/abaya-5.svg"],
        category: "Linen Collection",
      },
      {
        slug: "evening-velvet-abaya",
        name: "Evening Velvet Abaya",
        price: "2,400 MAD",
        description: "Luxurious velvet for special occasions",
        images: ["/images/abaya-6.svg"],
        category: "Evening Wear",
      },
    ],
  },
};

// Generate static params (include Payload shop slugs so all shops are valid)
export async function generateStaticParams() {
  const slugs = await getAllShopSlugsAsync();
  return routing.locales.flatMap((locale) =>
    slugs.map((shopSlug) => ({ locale, shopSlug }))
  );
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; shopSlug: string }>;
}): Promise<Metadata> {
  const { shopSlug } = await params;
  let data = shopData[shopSlug];
  if (!data) {
    const shop = await getShopAsync(shopSlug);
    if (!shop) return { title: "Shop Not Found" };
    const listings = await getShopProductListingsAsync();
    const shopListings = listings.filter((l) => l.shopSlug === shopSlug);
    data = {
      shop: {
        slug: shop.slug,
        name: shop.name,
        tagline: shop.tagline,
        city: shop.location.city,
        neighborhood: shop.location.neighborhood,
        image: shop.image,
      },
      products: shopListings.map((l) => ({
        slug: l.productSlug,
        name: l.name,
        price: l.price,
        description: "",
        images: [l.image],
        category: "Abayas",
      })),
      categories: ["All", "Abayas"],
    };
  }

  const { shop } = data;

  return {
    title: `Products | ${shop.name} - Abayas & Modest Fashion in ${shop.city}`,
    description: `Browse the collection at ${shop.name} in ${shop.neighborhood}, ${shop.city}. ${shop.tagline}. Handcrafted abayas and modest fashion pieces.`,
    openGraph: {
      title: `${shop.name} Products`,
      description: `Discover beautiful abayas and modest fashion at ${shop.name}`,
      images: [shop.image],
    },
  };
}

export default async function ShopProductsPage({
  params,
}: {
  params: Promise<{ locale: string; shopSlug: string }>;
}) {
  const { shopSlug } = await params;
  const t = await getTranslations("product");
  let data = shopData[shopSlug];

  if (!data) {
    const shop = await getShopAsync(shopSlug);
    if (!shop) {
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
    const listings = await getShopProductListingsAsync();
    const shopListings = listings.filter((l) => l.shopSlug === shopSlug);
    data = {
      shop: {
        slug: shop.slug,
        name: shop.name,
        tagline: shop.tagline,
        city: shop.location.city,
        neighborhood: shop.location.neighborhood,
        image: shop.image,
      },
      products: shopListings.map((l) => ({
        slug: l.productSlug,
        name: l.name,
        price: l.price,
        description: "",
        images: [l.image],
        category: "Abayas",
      })),
      categories: ["All", "Abayas"],
    };
  }

  const { shop, products, categories } = data;

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px]">
        <Image
          src={shop.image}
          alt={shop.name}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-softBlack-900/80 via-softBlack-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container-custom pb-8">
            <Link
              href={`/shops/${shop.slug}`}
              className="inline-flex items-center gap-2 text-beige-300 hover:text-white mb-4 text-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to {shop.name}
            </Link>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
              {shop.name} Collection
            </h1>
            <p className="text-beige-200">
              {shop.neighborhood}, {shop.city} • {products.length} products
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-beige-200 sticky top-20 z-30">
        <div className="container-custom py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All"
                    ? "bg-softBlack-900 text-beige-50"
                    : "bg-beige-100 text-softBlack-700 hover:bg-beige-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container-custom py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <article key={product.slug} className="card h-full flex flex-col group">
              <Link
                href={`/shops/${shop.slug}/products/${product.slug}`}
                className="block flex-1"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-beige-100">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-softBlack-800 rounded-full">
                    {product.category}
                  </span>
                </div>
                <div className="p-5 pb-2">
                  <h2 className="text-lg font-medium text-softBlack-800 mb-2 group-hover:text-gold-600 transition-colors">
                    {product.name}
                  </h2>
                  <p className="text-softBlack-500 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-gold-600 font-semibold">{product.price}</p>
                </div>
              </Link>
              <div className="px-5 pb-5 pt-2">
                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}&image=${encodeURIComponent(product.images[0])}&shopSlug=${encodeURIComponent(shop.slug)}&productSlug=${encodeURIComponent(product.slug)}`}
                  className="w-full py-2.5 bg-gold-600 text-white text-sm font-medium rounded-full hover:bg-gold-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {t("buyNow")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-beige-50 py-12">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
            Looking for something specific?
          </h2>
          <p className="text-softBlack-500 mb-6 max-w-xl mx-auto">
            Contact {shop.name} directly for custom orders, sizing questions, or
            to see their full in-store collection.
          </p>
          <Link href={`/shops/${shop.slug}`} className="btn-primary">
            Contact {shop.name}
          </Link>
        </div>
      </section>
    </div>
  );
}

