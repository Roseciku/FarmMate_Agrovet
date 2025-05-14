import { CartContext } from "../apiRequests/CartProvider";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, loading } = useContext(CartContext);

  if (loading) return <p>Loading cart...</p>;

  const subtotal = cart.reduce(
    (acc, item) => acc + item?.price * item?.quantity,
    0
  );
  const shippingFee = 5.0;
  const tax = subtotal * 0.1;
  const orderTotal = subtotal + shippingFee + tax;

  console.log("Cart items:", cart);
  return (
    <div className="w-full p-6">
      <h2 className="text-3xl font-bold text-center">Shopping Cart</h2>
      <div className="w-full px-4">
        <div className=" grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full sm:flex-col lg:block md:block ">
          {cart.map((item) => (
            <div
              key={item?.cart_id}
              className="flex justify-between items-center border p-4 w-full"
            >
              <div>
                <img
                  src={`http://localhost:5500${item?.image}`}
                  alt={item?.name}
                  className="h-20 w-20 mb-2"
                />
                <p>{item?.name}</p>
              </div>
              <div>
                <p>Qty: {item?.quantity}</p>
                <button
                  onClick={() => removeFromCart(item?.cart_id)}
                  className="bg-red-500 text-white px-2"
                >
                  Remove
                </button>
              </div>
              <div>Ksh{(item?.price * item?.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-end p-6">
        <div>
          <h3 className="font-bold">Subtotal: Ksh{subtotal.toFixed(2)}</h3>
          <h3 className="font-bold">Shipping: Ksh{shippingFee}</h3>
          <h3 className="font-bold">Tax: Ksh{tax.toFixed(2)}</h3>
          <h3 className="font-bold text-xl">
            Total: Ksh{orderTotal.toFixed(2)}
          </h3>

          <button className="bg-green-500 text-white px-4 py-2 rounded-full font-poppins w-[150px]">
            Checkout
          </button>
        </div>
        <NavLink to="/products">Continue Shopping</NavLink>
      </div>
    </div>
  );
};

export default CartPage;
