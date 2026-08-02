import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./Theme/Theme";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { CartContextProvider } from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserAuthContextProvider>
        <CartContextProvider>
          <AppRoutes />
        </CartContextProvider>
      </UserAuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
