import type { UserItem } from "@/services/itemsService";
import ItemCard from "./ItemCard";
import { Inbox } from "lucide-react";

interface ItemListProps {
  items: UserItem[];
  onItemClick: (item: UserItem) => void;
}

const ItemList = ({ items, onItemClick }: ItemListProps) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-20 text-muted-foreground">
        <Inbox className="h-10 w-10" />
        <p className="font-medium">No results</p>
        <p className="text-sm">Try a different search.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onClick={() => onItemClick(item)} />
      ))}
    </div>
  );
};

export default ItemList;
