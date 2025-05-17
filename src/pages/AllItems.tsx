
import { useState, useMemo } from "react";
import { useData } from "@/context/data-context";
import { ItemGrid } from "@/components/items/ItemGrid";
import { ItemFilter } from "@/components/items/ItemFilter";
import { ItemStatus, ItemType } from "@/types";
import { Search } from "lucide-react";

const AllItems = () => {
  const { items, loading } = useData();
  
  const [filters, setFilters] = useState({
    search: "",
    status: "all" as ItemStatus | "all",
    type: "all" as ItemType | "all",
  });

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search filter
      const searchMatches = filters.search
        ? item.productName.toLowerCase().includes(filters.search.toLowerCase()) ||
          item.userName.toLowerCase().includes(filters.search.toLowerCase())
        : true;

      // Status filter
      const statusMatches =
        filters.status === "all" ? true : item.status === filters.status;

      // Type filter
      const typeMatches = filters.type === "all" ? true : item.type === filters.type;

      return searchMatches && statusMatches && typeMatches;
    });
  }, [items, filters]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">All Items</h1>
        <p className="text-muted-foreground">
          Browse and search for all lost and found items
        </p>
      </div>

      <ItemFilter onFilter={setFilters} />

      {loading ? (
        <div className="text-center p-8">Loading items...</div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center p-8 border rounded-lg flex flex-col items-center gap-3">
          <Search className="h-10 w-10 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No items found matching your filters</p>
        </div>
      ) : (
        <ItemGrid items={filteredItems} />
      )}
    </div>
  );
};

export default AllItems;
