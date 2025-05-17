
import { Item } from "@/types";
import { ItemCard } from "./ItemCard";

interface ItemGridProps {
  items: Item[];
  showActions?: boolean;
}

export function ItemGrid({ items, showActions = true }: ItemGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">No items found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} showActions={showActions} />
      ))}
    </div>
  );
}
