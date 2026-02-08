import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: t("termsTitle"),
    description: t("termsDescription"),
  };
}

export default async function TermsOfServicePage() {
  const t = await getTranslations("legal");

  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-b from-beige-100 to-white py-12">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-softBlack-900 mb-4">
              {t("termsTitle")}
            </h1>
            <p className="text-softBlack-500">
              {t("termsUpdated")}
            </p>
          </div>
        </div>
      </section>

      <section className="container-custom py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("acceptanceOfTerms")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("acceptanceOfTermsDesc")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("descriptionOfService")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("descriptionOfServiceDesc")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("userConduct")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed mb-4">
                {t("userConductDesc")}
              </p>
              <ul className="list-disc list-inside text-softBlack-600 space-y-2">
                <li>{t("conductList1")}</li>
                <li>{t("conductList2")}</li>
                <li>{t("conductList3")}</li>
                <li>{t("conductList4")}</li>
                <li>{t("conductList5")}</li>
                <li>{t("conductList6")}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("intellectualProperty")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed mb-4">
                {t("intellectualPropertyDesc1")}
              </p>
              <p className="text-softBlack-600 leading-relaxed">
                {t("intellectualPropertyDesc2")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("partnerShops")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed mb-4">
                {t("partnerShopsDesc1")}
              </p>
              <ul className="list-disc list-inside text-softBlack-600 space-y-2 mb-4">
                <li>{t("partnerList1")}</li>
                <li>{t("partnerList2")}</li>
                <li>{t("partnerList3")}</li>
                <li>{t("partnerList4")}</li>
              </ul>
              <p className="text-softBlack-600 leading-relaxed">
                {t("partnerShopsDesc2")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("contentAccuracy")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("contentAccuracyDesc")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("thirdPartyLinksTerms")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("thirdPartyLinksTermsDesc")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("newsletterComms")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("newsletterCommsDesc")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("disclaimerWarranties")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("disclaimerWarrantiesDesc")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("limitationLiability")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("limitationLiabilityDesc")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("indemnification")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("indemnificationDesc")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("governingLaw")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("governingLawDesc")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("severability")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("severabilityDesc")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("contactInfo")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("contactInfoDesc")}
              </p>
              <div className="mt-4 p-4 bg-beige-50 rounded-xl">
                <p className="text-softBlack-700 font-medium">Aura Lumina</p>
                <p className="text-softBlack-600">{t("email")}: legal@auralumina.com</p>
                <p className="text-softBlack-600">{t("location")}: {t("casablancaMorocco")}</p>
              </div>
            </div>

            <div className="pt-8 border-t border-beige-200">
              <p className="text-softBlack-500 text-sm">
                {t("relatedPolicies")}:
              </p>
              <div className="flex gap-4 mt-2">
                <Link href="/privacy" className="text-gold-600 hover:underline text-sm">
                  {t("viewPrivacyPolicy")}
                </Link>
                <Link href="/cookies" className="text-gold-600 hover:underline text-sm">
                  {t("cookiesTitle")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
