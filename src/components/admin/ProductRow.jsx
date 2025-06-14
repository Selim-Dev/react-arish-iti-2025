// components/admin/ProductRow.jsx
import React from 'react';

const ProductRow = ({ product, onEdit, onDelete }) => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {product.id}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {product.name}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      ${product.price}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {product.category}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          product.inStock
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {product.inStock ? 'In Stock' : 'Out of Stock'}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <button
        onClick={() => onEdit(product)}
        className="text-blue-600 hover:text-blue-900 mr-4"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(product.id)}
        className="text-red-600 hover:text-red-900"
      >
        Delete
      </button>
    </td>
  </tr>
);

export default ProductRow;
