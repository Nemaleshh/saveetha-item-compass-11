
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { useAuth } from "@/context/auth-context";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AppLayout() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        {user && <Sidebar />}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center md:hidden border-b p-4">
            <MobileNav />
            <div className="ml-auto" />
          </div>
          <ScrollArea className="flex-1">
            <main className="flex-1 p-4 md:p-8">
              <Outlet />
            </main>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
