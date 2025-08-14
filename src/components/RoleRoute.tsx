import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, Role } from '@/context/AuthContext';

interface RoleRouteProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

export function RoleRoute({ children, allowedRoles }: RoleRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}