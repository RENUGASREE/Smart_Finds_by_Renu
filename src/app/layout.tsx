import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/blocks/Navbar";
import Footer from "@/components/blocks/Footer";

export const metadata: Metadata = {
  title: "Smart Finds by Renu",
  description: "Curated affiliate product recommendations, handmade jewelry, resin art, and everyday finds by Renu.",
  icons: {
    icon: "/Smart_Finds_by_Renu.png",
  },
  openGraph: {
    title: "Smart Finds by Renu",
    description: "Discover curated Amazon & Flipkart finds, handmade jewelry, resin art, and everyday product recommendations by Renu.",
    images: [{ url: "/Smart_Finds_by_Renu.png" }],
    url: "https://smartfindsbyrenu.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Finds by Renu",
    description: "Curated affiliate product recommendations, handmade jewelry, resin art, and everyday finds by Renu.",
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
      className="font-sans h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
