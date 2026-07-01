import Image from "next/image";
import { Camera, Link as LinkIcon, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "About - Smart Finds by Renu",
  description: "Learn more about Renu and the story behind Smart Finds.",
};

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: settingsData } = await supabase.from("settings").select("value").eq("key", "site_config").single();
  const config = settingsData?.value || {
    website_name: "Smart Finds by Renu",
    instagram_url: "https://www.instagram.com/smart_finds_by_renu?igsh=MTZld3l0cm95YzI4cg==",
    pinterest_url: "https://www.pinterest.com/renuga_sree/",
    whatsapp_url: "https://whatsapp.com/channel/0029VbDdXZe90x2meXfxWS17",
    contact_email: "smartfindsbyrenu@gmail.com",
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
              <Image src="/About.png" alt="About Renu" fill className="object-cover" priority />
            </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Hi, I'm Renu.</h1>
            <div className="prose prose-zinc dark:prose-invert text-lg text-muted-foreground">
              <p className="mb-4">
                I personally curate useful products from Amazon and Flipkart, sharing only those that I genuinely find helpful.
              </p>
              <p className="mb-4">            <Image
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80"
              alt="About Renu"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />  I love discovering smart lifestyle items that make everyday life easier and more enjoyable.
              </p>
              <p className="mb-4">
                In addition to product recommendations, I create handmade jewelry and resin art, each piece crafted with love and attention to detail.
              </p>
              <p className="mb-4">
                My goal is to help people shop smarter, save time, and enjoy curated finds that truly add value.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-3xl p-8 md:p-16 text-center border">
          <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            I'd love to hear from you! Follow me on social media for daily product recommendations, behind-the-scenes of my resin art process, and exclusive deals.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {config.instagram_url && (
              <a href={config.instagram_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full h-14 px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-none shadow-lg text-white font-medium text-lg transition-colors">
                <Camera className="mr-2 h-5 w-5" /> Follow on Instagram
              </a>
            )}
            
            {config.pinterest_url && (
              <a href={config.pinterest_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full h-14 px-8 bg-red-600 hover:bg-red-700 border-none shadow-lg text-white font-medium text-lg transition-colors">
                <LinkIcon className="mr-2 h-5 w-5" /> Pin with Me
              </a>
            )}
            
            {config.whatsapp_url && (
              <a href={config.whatsapp_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full h-14 px-8 shadow-sm border border-input bg-background hover:bg-muted hover:text-foreground font-medium text-lg transition-colors">
                Join WhatsApp Channel
              </a>
            )}
          </div>
          
          {config.contact_email && (
            <div className="mt-12 flex items-center justify-center gap-2 text-muted-foreground">
              <Mail className="h-5 w-5" />
              <a href={`mailto:${config.contact_email}`} className="hover:text-primary transition-colors">
                {config.contact_email}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
