
import { createContext, useContext, useState, useEffect } from "react";
import { Item, ItemPlace, ItemStatus, ItemType } from "@/types";
import { useAuth } from "./auth-context";
import { toast } from "sonner";

interface DataContextType {
  items: Item[];
  loading: boolean;
  addItem: (item: Omit<Item, "id" | "userId" | "createdAt">) => Promise<void>;
  updateItemStatus: (id: string, status: ItemStatus) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  deleteItemsByFilter: (
    dateRange?: { start: string; end: string },
    type?: ItemType | "all"
  ) => Promise<void>;
  getUserItems: () => Item[];
  getEmergencyItems: () => Item[];
  getNormalItems: () => Item[];
  getItemById: (id: string) => Item | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial sample data
const INITIAL_ITEMS: Item[] = [
  {
    id: "item1",
    userId: "2",
    userName: "Test User",
    userPhone: "9876543210",
    productName: "Water Bottle",
    photo: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    place: "lost",
    date: "2023-05-15T10:30:00Z",
    type: "normal",
    status: "lost",
    createdAt: "2023-05-15T10:30:00Z",
  },
  {
    id: "item2",
    userId: "2",
    userName: "Test User",
    userPhone: "9876543210",
    productName: "Laptop",
    photo: null,
    place: "lost",
    date: "2023-05-17T14:20:00Z",
    type: "emergency",
    status: "lost",
    createdAt: "2023-05-17T14:20:00Z",
  },
  {
    id: "item3",
    userId: "1",
    userName: "Admin User",
    userPhone: "9876543211",
    productName: "Wallet",
    photo: null,
    place: "found",
    date: "2023-05-18T09:15:00Z",
    type: "normal",
    status: "found",
    createdAt: "2023-05-18T09:15:00Z",
  },
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Load items from local storage or use initial data
    const storedItems = localStorage.getItem("sec_items");
    if (storedItems) {
      try {
        setItems(JSON.parse(storedItems));
      } catch (error) {
        console.error("Error parsing stored items", error);
        setItems(INITIAL_ITEMS);
      }
    } else {
      setItems(INITIAL_ITEMS);
    }
    setLoading(false);
  }, []);

  // Save items to local storage whenever they change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("sec_items", JSON.stringify(items));
    }
  }, [items]);

  // Auto cleanup items older than 30 days
  useEffect(() => {
    const cleanup = () => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      setItems(prevItems => 
        prevItems.filter(item => {
          const itemDate = new Date(item.createdAt);
          return itemDate >= thirtyDaysAgo;
        })
      );
    };
    
    // Run cleanup on mount and set interval
    cleanup();
    const interval = setInterval(cleanup, 24 * 60 * 60 * 1000); // Once per day
    
    return () => clearInterval(interval);
  }, []);

  const addItem = async (newItemData: Omit<Item, "id" | "userId" | "createdAt">) => {
    if (!user) {
      toast.error("You must be logged in to add an item");
      return;
    }

    setLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newItem: Item = {
        ...newItemData,
        id: Math.random().toString(36).substring(2, 9),
        userId: user.id,
        createdAt: new Date().toISOString(),
      };

      setItems((prevItems) => [...prevItems, newItem]);
      toast.success("Item added successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  const updateItemStatus = async (id: string, status: ItemStatus) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, status } : item
        )
      );
      toast.success(`Item marked as ${status}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update item status");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      toast.success("Item deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete item");
    } finally {
      setLoading(false);
    }
  };

  const deleteItemsByFilter = async (
    dateRange?: { start: string; end: string },
    type?: ItemType | "all"
  ) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setItems((prevItems) =>
        prevItems.filter((item) => {
          // Apply date filter if provided
          if (dateRange) {
            const itemDate = new Date(item.date);
            const startDate = new Date(dateRange.start);
            const endDate = new Date(dateRange.end);
            if (itemDate < startDate || itemDate > endDate) {
              return true; // Keep items outside range
            }
          }

          // Apply type filter if provided
          if (type && type !== "all") {
            return item.type !== type; // Keep items not matching type
          }

          // If both filters pass, item will be deleted
          return !(dateRange || (type && type !== "all"));
        })
      );
      toast.success("Items deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete items");
    } finally {
      setLoading(false);
    }
  };

  const getUserItems = () => {
    if (!user) return [];
    return items.filter((item) => item.userId === user.id);
  };

  const getEmergencyItems = () => {
    return items.filter((item) => item.type === "emergency");
  };

  const getNormalItems = () => {
    return items.filter((item) => item.type === "normal");
  };

  const getItemById = (id: string) => {
    return items.find((item) => item.id === id);
  };

  return (
    <DataContext.Provider
      value={{
        items,
        loading,
        addItem,
        updateItemStatus,
        deleteItem,
        deleteItemsByFilter,
        getUserItems,
        getEmergencyItems,
        getNormalItems,
        getItemById,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
