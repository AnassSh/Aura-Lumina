import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleHtmlAttrs from "@/components/LocaleHtmlAttrs";

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleHtmlAttrs locale={locale} />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
