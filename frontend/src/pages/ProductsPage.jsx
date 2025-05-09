import React, { useContext, useEffect } from "react";
import ProductsNavbar from "../components/ProductsNavbar";
import AllProducts from "../components/AllProducts";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../apiRequests/CartProvider";

function ProductsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

//useeffect is used when you want to handle component lifecycle.

  useEffect(() => {

    const saveProductCart = async (product_id) => {
      const productRes = await fetch(
        `http://localhost:5500/api/product/${product_id}`
      );

      if (!productRes.ok) return;

      const product = await productRes.json(); //fetch that single product

      await addToCart(product);
     
      navigate('/products')
    }; 

    const queryParams = new URLSearchParams(location.search);
    const redirect = queryParams.get("redirect");
    const product_id = queryParams.get("product_id");

    if (redirect === "add-to-cart" && product_id) {
      saveProductCart(product_id)
    }
  }, [location.search]);

  return (
    <div>
      <ProductsNavbar />
      <AllProducts />
    </div>
  );
}

export default ProductsPage;
