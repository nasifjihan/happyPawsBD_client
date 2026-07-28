const CHECKOUT_STORAGE_KEY = "checkoutDeliveryInfo";

const isBrowser = () => typeof window !== "undefined";

export const getStoredCheckoutDeliveryInfo = () => {
  if (!isBrowser()) {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(CHECKOUT_STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    return null;
  }
};

export const saveStoredCheckoutDeliveryInfo = (deliveryInfo) => {
  if (!isBrowser()) {
    return;
  }

  const hasMeaningfulValue = Object.values(deliveryInfo || {}).some((value) =>
    String(value || "").trim()
  );

  if (!hasMeaningfulValue) {
    window.localStorage.removeItem(CHECKOUT_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(
    CHECKOUT_STORAGE_KEY,
    JSON.stringify(deliveryInfo)
  );
};

export const clearStoredCheckoutDeliveryInfo = () => {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(CHECKOUT_STORAGE_KEY);
};
