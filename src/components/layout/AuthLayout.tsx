
import { Outlet } from "react-router-dom";
import { useTheme } from "@/context/theme-context";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export function AuthLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-college">SEC</div>
            <div className="text-lg font-semibold">Lost & Found</div>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Outlet />
      </main>

      <footer className="py-4 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Saveetha Engineering College - Lost & Found Portal
        </div>
      </footer>
    </div>
  );
}
