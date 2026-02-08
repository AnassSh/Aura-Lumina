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
    title: t("cookiesTitle"),
    description: t("cookiesDescription"),
  };
}

export default async function CookiePolicyPage() {
  const t = await getTranslations("legal");

  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-b from-beige-100 to-white py-12">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-softBlack-900 mb-4">
              {t("cookiesTitle")}
            </h1>
            <p className="text-softBlack-500">
              {t("cookiesUpdated")}
            </p>
          </div>
        </div>
      </section>

      <section className="container-custom py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("whatAreCookies")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("whatAreCookiesDesc")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("howWeUseCookies")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed mb-6">
                {t("howWeUseCookiesDesc")}
              </p>

              <div className="space-y-6">
                <div className="p-4 bg-beige-50 rounded-xl">
                  <h3 className="text-lg font-semibold text-softBlack-800 mb-2">
                    {t("essentialCookies")}
                  </h3>
                  <p className="text-softBlack-600">
                    {t("essentialCookiesDesc")}
                  </p>
                </div>

                <div className="p-4 bg-beige-50 rounded-xl">
                  <h3 className="text-lg font-semibold text-softBlack-800 mb-2">
                    {t("analyticsCookies")}
                  </h3>
                  <p className="text-softBlack-600">
                    {t("analyticsCookiesDesc")}
                  </p>
                </div>

                <div className="p-4 bg-beige-50 rounded-xl">
                  <h3 className="text-lg font-semibold text-softBlack-800 mb-2">
                    {t("functionalityCookies")}
                  </h3>
                  <p className="text-softBlack-600">
                    {t("functionalityCookiesDesc")}
                  </p>
                </div>

                <div className="p-4 bg-beige-50 rounded-xl">
                  <h3 className="text-lg font-semibold text-softBlack-800 mb-2">
                    {t("marketingCookies")}
                  </h3>
                  <p className="text-softBlack-600">
                    {t("marketingCookiesDesc")}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("cookieTypes")}
              </h2>
              <ul className="list-disc list-inside text-softBlack-600 space-y-3">
                <li><strong>{t("sessionCookies")}</strong> {t("sessionCookiesDesc")}</li>
                <li><strong>{t("persistentCookies")}</strong> {t("persistentCookiesDesc")}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("thirdPartyCookies")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed mb-4">
                {t("thirdPartyCookiesDesc")}
              </p>
              <ul className="list-disc list-inside text-softBlack-600 space-y-2">
                <li>{t("thirdPartyList1")}</li>
                <li>{t("thirdPartyList2")}</li>
                <li>{t("thirdPartyList3")}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("managingCookies")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed mb-4">
                {t("managingCookiesDesc")}
              </p>
              <ul className="list-disc list-inside text-softBlack-600 space-y-3">
                <li><strong>{t("manageList1")}</strong> {t("manageList1Desc")}</li>
                <li><strong>{t("manageList2")}</strong> {t("manageList2Desc")}</li>
                <li><strong>{t("manageList3")}</strong> {t("manageList3Desc")}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("impactDisabling")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("impactDisablingDesc")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("doNotTrack")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("doNotTrackDesc")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("updatesToPolicy")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("updatesToPolicyDesc")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("contactUs")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("contactUsDesc")}
              </p>
              <div className="mt-4 p-4 bg-beige-50 rounded-xl">
                <p className="text-softBlack-700 font-medium">Aura Lumina</p>
                <p className="text-softBlack-600">{t("email")}: privacy@auralumina.com</p>
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
                <Link href="/terms" className="text-gold-600 hover:underline text-sm">
                  {t("viewTermsOfService")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
