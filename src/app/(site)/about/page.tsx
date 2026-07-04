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
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <div className="mb-16 text-center md:mb-20">
        <h1 className="font-heading mb-4 text-4xl leading-[1.1] tracking-tight sm:text-5xl md:text-[3.25rem]">
          ABOUT SMART FINDS BY RENU
        </h1>
        <p className="mb-6 text-2xl font-medium text-[var(--accent)] md:text-3xl">
          Curated. Handmade. Heartmade.
        </p>
        <div className="mb-6 space-y-2 text-lg text-muted-foreground md:text-xl">
          <p>Amazon & Flipkart Finds</p>
          <p>Handmade Jewelry</p>
          <p>Resin Art Creations</p>
        </div>
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          Discover products and creations that make everyday life a little better...
        </p>
      </div>

      <div className="grid items-center gap-14 md:grid-cols-[1.05fr_1fr] md:gap-16 lg:gap-24">
        <div className="overflow-hidden rounded-[2rem] border border-border/50 bg-white p-5 shadow-[0_4px_24px_-8px_rgb(0_0_0_0.08)] md:p-8">
          <div className="relative min-h-[420px] w-full sm:min-h-[480px] md:min-h-[560px]">
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

        <div className="md:py-4">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            About
          </p>
          <h1 className="font-heading mb-10 text-4xl leading-[1.1] tracking-tight sm:text-5xl md:text-[3.25rem]">
            Hi, I&apos;m Renu.
          </h1>

          <div className="space-y-6 text-base leading-[1.75] text-muted-foreground md:text-lg md:leading-[1.8]">
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

      <section className="mt-24 rounded-[2rem] border border-border/50 bg-[var(--cream)] p-8 md:mt-32 md:p-14">
        <h2 className="font-heading mb-5 text-2xl tracking-tight md:text-3xl">
          Let&apos;s connect
        </h2>
        <p className="mb-10 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
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
              className="inline-flex h-12 items-center rounded-full border border-border/60 bg-white px-6 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-[var(--accent)]/40 hover:text-[var(--accent)] hover:shadow-soft"
            >
              {link.label}
            </a>
          ))}
        </div>

        {config.contact_email && (
          <div className="mt-10 flex items-center gap-2.5 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 text-[var(--accent)]" />
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
