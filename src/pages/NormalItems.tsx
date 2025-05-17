
import { useState, useMemo } from "react";
import { useData } from "@/context/data-context";
import { ItemGrid } from "@/components/items/ItemGrid";
import { ItemFilter } from "@/components/items/ItemFilter";
import { ItemStatus, ItemType } from "@/types";
import { Calendar } from "lucide-react";

const NormalItems = () => {
  const { items, loading } = useData();
  
  const [filters, setFilters] = useState({
    search: "",
    status: "all" as ItemStatus | "all",
    type: "normal" as const,
  });

  const normalItems = useMemo(() => {
    return items.filter((item) => item.type === "normal");
  }, [items]);

  const filteredItems = useMemo(() => {
    return normalItems.filter((item) => {
      // Search filter
      const searchMatches = filters.search
        ? item.productName.toLowerCase().includes(filters.search.toLowerCase()) ||
          item.userName.toLowerCase().includes(filters.search.toLowerCase())
        : true;

      // Status filter
      const statusMatches =
        filters.status === "all" ? true : item.status === filters.status;

      return searchMatches && statusMatches;
    });
  }, [normalItems, filters]);

  const handleFilterChange = (newFilters: {
    search: string;
    status: ItemStatus | "all";
    type: ItemType | "all";
  }) => {
    setFilters({
      search: newFilters.search,
      status: newFilters.status,
      type: "normal", // Always keep as normal for this page
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Calendar className="h-7 w-7" />
          Normal Items
        </h1>
        <p className="text-muted-foreground">
          Browse all standard lost and found items
        </p>
      </div>

      <ItemFilter onFilter={handleFilterChange} />

      {loading ? (
        <div className="text-center p-8">Loading items...</div>
      ) : (
        <ItemGrid items={filteredItems} />
      )}
    </div>
  );
};

export default NormalItems;
