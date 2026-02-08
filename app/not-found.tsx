import Link from "next/link";
import { headers } from "next/headers";

// Translations for not-found page
const translations = {
  en: {
    title: "Page Not Found",
    description: "We couldn't find the page you're looking for. It may have been moved or no longer exists.",
    returnHome: "Return Home",
    browseShops: "Browse Shops",
    lookingFor: "You might be looking for:",
    abayaCollections: "Abaya Collections",
    beautyTips: "Beauty Tips",
    ourBlog: "Our Blog",
    localShops: "Local Shops",
  },
  ar: {
    title: "الصفحة غير موجودة",
    description: "لم نتمكن من العثور على الصفحة التي تبحثين عنها. ربما تم نقلها أو لم تعد موجودة.",
    returnHome: "العودة للرئيسية",
    browseShops: "تصفح المتاجر",
    lookingFor: "ربما تبحثين عن:",
    abayaCollections: "مجموعات العبايات",
    beautyTips: "نصائح الجمال",
    ourBlog: "مدونتنا",
    localShops: "المتاجر المحلية",
  },
  fr: {
    title: "Page introuvable",
    description: "Nous n'avons pas trouvé la page que vous recherchez. Elle a peut-être été déplacée ou n'existe plus.",
    returnHome: "Retour à l'accueil",
    browseShops: "Parcourir les boutiques",
    lookingFor: "Vous cherchez peut-être :",
    abayaCollections: "Collections d'Abayas",
    beautyTips: "Conseils Beauté",
    ourBlog: "Notre Blog",
    localShops: "Boutiques Locales",
  },
};

type Locale = keyof typeof translations;

function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  if (firstSegment === "ar" || firstSegment === "fr" || firstSegment === "en") {
    return firstSegment as Locale;
  }
  return "en";
}

export default async function NotFound() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || headersList.get("x-invoke-path") || "/en";
  const locale = getLocaleFromPath(pathname);
  const t = translations[locale];
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <body className="min-h-screen flex flex-col bg-[#F9F7F4] text-[#1F1F1F]">
        <div className="min-h-[70vh] flex items-center justify-center flex-grow">
          <div className="container mx-auto px-4 text-center py-20">
            {/* Decorative element */}
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-amber-100 to-rose-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-amber-500"
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

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              {t.title}
            </h1>

            <p className="text-lg text-gray-500 max-w-md mx-auto mb-8">
              {t.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}`}
                className="px-8 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-amber-500 transition-colors"
              >
                {t.returnHome}
              </Link>
              <Link
                href={`/${locale}/shops`}
                className="px-8 py-3 border-2 border-gray-900 text-gray-900 font-medium rounded-full hover:bg-gray-900 hover:text-white transition-colors"
              >
                {t.browseShops}
              </Link>
            </div>

            {/* Helpful links */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-400 mb-4">
                {t.lookingFor}
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <Link
                  href={`/${locale}/lookbooks`}
                  className="text-amber-600 hover:underline"
                >
                  {t.abayaCollections}
                </Link>
                <Link
                  href={`/${locale}/beauty`}
                  className="text-amber-600 hover:underline"
                >
                  {t.beautyTips}
                </Link>
                <Link
                  href={`/${locale}/blog`}
                  className="text-amber-600 hover:underline"
                >
                  {t.ourBlog}
                </Link>
                <Link
                  href={`/${locale}/shops`}
                  className="text-amber-600 hover:underline"
                >
                  {t.localShops}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
