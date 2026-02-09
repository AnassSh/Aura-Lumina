import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const contactInfoConfig = [
  {
    icon: "email",
    value: "hello@auralumina.com",
    href: "mailto:anasannuler@gmail.com",
    titleKey: "emailUs" as const,
  },
  {
    icon: "location",
    value: "Rabat, Morocco",
    href: null as string | null,
    titleKey: "location" as const,
  },
  {
    icon: "instagram",
    value: "@aulumina",
    href: "https://www.instagram.com/aulumina/",
    titleKey: "instagram" as const,
  },
];

const quickLinks = [
  { href: "/faq", key: "faqLink" as const },
  { href: "/shops", key: "shopsLink" as const },
  { href: "/about", key: "aboutLink" as const },
];

export default async function ContactPage() {
  const t = await getTranslations("contact");

  const iconEmail = (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
  const iconLocation = (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
  const iconInstagram = (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
    </svg>
  );

  const iconByKey: Record<string, React.ReactNode> = {
    email: iconEmail,
    location: iconLocation,
    instagram: iconInstagram,
  };

  const quickLinkList: { href: string; key: "faqLink" | "shopsLink" | "aboutLink" }[] = [
    { href: "/faq", key: "faqLink" },
    { href: "/shops", key: "shopsLink" },
    { href: "/about", key: "aboutLink" },
  ];

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
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-serif font-semibold text-softBlack-900 mb-6">
              {t("contactInfoTitle")}
            </h2>

            <div className="space-y-6 mb-8">
              {contactInfoConfig.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0 text-gold-600">
                    {iconByKey[info.icon]}
                  </div>
                  <div>
                    <h3 className="font-medium text-softBlack-900">
                      {t(info.titleKey)}
                    </h3>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-softBlack-600 hover:text-gold-600 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-softBlack-600">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-beige-50 rounded-2xl p-6">
              <h3 className="font-semibold text-softBlack-900 mb-4">
                {t("quickLinks")}
              </h3>
              <ul className="space-y-2">
                {quickLinkList.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-softBlack-600 hover:text-gold-600 transition-colors"
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="bg-beige-50 py-16 mt-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-softBlack-900 mb-4">
                {t("careersTitle")}
              </h2>
              <p className="text-lg text-softBlack-600 max-w-2xl mx-auto">
                {t("careersDesc")}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
              <h3 className="text-xl font-semibold text-softBlack-900 mb-6">
                {t("openPositions")}
              </h3>
              <div className="space-y-4">
                {["position1", "position2", "position3"].map((posKey) => (
                  <div
                    key={posKey}
                    className="flex items-center justify-between p-4 border border-beige-200 rounded-2xl hover:border-gold-300 transition-colors"
                  >
                    <span className="font-medium text-softBlack-800">
                      {t(posKey as "position1" | "position2" | "position3")}
                    </span>
                    <span className="text-sm text-gold-600 bg-gold-50 px-3 py-1 rounded-full">
                      {t("positionType")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-softBlack-500 italic">
              {t("careersNote")}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-gold-100 via-beige-100 to-rose-100 py-16">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-softBlack-900 mb-4">
            {t("ctaTitle")}
          </h2>
          <p className="text-softBlack-600 max-w-2xl mx-auto mb-8">
            {t("ctaDesc")}
          </p>
          <Link href="/shops" className="btn-primary">
            {t("ctaButton")}
          </Link>
        </div>
      </section>
    </div>
  );
}
