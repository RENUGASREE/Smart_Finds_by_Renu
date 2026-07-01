import Link from "next/link";
import { LayoutDashboard, Package, FolderTree, Settings, LogOut } from "lucide-react";
import { logout } from "./login/actions";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If not logged in, just render children (which is the login page handled by middleware)
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-muted/10">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-background border-r flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
            <LayoutDashboard className="w-5 h-5 text-muted-foreground" />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
            <Package className="w-5 h-5 text-muted-foreground" />
            Products
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
            <FolderTree className="w-5 h-5 text-muted-foreground" />
            Categories
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
            Settings
          </Link>
        </nav>
        <div className="p-4 border-t">
          <form action={logout}>
            <button className="flex w-full items-center gap-3 px-3 py-2 text-destructive rounded-lg hover:bg-destructive/10 transition-colors">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center bg-background p-4 rounded-xl border mb-4">
          <h2 className="font-bold">Admin Panel</h2>
          <form action={logout}>
            <button className="text-sm text-destructive font-medium flex items-center gap-1">
              <LogOut className="w-4 h-4" /> Exit
            </button>
          </form>
        </div>

        <div className="bg-background rounded-3xl border shadow-sm p-6 md:p-10 min-h-[calc(100vh-4rem)]">
          {children}
        </div>
      </main>
    </div>
  );
}
