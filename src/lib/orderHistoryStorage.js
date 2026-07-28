const ORDER_HISTORY_KEY = "orderHistoryTokens";
const LAST_ORDER_TOKEN_KEY = "lastOrderToken";

const isBrowser = () => typeof window !== "undefined";

const readJson = (key, fallback) => {
  if (!isBrowser()) {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
};

const writeJson = (key, value) => {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getOrderHistoryTokens = () => {
  const tokens = readJson(ORDER_HISTORY_KEY, []);
  return Array.isArray(tokens) ? tokens.filter(Boolean) : [];
};

export const addOrderHistoryToken = (token) => {
  const normalized = String(token || "").trim();
  if (!normalized) {
    return;
  }

  const tokens = getOrderHistoryTokens();
  const nextTokens = [normalized, ...tokens.filter((existing) => existing !== normalized)].slice(
    0,
    20
  );
  writeJson(ORDER_HISTORY_KEY, nextTokens);
  setLastOrderToken(normalized);
};

export const removeOrderHistoryToken = (token) => {
  const normalized = String(token || "").trim();
  if (!normalized) {
    return;
  }

  const tokens = getOrderHistoryTokens().filter((existing) => existing !== normalized);
  writeJson(ORDER_HISTORY_KEY, tokens);
};

export const clearOrderHistoryTokens = () => {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(ORDER_HISTORY_KEY);
};

export const setLastOrderToken = (token) => {
  if (!isBrowser()) {
    return;
  }

  const normalized = String(token || "").trim();
  if (!normalized) {
    window.localStorage.removeItem(LAST_ORDER_TOKEN_KEY);
    return;
  }

  window.localStorage.setItem(LAST_ORDER_TOKEN_KEY, normalized);
};

export const getLastOrderToken = () => {
  if (!isBrowser()) {
    return null;
  }

  const token = window.localStorage.getItem(LAST_ORDER_TOKEN_KEY);
  return token ? String(token).trim() : null;
};

