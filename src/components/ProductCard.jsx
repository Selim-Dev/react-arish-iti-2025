import React, { useContext } from 'react';
import { Link } from 'react-router'; // corrected from 'react-router' to 'react-router-dom'
import { CartContext } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);
  
  return (
    <div className="border rounded shadow hover:shadow-lg transition flex flex-col">
      <Link
        to={`/products/${product.id}`}
        className="block"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover rounded-t"
        />
        <div className="p-4">
          <h3 className="font-semibold">{product.name}</h3>
          <span className="text-green-600 font-bold">${product.price}</span>
        </div>
      </Link>

      {/* Add to Cart button */}
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-500 text-white mt-auto p-2 rounded-b hover:bg-blue-600 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
