import type { Metadata } from "next";
import { Bodoni_Moda, Archivo } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bonaventure-couture.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Bonaventure — Couture sur mesure à Lyon",
  description:
    "Hermide Bonaventure dessine, coupe et coud des pièces sur mesure à Lyon : mariée, soirée, vestiaire de jour, accessoires.",
  openGraph: {
    title: "Bonaventure — Couture sur mesure à Lyon",
    description:
      "Hermide Bonaventure dessine, coupe et coud des pièces sur mesure à Lyon : mariée, soirée, vestiaire de jour, accessoires.",
    url: siteUrl,
    siteName: "Bonaventure",
    locale: "fr_FR",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Bonaventure",
  description:
    "Styliste sur mesure à Lyon : mariée, soirée, vestiaire de jour, accessoires.",
  url: siteUrl,
  areaServed: "Lyon",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${bodoni.variable} ${archivo.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
