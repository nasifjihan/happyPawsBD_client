import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { adminLoginRequest } from "../lib/adminApi";

const storageKey = "hpbd_admin_token";
const userKey = "hpbd_admin_username";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => sessionStorage.getItem(storageKey) || "");
  const [username, setUsername] = useState(
    () => sessionStorage.getItem(userKey) || ""
  );

  const saveSession = useCallback((nextToken, nextUsername) => {
    if (nextToken) {
      sessionStorage.setItem(storageKey, nextToken);
    } else {
      sessionStorage.removeItem(storageKey);
    }

    if (nextUsername) {
      sessionStorage.setItem(userKey, nextUsername);
    } else {
      sessionStorage.removeItem(userKey);
    }

    setToken(nextToken || "");
    setUsername(nextUsername || "");
  }, []);

  const login = useCallback(
    async ({ username: inputUsername, password }) => {
      const response = await adminLoginRequest({
        username: inputUsername,
        password,
      });

      saveSession(response.token, response.username);
      return response;
    },
    [saveSession]
  );

  const logout = useCallback(() => {
    saveSession("", "");
  }, [saveSession]);

  const value = useMemo(
    () => ({
      token,
      username,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [login, logout, token, username]
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);

