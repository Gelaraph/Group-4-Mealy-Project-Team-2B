import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import CartContextProvider from "./hooks/CartContext";
import { ProtectRoute } from "./routes/ProtectRoute";
import AuthProvider from "./providers/AuthProvider";
import Preloader from "./component/Preloader/Preloader";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={<Preloader />}>
    <BrowserRouter>
      <AuthProvider>
        <ProtectRoute>
          <CartProvider>
            <CartContextProvider>
              <App />
            </CartContextProvider>
          </CartProvider>
        </ProtectRoute>
      </AuthProvider>
    </BrowserRouter>
  </Suspense>,
);
