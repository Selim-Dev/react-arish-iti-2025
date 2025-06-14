// components/admin/ProductForm.jsx
import React from 'react';

const ProductForm = ({
  isAddingNew,
  formData,
  setFormData,
  onSubmit,
  onCancel,
}) => (
  <div className="bg-white p-6 rounded-lg shadow mb-8">
    <h2 className="text-xl font-semibold mb-4">
      {isAddingNew ? 'Add New Product' : 'Edit Product'}
    </h2>

    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <input
        type="text"
        placeholder="Product Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="number"
        step="0.01"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <div className="md:col-span-3 flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {isAddingNew ? 'Add Product' : 'Update Product'}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
);

export default ProductForm;
