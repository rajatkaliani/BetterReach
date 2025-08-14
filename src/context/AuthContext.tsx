import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'admin' | 'instructor' | 'student' | 'parent';

export interface User {
  role: Role;
  authenticated: boolean;
  username?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: Role, credentials: { username: string; password: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (role: Role, credentials: { username: string; password: string }): Promise<boolean> => {
    // Simulate login validation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (credentials.username && credentials.password) {
      setUser({
        role,
        authenticated: true,
        username: credentials.username
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user?.authenticated ?? false;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}