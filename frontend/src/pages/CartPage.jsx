
import {CartContext} from '../apiRequests/CartProvider'
import { useContext } from 'react';

 

const CartPage = () => {
  
  const { cart, removeFromCart, loading } = useContext(CartContext);

  if (loading) return <p>Loading cart...</p>;
  
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingFee = 5.0;
  const tax = subtotal * 0.1;
  const orderTotal = subtotal + shippingFee + tax;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Shopping Cart</h2>
      <div className="grid grid-cols-3 gap-4">
        {cart.map((item) => (
          <div key={item.cart_id} className="flex justify-between items-center border p-4">
            <div>
              <img src={item.image} alt={item.name} className="w-20 h-20" />
              <p>{item.name}</p>
            </div>
            <div>
              <p>Qty: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.cart_id)} className="bg-red-500 text-white px-2">
                Remove
              </button>
            </div>
            <div>Ksh{(item.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>
      <h3>Subtotal: Ksh{subtotal.toFixed(2)}</h3>
      <h3>Shipping: Ksh{shippingFee}</h3>
      <h3>Tax: Ksh{tax.toFixed(2)}</h3>
      <h3>Total: Ksh{orderTotal.toFixed(2)}</h3>
      <button className="bg-green-500 text-white px-4 py-2">Checkout</button>
      <a href="/products">Continue Shopping</a>
    </div>
  );
};

export default CartPage;
