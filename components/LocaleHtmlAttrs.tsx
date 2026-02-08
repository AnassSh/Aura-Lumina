"use client";

import { useEffect } from "react";

export default function LocaleHtmlAttrs({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
  }, [locale]);
  return null;
}
