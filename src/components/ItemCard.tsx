import type { UserItem } from "@/services/itemsService";
import { Building2, Mail, Phone, User } from "lucide-react";

interface ItemCardProps {
  item: UserItem;
  onClick: () => void;
}

const ItemCard = ({ item, onClick }: ItemCardProps) => (
  <button
    onClick={onClick}
    className="group w-full rounded-lg border bg-card p-4 text-left transition-all hover:card-shadow-lg hover:border-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  >
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent font-semibold text-sm">
        {item.name.charAt(0)}
      </div>
      <div className="min-w-0 flex-1 space-y-1">
        <p className="font-medium text-foreground group-hover:text-accent transition-colors truncate">
          {item.name}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" />{item.email}</span>
          <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" />{item.phone}</span>
          <span className="inline-flex items-center gap-1"><Building2 className="h-3 w-3" />{item.company.name}</span>
        </div>
      </div>
    </div>
  </button>
);

export default ItemCard;
