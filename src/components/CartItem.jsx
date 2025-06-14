import React from "react";

const CartItem = ({ item, removeFromCart }) => (
  <div className="flex items-center gap-4 p-4 border rounded shadow-sm">
    <img
      src={item.image}
      alt={item.name}
      className="w-20 h-20 object-cover rounded"
    />

    <div className="flex-1">
      <h3 className="font-semibold">{item.name}</h3>
      <p className="text-gray-500">${item.price.toFixed(2)}</p>
    </div>

    <button
      onClick={() => removeFromCart(item.id)}
      className="text-red-500 hover:text-red-700"
    >
      Remove
    </button>
  </div>
);

export default CartItem;
