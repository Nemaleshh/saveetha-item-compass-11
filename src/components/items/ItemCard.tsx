
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar, MapPin, Phone, Check, Trash2 } from "lucide-react";
import { Item } from "@/types";
import { format } from "date-fns";
import { useAuth } from "@/context/auth-context";
import { useData } from "@/context/data-context";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface ItemCardProps {
  item: Item;
  showActions?: boolean;
}

export function ItemCard({ item, showActions = true }: ItemCardProps) {
  const { user } = useAuth();
  const { updateItemStatus, deleteItem } = useData();
  const isMobile = useIsMobile();
  
  const isOwner = user?.id === item.userId;
  const isAdmin = user?.role === "admin";
  const canModify = isOwner || isAdmin;
  
  const handleStatusUpdate = () => {
    updateItemStatus(item.id, "completed");
  };
  
  const handleDelete = () => {
    deleteItem(item.id);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "lost":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "found":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "PPP");
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <Card className={`h-full flex flex-col ${item.type === "emergency" ? "border-emergency" : ""}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="line-clamp-1">{item.productName}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(item.date)}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className={getStatusColor(item.status)}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Badge>
            {item.type === "emergency" && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3.5 w-3.5" />
                EMG
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 flex-grow">
        {item.photo && (
          <div className="relative aspect-[4/3] rounded-md overflow-hidden mb-4">
            <img
              src={item.photo}
              alt={item.productName}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-sm break-words">{item.place}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-sm">{item.userPhone}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            Posted by {item.userName}
          </div>
        </div>
      </CardContent>
      {showActions && canModify && item.status !== "completed" && (
        <CardFooter className="pt-2 mt-auto">
          <div className={`flex ${isMobile ? "flex-col w-full" : "gap-2"}`}>
            <Button
              variant="outline"
              size="sm"
              className={`gap-1 ${isMobile ? "mb-2 w-full" : "flex-1"}`}
              onClick={handleStatusUpdate}
            >
              <Check className="h-4 w-4" />
              COMP
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`gap-1 text-destructive hover:text-destructive ${isMobile ? "w-full" : "flex-1"}`}
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
              DEL
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
