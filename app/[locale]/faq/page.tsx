import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const faqSections: {
  categoryKey: "categoryAbout" | "categoryShopping" | "categoryProducts" | "categoryBeauty" | "categoryBoutique";
  items: { qKey: string; aKey: string }[];
}[] = [
  {
    categoryKey: "categoryAbout",
    items: [
      { qKey: "aboutQ1", aKey: "aboutA1" },
      { qKey: "aboutQ2", aKey: "aboutA2" },
      { qKey: "aboutQ3", aKey: "aboutA3" },
    ],
  },
  {
    categoryKey: "categoryShopping",
    items: [
      { qKey: "shopQ1", aKey: "shopA1" },
      { qKey: "shopQ2", aKey: "shopA2" },
      { qKey: "shopQ3", aKey: "shopA3" },
      { qKey: "shopQ4", aKey: "shopA4" },
    ],
  },
  {
    categoryKey: "categoryProducts",
    items: [
      { qKey: "prodQ1", aKey: "prodA1" },
      { qKey: "prodQ2", aKey: "prodA2" },
      { qKey: "prodQ3", aKey: "prodA3" },
    ],
  },
  {
    categoryKey: "categoryBeauty",
    items: [
      { qKey: "beautyQ1", aKey: "beautyA1" },
      { qKey: "beautyQ2", aKey: "beautyA2" },
      { qKey: "beautyQ3", aKey: "beautyA3" },
    ],
  },
  {
    categoryKey: "categoryBoutique",
    items: [
      { qKey: "boutiqueQ1", aKey: "boutiqueA1" },
      { qKey: "boutiqueQ2", aKey: "boutiqueA2" },
      { qKey: "boutiqueQ3", aKey: "boutiqueA3" },
    ],
  },
];

export default async function FAQPage() {
  const t = await getTranslations("faq");

  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-b from-beige-100 to-white py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-softBlack-900 mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-softBlack-500">{t("subtitle")}</p>
          </div>
        </div>
      </section>

      <section className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {faqSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-12">
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-6 pb-2 border-b border-beige-200">
                {t(section.categoryKey)}
              </h2>
              <div className="space-y-6">
                {section.items.map((faq, index) => (
                  <details
                    key={index}
                    className="group bg-white rounded-2xl shadow-md overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <h3 className="text-lg font-medium text-softBlack-800 pr-4">
                        {t(faq.qKey)}
                      </h3>
                      <span className="flex-shrink-0 w-8 h-8 bg-beige-100 rounded-full flex items-center justify-center group-open:bg-gold-100 transition-colors">
                        <svg
                          className="w-4 h-4 text-softBlack-600 group-open:rotate-180 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-softBlack-600 leading-relaxed">
                        {t(faq.aKey)}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-beige-50 py-16">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-serif font-bold text-softBlack-900 mb-4">
            {t("stillQuestion")}
          </h2>
          <p className="text-softBlack-600 mb-8 max-w-xl mx-auto">
            {t("stillDesc")}
          </p>
          <Link href="/contact" className="btn-primary">
            {t("contactUs")}
          </Link>
        </div>
      </section>
    </div>
  );
}
