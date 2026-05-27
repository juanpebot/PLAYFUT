import React, { createContext, useState, useEffect, useCallback } from 'react';
import { User, AuthState, AuthContextType, RegisterData } from '../types/auth';
import { authService, storage } from '../lib/storage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true, // Start with loading true
  });

  // Auto-login on mount
  useEffect(() => {
    const checkAuth = () => {
      const user = authService.autoLogin();
      setState({
        user,
        isAuthenticated: user !== null,
        isLoading: false,
      });
    };

    // Small delay to simulate auth check
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true }));

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = authService.login(email, password);

    if (user) {
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      throw new Error('Credenciales incorrectas');
    }
  }, []);

  const register = useCallback(async (data: RegisterData): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true }));

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = authService.register(data);

    setState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    const updatedUser = authService.updateUser(updates);
    if (updatedUser) {
      setState(prev => ({ ...prev, user: updatedUser }));
    }
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
