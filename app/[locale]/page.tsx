import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import SectionHeader from "@/components/ui/SectionHeader";
import { ProductCard } from "@/components/ui/Card";

// Import from centralized data layer
import {
  getFeaturedAbayas,
  getShopProductListings,
  getBeautyTips,
  getLatestPosts,
  getShopTheLook,
  getEditorsPicks
} from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

// Get data from centralized data layer
const featuredAbayas = getFeaturedAbayas();
const beautyTips = getBeautyTips();
const editorsPicks = getEditorsPicks().slice(0, 4);
const latestPosts = getLatestPosts();
const shopProducts = getShopProductListings();
const shopTheLook = getShopTheLook();

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Aura Lumina",
            url: "https://auralumina.com",
            logo: "https://auralumina.com/images/og-image.svg",
            sameAs: ["https://instagram.com/auralumina", "https://tiktok.com/@auralumina"],
            description: "Elegant abayas, modest fashion inspiration, beauty tips, and curated looks.",
          }),
        }}
      />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-beige-100 via-beige-50 to-rose-50" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a84b' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container-custom relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left slide-up">
              <span className="inline-block px-4 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-6">{t("badge")}</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-softBlack-900 mb-6 leading-tight">
                {t("heroTitle1")}
                <span className="block gradient-text">{t("heroTitle2")}</span>
              </h1>
              <p className="text-lg md:text-xl text-softBlack-600 mb-8 max-w-xl mx-auto lg:mx-0">{t("heroDesc")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/lookbooks" className="btn-primary">{t("exploreCollection")}</Link>
                <Link href="/blog" className="btn-secondary">{t("readBlog")}</Link>
              </div>
            </div>
            <div className="relative fade-in">
              <div className="relative aspect-[3/4] max-w-lg mx-auto">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold-200 rounded-full opacity-60 blur-2xl" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-rose-200 rounded-full opacity-60 blur-2xl" />
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="https://images.unsplash.com/photo-1602371021206-89305975f322?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt={t("heroAlt")}
                    fill
                    sizes="(max-width: 768px) 100vw, 512px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -right-4 bottom-12 bg-white p-4 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-softBlack-900">{t("premiumQuality")}</p>
                      <p className="text-xs text-softBlack-500">{t("handcrafted")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-softBlack-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <section id="featured-abayas" className="py-20 bg-white">
        <div className="container-custom">
          <SectionHeader title={t("featuredAbayasTitle")} subtitle={t("featuredAbayasSubtitle")} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAbayas.map((abaya) => (
              <ProductCard
                key={abaya.id}
                title={t(abaya.titleKey)}
                price={abaya.price}
                image={abaya.image}
                href={abaya.href || "/lookbooks"}
                badge={abaya.badge ? t(abaya.badge) : undefined}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/lookbooks" className="btn-secondary">{t("viewAllAbayas")}</Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-beige-50">
        <div className="container-custom">
          <SectionHeader title={t("partnerShopsTitle")} subtitle={t("partnerShopsSubtitle")} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {shopProducts.map((product) => (
              <Link key={product.id} href={`/shops/${product.shopSlug}/products/${product.productSlug}`} className="group block">
                <article className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-softBlack-800 flex items-center gap-1.5">
                      <svg className="w-3 h-3 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {product.city}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gold-600 font-medium">{product.shopName} · {product.city}</p>
                    <h3 className="text-lg font-serif font-semibold text-softBlack-900 mt-1 mb-2 group-hover:text-gold-600 transition-colors">{product.name}</h3>
                    <p className="text-lg font-semibold text-softBlack-700">{product.price}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/shops" className="btn-primary">{t("exploreAllShops")}</Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-beige-50 to-rose-50">
        <div className="container-custom">
          <SectionHeader title={t("editorsPicksTitle")} subtitle={t("editorsPicksSubtitle")} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {editorsPicks.map((product) => (
              <article key={product.id} className="group text-center">
                <div className="relative aspect-square bg-beige-50 rounded-2xl overflow-hidden shadow-lg mb-4 group-hover:shadow-xl transition-shadow">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-softBlack-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Link
                    href={`/contact?product=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}&image=${encodeURIComponent(product.image)}`}
                    className="absolute bottom-4 left-4 right-4 py-2 bg-white text-softBlack-900 font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-softBlack-900 hover:text-white text-center block"
                  >
                    {t("buyNow")}
                  </Link>
                </div>
                <p className="text-sm text-rose-500 font-medium mb-1">{product.brand}</p>
                <h3 className="text-lg font-medium text-softBlack-900 mb-1 group-hover:text-rose-500 transition-colors">{product.name}</h3>
                <p className="text-gold-600 font-semibold">{product.price}</p>
              </article>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/beauty#editors-picks" className="btn-gold">{t("shopEditorsPicks")}</Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-softBlack-900 text-beige-50">
        <div className="container-custom">
          <SectionHeader title={t("completeLookTitle")} subtitle={t("completeLookSubtitle")} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {shopTheLook.map((look) => (
              <article key={look.id} className="group relative bg-softBlack-800 rounded-3xl overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-square md:aspect-auto">
                    <Image
                    src={look.image}
                    alt={t(look.titleKey)}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-serif font-semibold mb-4">{t(look.titleKey)}</h3>
                    <ul className="space-y-2 mb-6">
                      {look.itemKeys.map((key) => (
                        <li key={key} className="flex items-center gap-2 text-beige-300">
                          <svg className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {t(key)}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gold-400">{look.totalPrice}</span>
                      <Link href="/shops" className="px-6 py-3 bg-gold-500 text-softBlack-900 font-medium rounded-full hover:bg-gold-400 transition-colors">{t("findShop")}</Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <SectionHeader title={t("latestBlogTitle")} subtitle={t("latestBlogSubtitle")} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <article className="card h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                    src={post.image}
                    alt={t(post.titleKey)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  </div>
                  <div className="p-6">
                    <time className="text-sm text-gold-600 font-medium">{post.date}</time>
                    <h3 className="text-xl font-serif font-semibold text-softBlack-900 mt-2 mb-3 group-hover:text-gold-600 transition-colors">{t(post.titleKey)}</h3>
                    <p className="text-softBlack-500 line-clamp-2">{t(post.excerptKey)}</p>
                    <span className="inline-flex items-center gap-2 mt-4 text-softBlack-900 font-medium group-hover:text-gold-600 transition-colors">
                      {t("readMore")}
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/blog" className="btn-secondary">{t("viewAllPosts")}</Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-gold-100 via-beige-100 to-rose-100">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-softBlack-900 mb-6">{t("stayInspired")}</h2>
          <p className="text-lg text-softBlack-600 max-w-2xl mx-auto mb-8">{t("newsletterDesc")}</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <label htmlFor="homepage-newsletter-email" className="sr-only">{t("emailAria")}</label>
            <input id="homepage-newsletter-email" name="email" type="email" autoComplete="email" placeholder={t("emailPlaceholder")} className="flex-1 px-6 py-4 rounded-full border border-beige-300 focus:outline-none focus:border-gold-500 bg-white" />
            <button type="submit" className="btn-primary">{t("subscribe")}</button>
          </form>
        </div>
      </section>
    </>
  );
}
