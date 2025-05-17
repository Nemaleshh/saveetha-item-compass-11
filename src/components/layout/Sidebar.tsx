
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  Plus,
  Calendar,
  AlertTriangle,
  FileCheck,
  Users,
  Settings,
  Mail,
} from "lucide-react";

interface SideNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SideNavProps) {
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
    <div className={cn("pb-12 w-64 h-screen hidden md:block", className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
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
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {user?.role === "admin" && (
          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
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
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
