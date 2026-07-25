const CART_STORAGE_KEY = "cartItems";

const isBrowser = () => typeof window !== "undefined";

export const getStoredCartItems = () => {
  if (!isBrowser()) {
    return [];
  }

  try {
    const storedCartItems = window.localStorage.getItem(CART_STORAGE_KEY);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  } catch (error) {
    return [];
  }
};

export const saveStoredCartItems = (cartItems) => {
  if (!isBrowser()) {
    return;
  }

  if (cartItems.length) {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    return;
  }

  window.localStorage.removeItem(CART_STORAGE_KEY);
};

export const clearStoredCartItems = () => {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(CART_STORAGE_KEY);
};

export const cartStorageKey = CART_STORAGE_KEY;
