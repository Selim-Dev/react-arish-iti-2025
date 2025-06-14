// components/admin/AdminLayout.jsx
import React from 'react';
import Sidebar      from './Sidebar';
import AdminHeader  from './AdminHeader';

const AdminLayout = ({ children }) => (
  <div className="min-h-screen flex">
    <Sidebar />

    <div className="flex-1 flex flex-col">
      <AdminHeader />         {/* already uses useAuth */}
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  </div>
);

export default AdminLayout;
