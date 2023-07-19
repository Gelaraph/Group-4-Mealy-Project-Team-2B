import { CartProvider } from "react-use-cart";
import BaseRoutes from "./routes/BaseRoutes";
import CartContextProvider from "./hooks/CartContext";
import { ProtectRoute } from "./routes/ProtectRoute";
import "./App.css";

const App = () => (
  <ProtectRoute>
    <CartProvider>
      <CartContextProvider>
        <BaseRoutes />
      </CartContextProvider>
    </CartProvider>
  </ProtectRoute>
);

export default App;
