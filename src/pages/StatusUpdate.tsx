
import { useState, useMemo } from "react";
import { useData } from "@/context/data-context";
import { useAuth } from "@/context/auth-context";
import { ItemGrid } from "@/components/items/ItemGrid";
import { ItemStatus } from "@/types";
import { FileCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const StatusUpdate = () => {
  const { user } = useAuth();
  const { getUserItems } = useData();
  const [activeTab, setActiveTab] = useState<ItemStatus | "all">("all");
  const isMobile = useIsMobile();
  
  const userItems = useMemo(() => {
    return getUserItems();
  }, [getUserItems]);

  const filteredItems = useMemo(() => {
    return activeTab === "all" 
      ? userItems
      : userItems.filter(item => item.status === activeTab);
  }, [userItems, activeTab]);

  if (!user) {
    return (
      <Alert className="max-w-lg mx-auto">
        <AlertTitle>Authentication required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>You need to be logged in to view your items.</p>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
          <FileCheck className="h-6 w-6 md:h-7 md:w-7" />
          Manage Your Items
        </h1>
        <p className="text-muted-foreground">
          View and update the status of your reported items
        </p>
      </div>

      <Tabs 
        defaultValue="all" 
        value={activeTab} 
        onValueChange={(v) => setActiveTab(v as ItemStatus | "all")}
        className="space-y-4"
      >
        <div className="overflow-x-auto pb-1">
          <TabsList className={isMobile ? "w-full grid grid-cols-4" : ""}>
            <TabsTrigger value="all" className={isMobile ? "text-xs py-1.5" : ""}>All Items</TabsTrigger>
            <TabsTrigger value="lost" className={isMobile ? "text-xs py-1.5" : ""}>Lost</TabsTrigger>
            <TabsTrigger value="found" className={isMobile ? "text-xs py-1.5" : ""}>Found</TabsTrigger>
            <TabsTrigger value="completed" className={isMobile ? "text-xs py-1.5" : ""}>Completed</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value={activeTab}>
          {userItems.length === 0 ? (
            <Alert>
              <AlertTitle>No items found</AlertTitle>
              <AlertDescription className="flex flex-col gap-4">
                <p>You haven't reported any items yet.</p>
                <Link to="/new-item">
                  <Button variant="outline">Report an Item</Button>
                </Link>
              </AlertDescription>
            </Alert>
          ) : filteredItems.length === 0 ? (
            <Alert>
              <AlertTitle>No {activeTab} items</AlertTitle>
              <AlertDescription>
                You don't have any items with the {activeTab} status.
              </AlertDescription>
            </Alert>
          ) : (
            <ItemGrid items={filteredItems} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatusUpdate;
