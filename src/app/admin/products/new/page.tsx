import { createClient } from "@/lib/supabase/server";
import AddProductForm from "@/components/admin/AddProductForm";

export default async function NewProductPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return <AddProductForm categories={categories} />;
}
