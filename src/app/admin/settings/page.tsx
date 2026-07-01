import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateSettings } from "../actions";
import { Save } from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: settingsData } = await supabase.from("settings").select("value").eq("key", "site_config").single();
  const config = settingsData?.value || {
    website_name: "Smart Finds by Renu",
    tagline: "Discover Smart Finds. Shop with Confidence.",
    instagram_url: "",
    pinterest_url: "",
    whatsapp_url: "",
    contact_email: ""
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Site Settings</h1>

      <form action={updateSettings} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">General</h2>
          <div className="space-y-2">
            <Label htmlFor="website_name">Website Name</Label>
            <Input id="website_name" name="website_name" defaultValue={config.website_name} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input id="tagline" name="tagline" defaultValue={config.tagline} required />
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-semibold border-b pb-2">Social & Contact Links</h2>
          <div className="space-y-2">
            <Label htmlFor="instagram_url">Instagram URL</Label>
            <Input id="instagram_url" name="instagram_url" defaultValue={config.instagram_url} placeholder="https://instagram.com/..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pinterest_url">Pinterest URL</Label>
            <Input id="pinterest_url" name="pinterest_url" defaultValue={config.pinterest_url} placeholder="https://pinterest.com/..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp_url">WhatsApp Channel URL</Label>
            <Input id="whatsapp_url" name="whatsapp_url" defaultValue={config.whatsapp_url} placeholder="https://whatsapp.com/channel/..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact_email">Contact Email (Optional)</Label>
            <Input id="contact_email" name="contact_email" type="email" defaultValue={config.contact_email} />
          </div>
        </div>

        <div className="pt-6">
          <Button type="submit" size="lg">
            <Save className="w-4 h-4 mr-2" /> Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
