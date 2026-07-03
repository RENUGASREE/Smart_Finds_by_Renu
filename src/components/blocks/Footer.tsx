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
    <footer className="border-t border-border/50 bg-[var(--cream)]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between md:gap-16">
          <div className="max-w-sm">
            <div className="mb-5 flex items-center gap-3.5">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[var(--accent)]/15 bg-white p-0.5 shadow-[0_2px_12px_-2px_rgba(184,149,106,0.2)]">
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    src="/Smart_Finds_by_Renu.png"
                    alt={config.website_name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="font-heading text-xl tracking-tight">
                {config.website_name}
              </h3>
            </div>
            <p className="text-sm leading-[1.75] text-muted-foreground">
              {config.tagline} Honest recommendations — no carts, no checkout,
              just finds I&apos;d share with a friend.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent)]">
              Connect
            </p>
            <ul className="space-y-3 text-sm">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-foreground/80 transition-all duration-200 hover:translate-x-0.5 hover:text-[var(--accent)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {config.contact_email && (
                <li>
                  <a
                    href={`mailto:${config.contact_email}`}
                    className="inline-flex items-center gap-2 text-foreground/80 transition-all duration-200 hover:translate-x-0.5 hover:text-[var(--accent)]"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {config.contact_email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-border/50 pt-7 text-center text-xs tracking-wide text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {config.website_name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
