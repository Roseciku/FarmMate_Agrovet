// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import CartProvider from "./CartProvider";

const Layout = () => {
  return (
    <CartProvider>
      <Outlet />
    </CartProvider>
  );
};

export default Layout;
