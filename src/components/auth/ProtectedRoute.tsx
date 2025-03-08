
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireRole?: 'job-seeker' | 'job-poster';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false,
  requireRole
}) => {
  const { user, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Redirect to profile if user is not an admin but the route requires admin
    return <Navigate to="/profile" replace />;
  }

  // Check user role if required
  if (requireRole) {
    const userEmail = user.email || '';
    const isJobPoster = userEmail.includes('employer') || userEmail.includes('job-poster');
    const userRole = isJobPoster ? 'job-poster' : 'job-seeker';
    
    if (requireRole !== userRole) {
      return <Navigate to="/profile" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
