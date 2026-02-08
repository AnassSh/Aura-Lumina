"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const navLinks = [
  { nameKey: "home" as const, href: "/" },
  { nameKey: "abayas" as const, href: "/lookbooks" },
  { nameKey: "shops" as const, href: "/shops" },
  { nameKey: "beauty" as const, href: "/beauty" },
  { nameKey: "blog" as const, href: "/blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("nav");
  const tLocale = useTranslations("locale");
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <span className="text-2xl md:text-3xl font-serif font-bold text-softBlack-900">
                Aura
              </span>
              <span className="text-2xl md:text-3xl font-serif font-light text-gold-500">
                Lumina
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.nameKey}
                href={link.href}
                className="text-softBlack-700 hover:text-gold-600 font-medium transition-colors duration-200 relative group"
              >
                {t(link.nameKey)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Language switcher + Search & Cart Icons */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-full border border-beige-200 overflow-hidden">
              {(["en", "ar", "fr"] as const).map((loc) => (
                <Link
                  key={loc}
                  href={pathname}
                  locale={loc}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    locale === loc
                      ? "bg-softBlack-900 text-beige-50"
                      : "text-softBlack-600 hover:bg-beige-100"
                  }`}
                  aria-label={tLocale(loc)}
                >
                  {loc === "ar" ? "ع" : loc === "fr" ? "Fr" : "En"}
                </Link>
              ))}
            </div>
            <button
              aria-label={t("searchAria")}
              className="p-2 text-softBlack-700 hover:text-gold-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button
              aria-label="Shopping bag"
              className="p-2 text-softBlack-700 hover:text-gold-600 transition-colors relative"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-softBlack-700"
            aria-label={t("menuAria")}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-96 pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-beige-200">
            {navLinks.map((link) => (
              <Link
                key={link.nameKey}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-softBlack-700 hover:text-gold-600 font-medium transition-colors duration-200 py-2"
              >
                {t(link.nameKey)}
              </Link>
            ))}
            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-2 pt-4 border-t border-beige-200">
              {(["en", "ar", "fr"] as const).map((loc) => (
                <Link
                  key={loc}
                  href={pathname}
                  locale={loc}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    locale === loc
                      ? "bg-softBlack-900 text-beige-50"
                      : "bg-beige-100 text-softBlack-600"
                  }`}
                >
                  {loc === "ar" ? "العربية" : loc === "fr" ? "Français" : "English"}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

