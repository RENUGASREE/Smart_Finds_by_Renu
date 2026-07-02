import { createClient } from "@/lib/supabase/server";
import { Package, FolderTree, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { count: productsCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });
  const { count: categoriesCount } = await supabase
    .from("categories")
    .select("*", { count: "exact", head: true });
  const { count: handmadeCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("handmade", true);

  const stats = [
    {
      title: "Total Finds",
      value: productsCount || 0,
      icon: Package,
    },
    {
      title: "Categories",
      value: categoriesCount || 0,
      icon: FolderTree,
    },
    {
      title: "Handmade Finds",
      value: handmadeCount || 0,
      icon: Heart,
    },
  ];

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold">Dashboard</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Welcome back. Manage your curated recommendations from here.
      </p>

      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/60 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-[1.25rem] border border-dashed border-border/80 bg-secondary/20 p-8 text-center">
        <h3 className="mb-2 text-lg font-medium">Ready to share a new find?</h3>
        <p className="text-sm text-muted-foreground">
          Use Finds in the sidebar to add a recommendation — just like posting
          to Instagram.
        </p>
      </div>
    </div>
  );
}
