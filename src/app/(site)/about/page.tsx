import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "About - Smart Finds by Renu",
  description:
    "Learn about Renu and the story behind Smart Finds — curated recommendations you can trust.",
};

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: settingsData } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "site_config")
    .single();

  const config = settingsData?.value || {
    website_name: "Smart Finds by Renu",
    instagram_url:
      "https://www.instagram.com/smart_finds_by_renu?igsh=MTZld3l0cm95YzI4cg==",
    pinterest_url: "https://www.pinterest.com/renuga_sree/",
    whatsapp_url: "https://whatsapp.com/channel/0029VbDdXZe90x2meXfxWS17",
    contact_email: "smartfindsbyrenu@gmail.com",
  };

  const socialLinks = [
    { label: "Instagram", href: config.instagram_url },
    { label: "Pinterest", href: config.pinterest_url },
    { label: "WhatsApp Channel", href: config.whatsapp_url },
  ].filter((link) => link.href);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
      <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
        <div className="overflow-hidden rounded-[2rem] border border-border/60 bg-white p-4 shadow-card md:p-6">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/About.png"
              alt="Renu"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            About
          </p>
          <h1 className="font-heading mb-8 text-4xl md:text-5xl">
            Hi, I&apos;m Renu.
          </h1>

          <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              I personally curate useful products from Amazon and Flipkart,
              sharing only those that I genuinely find helpful.
            </p>
            <p>
              I love discovering smart lifestyle items that make everyday life
              easier and more enjoyable.
            </p>
            <p>
              In addition to recommendations, I create handmade jewelry and
              resin art — each piece crafted with love and attention to detail.
            </p>
            <p>
              My goal is to help people discover thoughtfully, save time, and
              enjoy finds that truly add value.
            </p>
          </div>
        </div>
      </div>

      <section className="mt-20 rounded-[2rem] border border-border/60 bg-secondary/40 p-8 md:p-12">
        <h2 className="font-heading mb-4 text-2xl md:text-3xl">
          Let&apos;s connect
        </h2>
        <p className="mb-8 max-w-2xl text-muted-foreground">
          Follow along for daily recommendations, handmade updates, and the
          finds I&apos;m loving right now.
        </p>

        <div className="flex flex-wrap gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-full border border-border/60 bg-background px-5 text-sm font-medium transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {config.contact_email && (
          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <Link
              href={`mailto:${config.contact_email}`}
              className="transition-colors hover:text-[var(--accent)]"
            >
              {config.contact_email}
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
