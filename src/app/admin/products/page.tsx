import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteProduct } from "../actions";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export default async function ProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*, category:categories(name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Finds</h1>
          <p className="text-sm text-muted-foreground">
            Manage your curated recommendations.
          </p>
        </div>
        <Link href="/admin/products/new" className={buttonVariants({ variant: "default" })}>
          <Plus className="mr-2 h-4 w-4" /> Add Find
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Labels</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  {product.title}
                  {product.featured && (
                    <Badge variant="default" className="ml-2 text-[10px]">
                      Featured
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{product.category?.name}</TableCell>
                <TableCell>{product.platform}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {product.handmade && <Badge variant="secondary">Handmade</Badge>}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DeleteButton id={product.id} deleteAction={deleteProduct} />
                </TableCell>
              </TableRow>
            ))}
            {(!products || products.length === 0) && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  No finds yet. Add your first recommendation.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
