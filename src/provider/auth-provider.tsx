import { createContext, useContext, useState, ReactNode } from 'react';
import {
  getAuthToken,
  saveAuthToken,
  clearAuthToken,
} from '@/features/auth/services/auth-storage';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string, id: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAuthToken());

  const login = (token: string, id: string) => {
    saveAuthToken(token, id);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearAuthToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
