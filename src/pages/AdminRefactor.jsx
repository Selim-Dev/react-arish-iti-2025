// pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import AdminHeader   from '../components/admin/AdminHeader';
import StatsGrid     from '../components/admin/StatsGrid';
import ProductForm   from '../components/admin/ProductForm';
import ProductTable  from '../components/admin/ProductTable';
import { useAuth }   from '../contexts/AuthContext';

const AdminRefactor = () => {
  const { getAuthHeader }   = useAuth();

  const [loading, setLoading]       = useState(true);
  const [error,   setError]         = useState('');
  const [stats,   setStats]         = useState(null);
  const [products, setProducts]     = useState([]);

  // form helpers
  const [editingId,  setEditingId]  = useState(null);
  const [isAdding,   setIsAdding]   = useState(false);
  const [formData,   setFormData]   = useState({ name: '', price: '', category: '' });

  /* ---------------- side-effects ---------------- */

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    await Promise.all([fetchProducts(), fetchStats()]);
    setLoading(false);
  };

  const fetchProducts = async () => {
    try {
      const r = await fetch('http://localhost:5000/api/products');
      const d = await r.json();
      if (d.success) setProducts(d.products);
    } catch { setError('Failed to fetch products'); }
  };

  const fetchStats = async () => {
    try {
      const r = await fetch('http://localhost:5000/api/admin/stats', {
        headers: getAuthHeader(),
      });
      const d = await r.json();
      if (d.success) setStats(d.stats);
    } catch { /* ignore */ }
  };

  /* ---------------- CRUD helpers ---------------- */

  const handleAdd    = () => { setIsAdding(true);  setEditingId(null); resetForm(); };
  const handleEdit   = (p) => { setEditingId(p.id); setIsAdding(false); setFormData(p); };
/* ---- DELETE ---- */
const handleDelete = async (productId) => {
  if (!window.confirm('Are you sure you want to delete this product?')) return;

  try {
    const res = await fetch(
      `http://localhost:5000/api/admin/products/${productId}`,
      { method: 'DELETE', headers: getAuthHeader() }
    );

    if (res.ok) {
      await Promise.all([fetchProducts(), fetchStats()]);
    } else {
      setError('Failed to delete product');
    }
  } catch {
    setError('Failed to delete product');
  }
};

/* ---- ADD or EDIT ---- */
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  // If editingId is null we’re creating; otherwise we’re updating
  const editing = editingId !== null;

  const url = editing
    ? `http://localhost:5000/api/admin/products/${editingId}`
    : 'http://localhost:5000/api/admin/products';

  const method = editing ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      await Promise.all([fetchProducts(), fetchStats()]);
      // reset UI back to table-only state
      setEditingId(null);
      setIsAdding(false);
      setFormData({ name: '', price: '', category: '' });
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to save product');
    }
  } catch {
    setError('Failed to save product');
  }
};

  const resetForm = () => setFormData({ name: '', price: '', category: '' });
  const handleCancel = () => { setIsAdding(false); setEditingId(null); resetForm(); };

  /* ---------------- render ---------------- */

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsGrid stats={stats} />

        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {(isAdding || editingId) && (
          <ProductForm
            isAddingNew={isAdding}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}

        <ProductTable
          products={products}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
};

export default AdminRefactor;
