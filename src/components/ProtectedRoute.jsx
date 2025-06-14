// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Redirect to home if user is not admin but admin is required
    if (requireAdmin && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    // Render children if all checks pass
    return children;
};

export default ProtectedRoute;