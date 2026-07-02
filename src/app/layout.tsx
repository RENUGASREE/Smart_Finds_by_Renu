import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://smartfindsbyrenu.com"),
  title: "Smart Finds by Renu",
  description:
    "Curated Amazon finds, handmade creations, and honest recommendations from Renu.",
  icons: {
    icon: "/Smart_Finds_by_Renu.png",
  },
  openGraph: {
    title: "Smart Finds by Renu",
    description:
      "Curated Amazon finds, handmade creations, and honest recommendations from Renu.",
    images: [{ url: "/Smart_Finds_by_Renu.png" }],
    url: "https://smartfindsbyrenu.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Finds by Renu",
    description:
      "Curated Amazon finds, handmade creations, and honest recommendations from Renu.",
    images: ["/Smart_Finds_by_Renu.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
