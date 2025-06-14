// components/admin/StatsGrid.jsx
import React from 'react';

const StatsGrid = ({ stats }) => {
  if (!stats) return null;           // guard clause

  const card = (label, value, color) => (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {card('Total Products', stats.totalProducts, 'text-blue-600')}
      {card('In Stock',        stats.inStockProducts, 'text-green-600')}
      {card('Out of Stock',    stats.outOfStockProducts, 'text-red-600')}
      {card('Categories',      stats.categories, 'text-purple-600')}
    </div>
  );
};

export default StatsGrid;
