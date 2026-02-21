import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

const SIZE_GUIDE_PDF = "/Size Guide.pdf";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const t = await getTranslations({ locale: (await params).locale, namespace: "lookbooks" });
  return {
    title: t("viewSizeGuide"),
    description: t("findFitDesc"),
  };
}

export default async function SizeGuidePage() {
  const t = await getTranslations("lookbooks");

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-softBlack-900">
            {t("viewSizeGuide")}
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href={SIZE_GUIDE_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-center"
            >
              {t("viewSizeGuide")} (PDF)
            </a>
            <Link href="/lookbooks" className="btn-secondary text-center">
              {t("backToLookbooks")}
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-beige-200">
          <iframe
            src={`${SIZE_GUIDE_PDF}#view=FitH`}
            title={t("viewSizeGuide")}
            className="w-full min-h-[70vh] sm:min-h-[80vh] border-0"
          />
        </div>

        <p className="mt-4 text-sm text-softBlack-500 text-center">
          {t("findFitDesc")} If the PDF does not display,{" "}
          <a
            href={SIZE_GUIDE_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-600 hover:underline"
          >
            open the Size Guide (PDF)
          </a>{" "}
          in a new tab.
        </p>
      </div>
    </div>
  );
}
