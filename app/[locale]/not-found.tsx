import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="container-custom text-center py-20">
        {/* Decorative element */}
        <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-gold-100 to-rose-100 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gold-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif font-bold text-softBlack-900 mb-4">
          {t("title")}
        </h1>

        <p className="text-lg text-softBlack-500 max-w-md mx-auto mb-8">
          {t("description")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            {t("returnHome")}
          </Link>
          <Link href="/shops" className="btn-secondary">
            {t("browseShops")}
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-16 pt-8 border-t border-beige-200">
          <p className="text-sm text-softBlack-400 mb-4">
            {t("lookingFor")}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/lookbooks"
              className="text-gold-600 hover:underline"
            >
              {t("abayaCollections")}
            </Link>
            <Link
              href="/beauty"
              className="text-gold-600 hover:underline"
            >
              {t("beautyTips")}
            </Link>
            <Link
              href="/blog"
              className="text-gold-600 hover:underline"
            >
              {t("ourBlog")}
            </Link>
            <Link
              href="/shops"
              className="text-gold-600 hover:underline"
            >
              {t("localShops")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
