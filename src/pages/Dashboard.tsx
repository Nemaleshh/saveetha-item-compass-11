
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { useData } from "@/context/data-context";
import { ItemGrid } from "@/components/items/ItemGrid";
import { Plus, Search, AlertTriangle, FileCheck, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const { items, getUserItems, getEmergencyItems } = useData();
  
  const userItems = getUserItems();
  const emergencyItems = getEmergencyItems();
  const recentItems = [...items].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 6);
  
  const lostCount = items.filter(item => item.status === "lost").length;
  const foundCount = items.filter(item => item.status === "found").length;
  const completedCount = items.filter(item => item.status === "completed").length;
  const emergencyCount = emergencyItems.length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to Saveetha Engineering College Lost & Found Portal
          </p>
        </div>
        <Link to="/new-item">
          <Button className="gap-1">
            <Plus className="h-4 w-4" />
            Report Item
          </Button>
        </Link>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lost Items</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lostCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Found Items</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{foundCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emergency Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-emergency" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emergencyCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}</div>
          </CardContent>
        </Card>
      </div>
      
      {user && userItems.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Items</h2>
            <Link to="/status-update">
              <Button variant="outline" size="sm" className="gap-1">
                <FileCheck className="h-4 w-4" />
                Manage My Items
              </Button>
            </Link>
          </div>
          <ItemGrid items={userItems.slice(0, 3)} />
        </div>
      )}
      
      {emergencyItems.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-emergency flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Emergency Items
            </h2>
            <Link to="/emergency-items">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
          <ItemGrid items={emergencyItems.slice(0, 3)} />
        </div>
      )}
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Items
          </h2>
          <Link to="/all-items">
            <Button variant="outline" size="sm">View All Items</Button>
          </Link>
        </div>
        <ItemGrid items={recentItems} />
      </div>
    </div>
  );
};

export default Dashboard;
