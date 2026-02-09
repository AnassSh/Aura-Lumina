import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Aura Lumina | Modest Fashion & Beauty",
    template: "%s | Aura Lumina",
  },
  description:
    "Discover elegant abayas, modest fashion inspiration, and beauty tips. Aura Lumina celebrates timeless elegance and modern modest style for the sophisticated woman.",
  keywords: [
    "modest fashion",
    "abayas",
    "hijab fashion",
    "women's fashion",
    "beauty tips",
    "modest clothing",
    "Islamic fashion",
    "elegant abayas",
    "modest style",
  ],
  authors: [{ name: "Aura Lumina" }],
  creator: "Aura Lumina",
  publisher: "Aura Lumina",

  alternates: {
    canonical: "https://auralumina.com",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://auralumina.com",
    siteName: "Aura Lumina",
    title: "Aura Lumina | Modest Fashion & Beauty",
    description:
      "Discover elegant abayas, modest fashion inspiration, and beauty tips for the modern sophisticated woman.",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Aura Lumina - Modest Fashion & Beauty",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Aura Lumina | Modest Fashion & Beauty",
    description:
      "Discover elegant abayas, modest fashion inspiration, and beauty tips.",
    images: ["/images/og-image.svg"],
    creator: "@auralumina",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>

      <body className="min-h-screen flex flex-col bg-[#F9F7F4] text-[#1F1F1F]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}