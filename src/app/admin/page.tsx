import { createClient } from "@/lib/supabase/server";
import { Package, FolderTree, TrendingUp, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboard() {
  const supabase = await createClient();
  
  // Fetch stats
  const { count: productsCount } = await supabase.from("products").select("*", { count: "exact", head: true });
  const { count: categoriesCount } = await supabase.from("categories").select("*", { count: "exact", head: true });
  const { count: handmadeCount } = await supabase.from("products").select("*", { count: "exact", head: true }).eq("handmade", true);
  
  const stats = [
    {
      title: "Total Products",
      value: productsCount || 0,
      icon: Package,
      color: "text-blue-500",
    },
    {
      title: "Categories",
      value: categoriesCount || 0,
      icon: FolderTree,
      color: "text-green-500",
    },
    {
      title: "Handmade Items",
      value: handmadeCount || 0,
      icon: Heart,
      color: "text-red-500",
    },
    {
      title: "Views (Mock)",
      value: "1,234",
      icon: TrendingUp,
      color: "text-purple-500",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-muted/30 rounded-xl p-8 text-center border border-dashed">
        <h3 className="text-xl font-semibold mb-2">Welcome back, Renu!</h3>
        <p className="text-muted-foreground">
          Use the sidebar to manage your products, categories, and settings.
        </p>
      </div>
    </div>
  );
}
