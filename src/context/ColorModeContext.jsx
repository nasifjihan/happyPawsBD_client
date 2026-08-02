import { CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { getAppTheme } from "../Theme/Theme";

export const COLOR_MODE_STORAGE_KEY = "hpbd-color-mode";

const ColorModeContext = createContext({
  mode: "light",
  setMode: () => undefined,
  toggleMode: () => undefined,
});

export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const stored = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY);
    return stored === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, mode);
  }, [mode]);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const theme = useMemo(() => getAppTheme(mode), [mode]);

  const contextValue = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode,
    }),
    [mode, toggleMode],
  );

  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

