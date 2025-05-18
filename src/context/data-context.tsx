
import { createContext, useContext, useState, useEffect } from "react";
import { Item, ItemPlace, ItemStatus, ItemType } from "@/types";
import { useAuth } from "./auth-context";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load items from Supabase on mount and when user changes
  useEffect(() => {
    fetchItems();
    
    // Set up real-time subscription for updates
    const channel = supabase
      .channel('public:items')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'items' },
        (payload) => {
          // Refresh items when any change occurs
          fetchItems();
        }
      )
      .subscribe();
    
    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Fetch all items from Supabase
  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      // Map Supabase data to our Item interface
      const formattedItems: Item[] = data.map(item => ({
        id: item.id,
        userId: item.user_id,
        userName: item.user_name,
        userPhone: item.user_phone,
        productName: item.product_name,
        photo: item.photo_url,
        place: item.place as ItemPlace,
        date: item.date,
        type: item.type as ItemType,
        status: item.status as ItemStatus,
        createdAt: item.created_at
      }));
      
      setItems(formattedItems);
    } catch (error) {
      console.error("Error fetching items:", error);
      toast.error("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  // Add a new item to Supabase
  const addItem = async (newItemData: Omit<Item, "id" | "userId" | "createdAt">) => {
    if (!user) {
      toast.error("You must be logged in to add an item");
      return;
    }

    setLoading(true);
    try {
      // Create the item in Supabase
      const { data, error } = await supabase
        .from('items')
        .insert([
          {
            user_id: user.id,
            user_name: user.name,
            user_phone: newItemData.userPhone,
            product_name: newItemData.productName,
            photo_url: newItemData.photo,
            place: newItemData.place,
            date: new Date(newItemData.date).toISOString().split('T')[0],
            type: newItemData.type,
            status: newItemData.status
          }
        ])
        .select();

      if (error) {
        throw error;
      }
      
      toast.success("Item added successfully");
      
      // Refresh items
      await fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  // Update an item's status in Supabase
  const updateItemStatus = async (id: string, status: ItemStatus) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('items')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        throw error;
      }
      
      // Update local state
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, status } : item
        )
      );
      
      toast.success(`Item marked as ${status}`);
    } catch (error) {
      console.error("Error updating item status:", error);
      toast.error("Failed to update item status");
    } finally {
      setLoading(false);
    }
  };

  // Delete an item from Supabase
  const deleteItem = async (id: string) => {
    setLoading(true);
    try {
      // Get the item to check if it has an image
      const item = items.find(item => item.id === id);
      
      // Delete the item from Supabase
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }
      
      // If the item had an image, delete it from storage
      if (item?.photo) {
        try {
          const imagePath = item.photo.split('/').pop();
          if (imagePath) {
            await supabase.storage
              .from('items')
              .remove([imagePath]);
          }
        } catch (storageError) {
          console.error("Error deleting image:", storageError);
          // Continue even if image deletion fails
        }
      }
      
      // Update local state
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      toast.success("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item");
    } finally {
      setLoading(false);
    }
  };

  // Delete items by filter criteria
  const deleteItemsByFilter = async (
    dateRange?: { start: string; end: string },
    type?: ItemType | "all"
  ) => {
    if (!user || user.role !== 'admin') {
      toast.error("Only administrators can perform bulk deletions");
      return;
    }
    
    setLoading(true);
    try {
      let query = supabase.from('items').delete();
      
      // Apply date filter if provided
      if (dateRange) {
        query = query.gte('date', dateRange.start).lte('date', dateRange.end);
      }
      
      // Apply type filter if provided
      if (type && type !== "all") {
        query = query.eq('type', type);
      }
      
      const { error } = await query;
      
      if (error) {
        throw error;
      }
      
      // Refresh items
      await fetchItems();
      toast.success("Items deleted successfully");
    } catch (error) {
      console.error("Error deleting items:", error);
      toast.error("Failed to delete items");
    } finally {
      setLoading(false);
    }
  };

  // Filter functions
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
