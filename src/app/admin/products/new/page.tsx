import { createClient } from "@/lib/supabase/server";
import AddProductForm from "@/components/admin/AddProductForm";

export default async function NewProductPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  const { data: platforms } = await supabase
    .from("platforms")
    .select("*")
    .order("display_order", { ascending: true });

  return <AddProductForm categories={categories} platforms={platforms} />;
}
