import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import SectionHeader from "@/components/ui/SectionHeader";

// Import from centralized data layer
import {
  getEditorsPicks,
  quickTips,
} from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "beauty" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

// Get data from centralized data layer
const quickTipKeys = quickTips;
const featuredProducts = getEditorsPicks();

export default async function BeautyPage() {
  const t = await getTranslations("beauty");

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-rose-50 via-beige-50 to-gold-50 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-rose-200 rounded-full opacity-40 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gold-200 rounded-full opacity-40 blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-medium mb-6">
              {t("badge")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-softBlack-900 mb-6">
              {t("heroTitle1")}
              <span className="block text-rose-500">{t("heroTitle2")}</span>
            </h1>
            <p className="text-lg text-softBlack-600 mb-8">
              {t("heroDesc")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#editors-picks" className="btn-primary">
                {t("shopProducts")}
              </Link>
              <Link href="/blog" className="btn-secondary">
                {t("allBeautyArticles")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Editor's Picks - First */}
      <section id="editors-picks" className="py-16 bg-white">
        <div className="container-custom">
          <SectionHeader
            title={t("editorsPicks")}
            subtitle={t("editorsPicksSubtitle")}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
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
                <p className="text-sm text-rose-500 font-medium mb-1">
                  {product.brand}
                </p>
                <h3 className="text-lg font-medium text-softBlack-900 mb-1 group-hover:text-rose-500 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gold-600 font-semibold">{product.price}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Beauty Tips - Second */}
      <section className="container-custom py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickTipKeys.map((tip, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-beige-100"
            >
              <span className="text-4xl mb-4 block">{tip.icon}</span>
              <h3 className="text-lg font-semibold text-softBlack-900 mb-2">
                {t(tip.titleKey)}
              </h3>
              <p className="text-softBlack-500 text-sm">{t(tip.textKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-b from-white to-beige-50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-br from-rose-100 to-gold-100 rounded-3xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-softBlack-900 mb-4">
                {t("beautyNewsletter")}
              </h2>
              <p className="text-softBlack-600 mb-6">
                {t("newsletterDesc")}
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <label htmlFor="beauty-newsletter-email" className="sr-only">
                  {t("emailAria")}
                </label>
                <input
                  id="beauty-newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t("emailPlaceholder")}
                  className="flex-1 px-5 py-3 rounded-full border border-beige-200 text-sm focus:outline-none focus:border-rose-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-rose-500 text-white font-medium rounded-full hover:bg-rose-600 transition-colors"
                >
                  {t("subscribe")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Video Tutorial Banner */}
      <section className="container-custom py-12">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="relative aspect-[21/9] bg-softBlack-900">
            <Image
              src="/images/video-banner.svg"
              alt={t("watchTutorial")}
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              loading="lazy"
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <button
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 mx-auto shadow-2xl hover:scale-110 transition-transform"
                  type="button"
                >
                  <svg
                    className="w-8 h-8 text-rose-500 ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                  {t("watchTutorial")}
                </h3>
                <p className="text-beige-200">{t("tutorialDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
