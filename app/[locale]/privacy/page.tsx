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
    title: t("privacyTitle"),
    description: t("privacyDescription"),
  };
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("legal");

  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-b from-beige-100 to-white py-12">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-softBlack-900 mb-4">
              {t("privacyTitle")}
            </h1>
            <p className="text-softBlack-500">
              {t("privacyUpdated")}
            </p>
          </div>
        </div>
      </section>

      <section className="container-custom py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("introduction")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("privacyIntro1")}
              </p>
              <p className="text-softBlack-600 leading-relaxed mt-4">
                {t("privacyIntro2")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("infoWeCollect")}
              </h2>
              
              <h3 className="text-xl font-semibold text-softBlack-800 mb-3">
                {t("personalInfo")}
              </h3>
              <p className="text-softBlack-600 leading-relaxed mb-4">
                {t("personalInfoDesc")}
              </p>
              <ul className="list-disc list-inside text-softBlack-600 space-y-2 mb-6">
                <li>{t("personalInfoList1")}</li>
                <li>{t("personalInfoList2")}</li>
                <li>{t("personalInfoList3")}</li>
                <li>{t("personalInfoList4")}</li>
              </ul>
              <p className="text-softBlack-600 leading-relaxed mb-4">
                {t("infoMayInclude")}
              </p>
              <ul className="list-disc list-inside text-softBlack-600 space-y-2">
                <li>{t("infoList1")}</li>
                <li>{t("infoList2")}</li>
                <li>{t("infoList3")}</li>
                <li>{t("infoList4")}</li>
                <li>{t("infoList5")}</li>
              </ul>

              <h3 className="text-xl font-semibold text-softBlack-800 mb-3 mt-6">
                {t("autoCollectedInfo")}
              </h3>
              <p className="text-softBlack-600 leading-relaxed mb-4">
                {t("autoCollectedDesc")}
              </p>
              <ul className="list-disc list-inside text-softBlack-600 space-y-2">
                <li>{t("autoList1")}</li>
                <li>{t("autoList2")}</li>
                <li>{t("autoList3")}</li>
                <li>{t("autoList4")}</li>
                <li>{t("autoList5")}</li>
                <li>{t("autoList6")}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("howWeUse")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed mb-4">
                {t("howWeUseDesc")}
              </p>
              <ul className="list-disc list-inside text-softBlack-600 space-y-2">
                <li>{t("useList1")}</li>
                <li>{t("useList2")}</li>
                <li>{t("useList3")}</li>
                <li>{t("useList4")}</li>
                <li>{t("useList5")}</li>
                <li>{t("useList6")}</li>
                <li>{t("useList7")}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("infoSharing")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed mb-4">
                {t("infoSharingDesc")}
              </p>
              <ul className="list-disc list-inside text-softBlack-600 space-y-2">
                <li><strong>{t("shareList1")}</strong> {t("shareList1Desc")}</li>
                <li><strong>{t("shareList2")}</strong> {t("shareList2Desc")}</li>
                <li><strong>{t("shareList3")}</strong> {t("shareList3Desc")}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("dataSecurity")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("dataSecurityDesc")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("yourRights")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed mb-4">
                {t("yourRightsDesc")}
              </p>
              <ul className="list-disc list-inside text-softBlack-600 space-y-2">
                <li><strong>{t("rightAccess")}</strong> {t("rightAccessDesc")}</li>
                <li><strong>{t("rightCorrection")}</strong> {t("rightCorrectionDesc")}</li>
                <li><strong>{t("rightDeletion")}</strong> {t("rightDeletionDesc")}</li>
                <li><strong>{t("rightOptOut")}</strong> {t("rightOptOutDesc")}</li>
                <li><strong>{t("rightPortability")}</strong> {t("rightPortabilityDesc")}</li>
              </ul>
              <p className="text-softBlack-600 leading-relaxed mt-4">
                {t("exerciseRights")}{" "}
                <a href="mailto:privacy@auralumina.com" className="text-gold-600 hover:underline">
                  privacy@auralumina.com
                </a>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("cookiesSection")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("cookiesSectionDesc")}{" "}
                <Link href="/cookies" className="text-gold-600 hover:underline">
                  {t("cookiesTitle")}
                </Link>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("thirdPartyLinks")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("thirdPartyLinksDesc")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("childrensPrivacy")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("childrensPrivacyDesc")}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-4">
                {t("changesToPolicy")}
              </h2>
              <p className="text-softBlack-600 leading-relaxed">
                {t("changesToPolicyDesc")}
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
          </div>
        </div>
      </section>
    </div>
  );
}
