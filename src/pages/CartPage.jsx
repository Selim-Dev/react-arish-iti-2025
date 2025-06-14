import React, { useContext } from "react";
import CartItem from "../components/CartItem";
import { CartContext } from "../contexts/CartContext";

const CartPage = () => {
		const { cartItems,removeFromCart } = useContext(CartContext);
	
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>

          <div className="mt-8 text-right">
            <span className="font-semibold">Total: </span>
            <span className="text-lg font-bold">
              ${total.toFixed(2)}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
