
import { useState, useMemo } from "react";
import { useData } from "@/context/data-context";
import { ItemGrid } from "@/components/items/ItemGrid";
import { ItemFilter } from "@/components/items/ItemFilter";
import { ItemStatus } from "@/types";
import { AlertTriangle } from "lucide-react";

const EmergencyItems = () => {
  const { items, loading } = useData();
  
  const [filters, setFilters] = useState({
    search: "",
    status: "all" as ItemStatus | "all",
    type: "emergency" as const,
  });

  const emergencyItems = useMemo(() => {
    return items.filter((item) => item.type === "emergency");
  }, [items]);

  const filteredItems = useMemo(() => {
    return emergencyItems.filter((item) => {
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
  }, [emergencyItems, filters]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2 text-emergency">
          <AlertTriangle className="h-7 w-7" />
          Emergency Items
        </h1>
        <p className="text-muted-foreground">
          High priority lost and found items that need immediate attention
        </p>
      </div>

      <ItemFilter onFilter={setFilters} />

      {loading ? (
        <div className="text-center p-8">Loading items...</div>
      ) : (
        <ItemGrid items={filteredItems} />
      )}
    </div>
  );
};

export default EmergencyItems;
