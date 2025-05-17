
import { useAuth } from "@/context/auth-context";
import { useData } from "@/context/data-context";
import { ItemGrid } from "@/components/items/ItemGrid";
import { DeleteItemsForm } from "@/components/admin/DeleteItemsForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Search, AlertTriangle, FileCheck, Calendar, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { user } = useAuth();
  const { items } = useData();
  const navigate = useNavigate();
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  if (user.role !== "admin") {
    return (
      <Alert className="max-w-lg mx-auto">
        <AlertTitle>Access Denied</AlertTitle>
        <AlertDescription>
          You don't have permission to access the admin dashboard.
        </AlertDescription>
      </Alert>
    );
  }
  
  const lostItems = items.filter(item => item.status === "lost");
  const foundItems = items.filter(item => item.status === "found");
  const completedItems = items.filter(item => item.status === "completed");
  const emergencyItems = items.filter(item => item.type === "emergency");
  const normalItems = items.filter(item => item.type === "normal");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="h-7 w-7" />
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage lost and found items across the campus
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{items.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lost Items</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lostItems.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Found Items</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{foundItems.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emergency</CardTitle>
            <AlertTriangle className="h-4 w-4 text-emergency" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emergencyItems.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedItems.length}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-emergency" /> 
              Emergency Items
            </CardTitle>
            <CardDescription>High priority items that need attention</CardDescription>
          </CardHeader>
          <CardContent>
            {emergencyItems.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">No emergency items</p>
            ) : (
              <ItemGrid items={emergencyItems.slice(0, 3)} />
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              Admin Tools
            </CardTitle>
            <CardDescription>Access special admin functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Bulk Delete Items</h3>
                <DeleteItemsForm />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            All Items
          </CardTitle>
          <CardDescription>Browse and manage all items</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="lost">Lost Items</TabsTrigger>
              <TabsTrigger value="found">Found Items</TabsTrigger>
              <TabsTrigger value="emergency">Emergency Items</TabsTrigger>
              <TabsTrigger value="normal">Normal Items</TabsTrigger>
              <TabsTrigger value="completed">Completed Items</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <ItemGrid items={items.slice(0, 9)} />
            </TabsContent>
            <TabsContent value="lost">
              <ItemGrid items={lostItems} />
            </TabsContent>
            <TabsContent value="found">
              <ItemGrid items={foundItems} />
            </TabsContent>
            <TabsContent value="emergency">
              <ItemGrid items={emergencyItems} />
            </TabsContent>
            <TabsContent value="normal">
              <ItemGrid items={normalItems} />
            </TabsContent>
            <TabsContent value="completed">
              <ItemGrid items={completedItems} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
