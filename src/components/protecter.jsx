import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

export default function Protecter() {
    const location = useLocation();
    
    // Simplified and more secure authentication check
    const isAuthenticated = () => {
        try {
            const user = localStorage.getItem('user');
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            return !!(user && isLoggedIn === 'true');
        } catch (error) {
            console.error('Authentication check failed:', error);
            return false;
        }
    };

    if (!isAuthenticated()) {
        // Redirect to login with the attempted path for better UX
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return (
        <div className="min-h-screen">
            <Outlet />
        </div>
    );
}
