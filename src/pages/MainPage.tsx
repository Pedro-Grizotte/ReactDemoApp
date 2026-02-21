import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchItems, type UserItem } from "@/services/itemsService";
import SearchBar from "@/components/SearchBar";
import ItemList from "@/components/ItemList";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";

const MainPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const { data: items, isLoading, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchItems,
  });

  const filtered = useMemo(() => {
    if (!items) return [];
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((u) =>
      [u.name, u.email, u.username, u.phone].some((f) => f.toLowerCase().includes(q))
    );
  }, [items, query]);

  const handleItemClick = (item: UserItem) => navigate(`/detail/${item.id}`);

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-foreground">Users</h1>
      <div className="mb-6">
        <SearchBar value={query} onChange={setQuery} placeholder="Search users..." />
      </div>

      {isLoading && <LoadingState label="Loading users..." />}
      {error && <ErrorState message={(error as Error).message} onRetry={() => refetch()} />}
      {!isLoading && !error && <ItemList items={filtered} onItemClick={handleItemClick} />}
    </div>
  );
};

export default MainPage;
