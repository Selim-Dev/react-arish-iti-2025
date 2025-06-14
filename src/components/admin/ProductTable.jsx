// components/admin/ProductTable.jsx
import React from 'react';
import ProductRow from './ProductRow';

const ProductTable = ({ products, onAdd, onEdit, onDelete }) => (
  <div className="bg-white shadow rounded-lg">
    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800">Products</h2>
      <button
        onClick={onAdd}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add New Product
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {/* --- STATIC ROW HERE --- */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              0
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              Sample Product
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              $0.00
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              Example
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                Demo
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              (static)
            </td>
          </tr>

          {/* --- DYNAMIC ROWS --- */}
          {products.map((p) => (
            <ProductRow
              key={p.id}
              product={p}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ProductTable;
