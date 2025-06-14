import React, { useReducer } from 'react';
import { cartReducer, initialState } from './CartReducer';

export default function UseReducerCartDemoAfter() {
  const products = [
    { id: 1, name: 'Laptop',   price: 999 },
    { id: 2, name: 'Mouse',    price: 29  },
    { id: 3, name: 'Keyboard', price: 79  }
  ];

  const [state, dispatch] = useReducer(cartReducer, initialState);

  /* derived totals */
  const subtotal   = state.items.reduce((s, i) => s + i.quantity * i.price, 0);
  const finalTotal = subtotal - subtotal * state.discount / 100;

  return (
    <div className="p-8 max-w-lg mx-auto space-y-4 border-2 border-green-500 rounded">
      <h1 className="text-2xl font-bold text-green-700">Shopping Cart (useReducer)</h1>

      {/* PRODUCTS */}
      <section>
        <h2 className="font-semibold mb-2">Products</h2>
        {products.map(p => (
          <div key={p.id} className="flex justify-between bg-gray-100 p-2 mb-2 rounded">
            <span>{p.name} – ${p.price}</span>
            <button
              onClick={() => dispatch({ type:'ADD_ITEM', payload:p })}
              className="bg-blue-500 text-white px-2 rounded"
            >Add</button>
          </div>
        ))}
      </section>

      {/* CART */}
      <section>
        <h2 className="font-semibold mb-2">Cart Items</h2>
        {state.items.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          state.items.map(i => (
            <div key={i.id} className="flex justify-between p-1">
              <span>{i.name} × {i.quantity}</span>
              <button
                onClick={() => dispatch({ type:'REMOVE_ITEM', payload:i.id })}
                className="bg-red-500 text-white px-2"
              >-</button>
            </div>
          ))
        )}
      </section>

      {/* DISCOUNT */}
      <section>
        <h2 className="font-semibold mb-2">Discount Code</h2>
        <input
          className="border px-2 py-1 mr-2"
          value={state.discountCode}
          onChange={e => dispatch({ type:'SET_CODE', payload:e.target.value })}
          placeholder="Enter code (SAVE10)"
        />
        <button
          onClick={() => dispatch({ type:'APPLY_DISCOUNT' })}
          className="bg-purple-500 text-white px-2"
        >Apply</button>
        {state.error    && <p className="text-red-600 text-sm">{state.error}</p>}
        {state.discount > 0 && (
          <p className="text-green-600 text-sm">Discount: {state.discount}%</p>
        )}
      </section>

      {/* TOTALS */}
      <section className="bg-gray-100 p-4 rounded">
        <div className="flex justify-between">
          <span>Subtotal:</span><span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total:</span><span>${finalTotal.toFixed(2)}</span>
        </div>
      </section>

      <button
        onClick={() => dispatch({ type:'CLEAR_CART' })}
        className="w-full bg-gray-600 text-white py-2 rounded"
      >
        Clear Cart
      </button>
    </div>
  );
}
