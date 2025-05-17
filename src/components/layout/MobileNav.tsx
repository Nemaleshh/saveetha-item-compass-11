
import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Search, Plus, Calendar, AlertTriangle, FileCheck, Mail, Settings, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/new-item", label: "Post New Item", icon: Plus },
    { path: "/all-items", label: "All Items", icon: Search },
    { path: "/normal-items", label: "Normal Items", icon: Calendar },
    { path: "/emergency-items", label: "Emergency Items", icon: AlertTriangle },
    { path: "/status-update", label: "Status Update", icon: FileCheck },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  // Admin-only items
  const adminItems = [
    { path: "/admin", label: "Admin Dashboard", icon: Settings },
    { path: "/admin/users", label: "Manage Users", icon: Users },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <div className="text-2xl font-bold text-college">SEC</div>
            <div className="text-lg font-semibold">Lost & Found</div>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="py-2">
            <h2 className="mb-2 text-lg font-semibold tracking-tight">
              Main Menu
            </h2>
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {user?.role === "admin" && (
            <div className="py-2">
              <h2 className="mb-2 text-lg font-semibold tracking-tight">
                Admin Controls
              </h2>
              <div className="space-y-1">
                {adminItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                      isActive(item.path)
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
