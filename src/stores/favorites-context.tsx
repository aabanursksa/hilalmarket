import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Product } from "@/lib/data";

const STORAGE_KEY = "hilaal-favorites";

function loadFavorites(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Product[];
  } catch { /* ignore */ }
  return [];
}

function saveFavorites(items: Product[]) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* ignore */ }
}

type FavoritesContextType = {
  items: Product[];
  toggleItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
  isFavorite: (id: string) => boolean;
  itemCount: number;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadFavorites();
    if (saved.length > 0) setItems(saved);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveFavorites(items);
  }, [items, hydrated]);

  const toggleItem = useCallback((product: Product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev.filter((i) => i.id !== product.id);
      return [...prev, product];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearAll = useCallback(() => setItems([]), []);

  const isFavorite = useCallback((id: string) => items.some((i) => i.id === id), [items]);

  return (
    <FavoritesContext.Provider value={{ items, toggleItem, removeItem, clearAll, isFavorite, itemCount: items.length }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
