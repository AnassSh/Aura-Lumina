import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const valueKeys = [
  { icon: "✨", titleKey: "valueAuthTitle" as const, descKey: "valueAuthDesc" as const },
  { icon: "🤝", titleKey: "valueCommTitle" as const, descKey: "valueCommDesc" as const },
  { icon: "💎", titleKey: "valueQualTitle" as const, descKey: "valueQualDesc" as const },
  { icon: "🌸", titleKey: "valueModTitle" as const, descKey: "valueModDesc" as const },
];

const stats = [
  { number: "2+", labelKey: "statBoutiques" as const },
  { number: "50+", labelKey: "statProducts" as const },
  { number: "10+", labelKey: "statGuides" as const },
  { number: "2", labelKey: "statCities" as const },
];

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <div className="pt-24 pb-20">
      <section className="relative py-20 bg-gradient-to-br from-beige-100 via-rose-50 to-gold-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-200 rounded-full opacity-30 blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-200 rounded-full opacity-30 blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-6">{t("badge")}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-softBlack-900 mb-6">
              {t("title1")}
              <span className="block text-gold-600">{t("title2")}</span>
            </h1>
            <p className="text-lg text-softBlack-600">{t("intro")}</p>
          </div>
        </div>
      </section>

      <section className="container-custom py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-softBlack-900 mb-6">{t("whyTitle")}</h2>
            <div className="space-y-4 text-softBlack-600 leading-relaxed">
              <p>{t("whyPara1")}</p>
              <p>{t("whyPara2")}</p>
              <p>{t("whyPara3")}</p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/images/lookbook-1.svg" alt="Aura Lumina - Modest Fashion" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gold-100 rounded-3xl -z-10" />
          </div>
        </div>
      </section>

      <section className="bg-softBlack-900 text-beige-50 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">{t("missionTitle")}</h2>
            <p className="text-xl text-beige-200 leading-relaxed">{t("missionText")}</p>
          </div>
        </div>
      </section>

      <section className="container-custom py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-softBlack-900 mb-4">{t("valuesTitle")}</h2>
          <p className="text-softBlack-500 max-w-2xl mx-auto">{t("valuesSubtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueKeys.map((value, index) => (
            <div key={index} className="text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
              <span className="text-5xl mb-4 block">{value.icon}</span>
              <h3 className="text-xl font-semibold text-softBlack-900 mb-3">{t(value.titleKey)}</h3>
              <p className="text-softBlack-500 text-sm">{t(value.descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-beige-50 py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-serif font-bold text-gold-600 mb-2">{stat.number}</p>
                <p className="text-softBlack-600 font-medium">{t(stat.labelKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-custom py-20">
        <div className="bg-gradient-to-r from-gold-100 via-beige-100 to-rose-100 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-serif font-bold text-softBlack-900 mb-4">{t("joinTitle")}</h2>
          <p className="text-softBlack-600 max-w-2xl mx-auto mb-8">{t("joinDesc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shops" className="btn-primary">{t("exploreShops")}</Link>
            <Link href="/contact" className="btn-secondary">{t("getInTouch")}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
