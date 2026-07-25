import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  cartStorageKey,
  getStoredCartItems,
  saveStoredCartItems,
} from "../lib/cartStorage";

const cartContext = createContext(null);

export function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => getStoredCartItems());

  useEffect(() => {
    saveStoredCartItems(cartItems);
  }, [cartItems]);

  useEffect(() => {
    const syncCartState = (event) => {
      if (event.key && event.key !== cartStorageKey) {
        return;
      }

      setCartItems(getStoredCartItems());
    };

    window.addEventListener("storage", syncCartState);

    return () => {
      window.removeEventListener("storage", syncCartState);
    };
  }, []);

  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentItems, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }, []);

  const updateCartItemQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const value = useMemo(
    () => ({
      cartItems,
      cartItemsCount: cartItems.length,
      cartQuantityTotal: cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      ),
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      clearCart,
      setCartItems,
    }),
    [addToCart, cartItems, clearCart, removeFromCart, updateCartItemQuantity]
  );

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}

export function useCart() {
  const context = useContext(cartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider.");
  }

  return context;
}
