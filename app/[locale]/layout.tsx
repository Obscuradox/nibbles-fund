import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nibblesfund.com"),
  title: "The Nibbles Fund — Outperforming the S&P since 2023.",
  description:
    "The Nibbles Fund. Run by a hamster. Audited by nobody. A Solana memecoin in the deadpan tradition.",
  openGraph: {
    title: "The Nibbles Fund",
    description: "Outperforming the S&P since 2023. Run by a hamster. Audited by nobody.",
    images: ["/images/og-image.jpg"],
    siteName: "The Nibbles Fund",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Nibbles Fund",
    description: "Outperforming the S&P since 2023. Run by a hamster. Audited by nobody.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/images/logo-pfp.png",
    apple: "/images/logo-pfp.png",
  },
  alternates: {
    languages: routing.locales.reduce(
      (acc, loc) => {
        acc[loc] = loc === routing.defaultLocale ? "/" : `/${loc}`;
        return acc;
      },
      {} as Record<string, string>
    ),
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          {children}
          <LanguageSwitcher />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
