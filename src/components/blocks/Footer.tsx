import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function Footer() {
  const supabase = await createClient();
  const { data: settingsData } = await supabase
    .from("settings")
    .select("value")
    .eq("key", "site_config")
    .single();

  const config = settingsData?.value || {
    website_name: "Smart Finds by Renu",
    tagline: "Curated finds I genuinely recommend.",
    instagram_url:
      "https://www.instagram.com/smart_finds_by_renu?igsh=MTZld3l0cm95YzI4cg==",
    pinterest_url: "https://www.pinterest.com/renuga_sree/",
    whatsapp_url: "https://whatsapp.com/channel/0029VbDdXZe90x2meXfxWS17",
    contact_email: "smartfindsbyrenu@gmail.com",
  };

  const socialLinks = [
    { label: "Instagram", href: config.instagram_url },
    { label: "Pinterest", href: config.pinterest_url },
    { label: "WhatsApp", href: config.whatsapp_url },
  ].filter((link) => link.href);

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-full border border-border/80 bg-white">
                <Image
                  src="/Smart_Finds_by_Renu.png"
                  alt={config.website_name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-heading text-lg">{config.website_name}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {config.tagline} Honest recommendations — no carts, no checkout,
              just finds I&apos;d share with a friend.
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Connect
              </p>
              <ul className="space-y-2 text-sm">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 transition-colors hover:text-[var(--accent)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                {config.contact_email && (
                  <li>
                    <a
                      href={`mailto:${config.contact_email}`}
                      className="inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-[var(--accent)]"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {config.contact_email}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {config.website_name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
