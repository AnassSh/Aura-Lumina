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

// Generate static params (Payload shop slugs)
export async function generateStaticParams() {
  const slugs = await getAllShopSlugsAsync();
  return routing.locales.flatMap((locale) =>
    slugs.map((shopSlug) => ({ locale, shopSlug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; shopSlug: string }>;
}): Promise<Metadata> {
  const { shopSlug } = await params;
  const shop = await getShopAsync(shopSlug);
  if (!shop) return { title: "Shop Not Found" };

  return {
    title: `Products | ${shop.name} - Abayas & Modest Fashion in ${shop.location.city}`,
    description: `Browse the collection at ${shop.name} in ${shop.location.neighborhood}, ${shop.location.city}. ${shop.tagline}. Handcrafted abayas and modest fashion pieces.`,
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
  const shopDisplay: Shop = {
    slug: shop.slug,
    name: shop.name,
    tagline: shop.tagline,
    city: shop.location.city,
    neighborhood: shop.location.neighborhood,
    image: shop.image,
  };
  const products: Product[] = shopListings.map((l) => ({
    slug: l.productSlug,
    name: l.name,
    price: l.price,
    description: "",
    images: [l.image],
    category: "Abayas",
  }));
  const categories = ["All", "Abayas"];

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px]">
        <Image
          src={shopDisplay.image}
          alt={shopDisplay.name}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-softBlack-900/80 via-softBlack-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container-custom pb-8">
            <Link
              href={`/shops/${shopDisplay.slug}`}
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
              Back to {shopDisplay.name}
            </Link>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
              {shopDisplay.name} Collection
            </h1>
            <p className="text-beige-200">
              {shopDisplay.neighborhood}, {shopDisplay.city} • {products.length} products
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
                href={`/shops/${shopDisplay.slug}/products/${product.slug}`}
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
                  href={`/contact?product=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}&image=${encodeURIComponent(product.images[0])}&shopSlug=${encodeURIComponent(shopDisplay.slug)}&productSlug=${encodeURIComponent(product.slug)}`}
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
            Contact {shopDisplay.name} directly for custom orders, sizing questions, or
            to see their full in-store collection.
          </p>
          <Link href={`/shops/${shopDisplay.slug}`} className="btn-primary">
            Contact {shopDisplay.name}
          </Link>
        </div>
      </section>
    </div>
  );
}

