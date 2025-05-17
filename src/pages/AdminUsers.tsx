
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { User } from "@/types";
import { Users, User as UserIcon, ShieldCheck, Mail, Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const AdminUsers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  if (!user) {
    navigate("/login");
    return null;
  }
  
  if (user.role !== "admin") {
    return (
      <Alert className="max-w-lg mx-auto">
        <AlertTitle>Access Denied</AlertTitle>
        <AlertDescription>
          You don't have permission to access the admin user management.
        </AlertDescription>
      </Alert>
    );
  }
  
  // Mock users for demonstration
  const mockUsers: User[] = [
    {
      id: "1",
      name: "Admin User",
      email: "admin@sec.edu",
      role: "admin",
      createdAt: "2023-01-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Test User",
      email: "user@sec.edu",
      role: "user",
      createdAt: "2023-02-20T14:20:00Z",
    },
    {
      id: "3",
      name: "John Doe",
      email: "john@sec.edu",
      role: "user",
      createdAt: "2023-03-05T09:15:00Z",
    },
    {
      id: "4",
      name: "Jane Smith",
      email: "jane@sec.edu",
      role: "user",
      createdAt: "2023-04-10T11:45:00Z",
    },
    {
      id: "5",
      name: "Admin Two",
      email: "admin2@sec.edu",
      role: "admin",
      createdAt: "2023-05-12T13:30:00Z",
    },
  ];
  
  const filteredUsers = searchTerm
    ? mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : mockUsers;
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP");
    } catch (error) {
      return "Invalid date";
    }
  };
  
  const handleDeleteUser = (userId: string) => {
    toast.success(`User would be deleted (ID: ${userId})`);
  };
  
  const handleToggleAdmin = (userId: string) => {
    toast.success(`User admin status would be toggled (ID: ${userId})`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Users className="h-7 w-7" />
          User Management
        </h1>
        <p className="text-muted-foreground">
          View and manage all users of the Lost & Found Portal
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" onClick={() => setSearchTerm("")}>
          Reset
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage user accounts and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                    {u.name}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {u.email}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={u.role === "admin" ? "default" : "secondary"}
                      className="flex w-fit items-center gap-1"
                    >
                      {u.role === "admin" && <ShieldCheck className="h-3 w-3" />}
                      {u.role === "admin" ? "Admin" : "User"}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(u.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleAdmin(u.id)}
                      >
                        {u.role === "admin" ? "Remove Admin" : "Make Admin"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteUser(u.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
