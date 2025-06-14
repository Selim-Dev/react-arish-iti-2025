// components/admin/Sidebar.jsx
import { NavLink } from 'react-router';
import {
  LayoutDashboard,
  PackageSearch,
  Users,
  Settings,
} from 'lucide-react';        // small icon set

const link =
  'flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-200';

const Sidebar = () => (
  <aside className="w-60 h-full bg-gray-100 border-r border-gray-200">
    <h2 className="px-4 py-6 text-xl font-bold">Admin</h2>

    <nav className="space-y-1">
      <NavLink to="/admin"      className={link}>
        <LayoutDashboard size={18} />
        Dashboard
      </NavLink>

      <NavLink to="/admin/products" className={link}>
        <PackageSearch size={18} />
        Products
      </NavLink>

      <NavLink to="/admin/users"    className={link}>
        <Users size={18} />
        Users
      </NavLink>

      <NavLink to="/admin/settings" className={link}>
        <Settings size={18} />
        Settings
      </NavLink>
    </nav>
  </aside>
);

export default Sidebar;
