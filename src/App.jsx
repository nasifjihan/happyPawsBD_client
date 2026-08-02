import "./App.css";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { CartContextProvider } from "./context/CartContext";
import { ColorModeProvider } from "./context/ColorModeContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <ColorModeProvider>
      <UserAuthContextProvider>
        <CartContextProvider>
          <AppRoutes />
        </CartContextProvider>
      </UserAuthContextProvider>
    </ColorModeProvider>
  );
};

export default App;
