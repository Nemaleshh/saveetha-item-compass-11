
import { ItemCard } from "./ItemCard";
import { Item } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

interface ItemGridProps {
  items: Item[];
  showActions?: boolean;
}

export function ItemGrid({ items, showActions = true }: ItemGridProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} showActions={showActions} />
      ))}
    </div>
  );
}
