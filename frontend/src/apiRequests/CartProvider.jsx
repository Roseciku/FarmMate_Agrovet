import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

// Create CartContext
export const CartContext = createContext();

// Create the CartProvider component
const CartProvider = ({ children }) => {
  // wraps other component(its children and provides them with cart related logic)
  const { user, accessToken } = useContext(AuthContext); //grabs the currently logged-in user and their access token from AuthContext
  const navigate = useNavigate(); // Initializes navigate so that one is able to redirect users
  const [cart, setCart] = useState([]); //sets up cart as state. This is where you store the current items in the cart
  const [loading, setLoading] = useState(true); // Adds a loading state to track whether the cart is still being fetched from the server
 console.log({user})
 
  // Fetch cart data from backend when the component mounts
  useEffect(() => {
    
    if (!user || !user.user_id) return;

    const fetchCart = async () =>  {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/cart/${user.user_id}`
        );
        const data = await response.json();
      setCart(data.cart);
        console.log("Fetched cart:", data.cart);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        setCart([]); // Prevent loading loop
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]); 

  // Add item to cart
  const addToCart = async (product) => {
    
    if (!product || !product.product_id) {
      console.error("Invalid product:", product);
      return;
    }
 console.log({user})

    if (!user) {
      // Redirect to login and include product in query
      navigate(`/login?redirect=add-to-cart&product_id=${product.product_id}`);
      return;
    }

    // const existingItem = cart.find(
    //   (item) => item.product_id === product.product_id
    // );
    // console.log(existingItem)

    // if (existingItem) {
    //   // Optionally, just increase quantity if item already exists
    //   await updateQuantity(existingItem.cart_id, existingItem.quantity + 1);
    //   return;
    // }
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          product_id: product.product_id,
          quantity: 1,
        }),
        credentials: "include",
      });
      
      const data = await response.json();
      console.log("Cart after add response:", data.cart);
      // setCart((prevCart) => [...(prevCart || []), data.cart]);
      setCart(data.cart); // Update cart with the new data from the backend
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };
// Update item quantity in cart
const updateQuantity = async (cart_id, quantity) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart_id, quantity }),
    });
    const data = await response.json();
    //setCart((prevCart) => [...(prevCart || []), data.cart]);
     setCart(data.cart); // Update cart after quantity change
  } catch (error) {
    console.error("Failed to update quantity:", error);
  }
};

 // Remove item from cart
  const removeFromCart = async (cart_id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/remove/${cart_id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      setCart(data.cart); // Update cart after removing item
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, loading }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
