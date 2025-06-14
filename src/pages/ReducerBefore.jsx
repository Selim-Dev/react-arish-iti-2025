import React, { useState } from 'react';

export default function UseStateCartDemo() {
  const products = [
    { id: 1, name: 'Laptop',   price: 999 },
    { id: 2, name: 'Mouse',    price: 29  },
    { id: 3, name: 'Keyboard', price: 79  }
  ];

  // ❶ State
  const [items, setItems] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState(null);

  // ❷ Actions
  const addItem = (product) => {
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      setItems(items.map(i =>
        i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setItems([...items, { ...product, quantity: 1 }]);
    }
  };

  const removeItem = (id) => {
    setItems(prev => prev
      .map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i)
      .filter(i => i.quantity > 0)
    );
  };

  const applyDiscount = () => {
    if (discountCode === 'SAVE10') {
      setDiscount(10);
      setError(null);
    } else {
      setDiscount(0);
      setError('Invalid code');
    }
  };

  const clearCart = () => {
    setItems([]);
    setDiscount(0);
    setDiscountCode('');
    setError(null);
  };

  // ❸ Derived values
  const subtotal  = items.reduce((s, i) => s + i.quantity * i.price, 0);
  const finalTotal = subtotal - (subtotal * discount / 100);

  // ❹ UI
  return (
    <div className="p-8 max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Shopping Cart (useState only)</h1>

      {/* PRODUCTS */}
      <section>
        <h2 className="font-semibold mb-2">Products</h2>
        {products.map(p => (
          <div key={p.id} className="flex justify-between bg-gray-100 p-2 mb-2 rounded">
            <span>{p.name} – ${p.price}</span>
            <button onClick={() => addItem(p)} className="bg-blue-500 text-white px-2 rounded">Add</button>
          </div>
        ))}
      </section>

      {/* CART */}
      <section>
        <h2 className="font-semibold mb-2">Cart Items</h2>
        {items.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          items.map(i => (
            <div key={i.id} className="flex justify-between p-1">
              <span>{i.name} × {i.quantity}</span>
              <button onClick={() => removeItem(i.id)} className="bg-red-500 text-white px-2">-</button>
            </div>
          ))
        )}
      </section>

      {/* DISCOUNT */}
      <section>
        <h2 className="font-semibold mb-2">Discount Code</h2>
        <input
          className="border px-2 py-1 mr-2"
          value={discountCode}
          onChange={e => setDiscountCode(e.target.value)}
          placeholder="Enter code (SAVE10)"
        />
        <button onClick={applyDiscount} className="bg-purple-500 text-white px-2">Apply</button>
        {error    && <p className="text-red-600 text-sm">{error}</p>}
        {discount > 0 && <p className="text-green-600 text-sm">Discount: {discount}%</p>}
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

      <button onClick={clearCart} className="w-full bg-gray-600 text-white py-2 rounded">
        Clear Cart
      </button>
    </div>
  );
}
