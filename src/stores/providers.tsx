import { type ReactNode } from "react";
import { CartProvider } from "./cart-context";
import { FavoritesProvider } from "./favorites-context";
import { LocaleProvider } from "./locale-context";

export function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <CartProvider>
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </CartProvider>
    </LocaleProvider>
  );
}
