import Link from "next/link";
import { Camera, Link as LinkIcon, Heart } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function Footer() {
  const supabase = await createClient();
  const { data: settingsData } = await supabase.from("settings").select("value").eq("key", "site_config").single();
  const config = settingsData?.value || {
    website_name: "Smart Finds by Renu",
    tagline: "Discover Smart Finds. Shop with Confidence.",
    instagram_url: "https://www.instagram.com/smart_finds_by_renu?igsh=MTZld3l0cm95YzI4cg==",
    pinterest_url: "https://www.pinterest.com/renuga_sree/",
    whatsapp_url: "https://whatsapp.com/channel/0029VbDdXZe90x2meXfxWS17",
    contact_email: "smartfindsbyrenu@gmail.com",
  };

  return (
    <footer className="border-t bg-background py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-muted">
              <Image src="/Smart_Finds_by_Renu.png" alt="Logo" width={48} height={48} priority />
            </div>
            <h3 className="text-lg font-bold mb-0">{config.website_name}</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            {config.tagline} Curated affiliate products and handmade creations just for you.
          </p>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/categories" className="hover:text-primary transition-colors">All Categories</Link>
              </li>
              <li>
                <Link href="/handmade" className="hover:text-primary transition-colors">Handmade Collection</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">About Renu</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Me</h3>
            <div className="flex flex-col gap-4">
              {config.instagram_url && (
                <a href={config.instagram_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full h-14 px-8 bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90 border-none shadow-lg font-medium text-lg transition-colors">
                  <Camera className="mr-2 h-5 w-5" /> Follow on Instagram
                  <span className="sr-only">Instagram</span>
                </a>
              )}
              {config.pinterest_url && (
                <a href={config.pinterest_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full h-14 px-8 bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90 border-none shadow-lg font-medium text-lg transition-colors">
                  <LinkIcon className="mr-2 h-5 w-5" /> Pin with Me
                  <span className="sr-only">Pinterest</span>
                </a>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-6 flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-[var(--accent)]" /> by {config.website_name}
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {config.website_name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
