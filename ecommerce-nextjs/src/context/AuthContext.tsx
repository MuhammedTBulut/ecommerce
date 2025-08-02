'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginDTO, RegisterDTO, AuthContextType } from '@/types';
import { authService } from '@/services';
import { toast } from 'react-hot-toast';

/**
 * Authentication Context
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication Provider Props
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication Provider Component
 * Manages global authentication state using Context API
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Initialize authentication state on mount
   */
  useEffect(() => {
    initializeAuth();
  }, []);

  /**
   * Initialize authentication state from stored tokens
   */
  const initializeAuth = async () => {
    try {
      setLoading(true);
      
      if (authService.isAuthenticated()) {
        const storedToken = authService.getToken();
        if (storedToken) {
          setToken(storedToken);
          
          try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
          } catch (error) {
            console.error('Failed to get current user:', error);
            // Token might be invalid, clear auth state
            await logout();
          }
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login user with credentials
   */
  const login = async (credentials: LoginDTO): Promise<void> => {
    try {
      setLoading(true);
      
      const response = await authService.login(credentials);
      
      setUser(response.user);
      setToken(response.token);
      
      toast.success(`Welcome back, ${response.user.fullName}!`);
      
      // Redirect admin users to admin panel
      if (response.user.role === 'Admin' || response.user.role === 'SuperAdmin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/';
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register new user
   */
  const register = async (userData: RegisterDTO): Promise<void> => {
    try {
      setLoading(true);
      
      const response = await authService.register(userData);
      
      setUser(response.user);
      setToken(response.token);
      
      toast.success(`Welcome to our store, ${response.user.fullName}!`);
      
      // Redirect to home page after successful registration
      window.location.href = '/';
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      
      await authService.logout();
      
      setUser(null);
      setToken(null);
      
      toast.success('Successfully logged out');
    } catch (error) {
      console.error('Logout error:', error);
      // Clear state even if API call fails
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = Boolean(user && token);

  /**
   * Check if user has admin role
   */
  const isAdmin = Boolean(
    user && 
    (user.role === 'Admin' || user.role === 'SuperAdmin')
  );

  /**
   * Update user profile
   */
  const updateProfile = async (updatedData: Partial<User>): Promise<void> => {
    try {
      if (!user) throw new Error('No authenticated user');
      
      setLoading(true);
      
      // In a real implementation, you'd call an update profile API
      // For now, we'll just update the local state
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      
      toast.success('Profile updated successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Profile update failed';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Refresh authentication token
   */
  const refreshToken = async (): Promise<void> => {
    try {
      const newToken = await authService.refreshToken();
      setToken(newToken);
    } catch (error) {
      console.error('Token refresh failed:', error);
      // If refresh fails, logout user
      await logout();
      throw error;
    }
  };

  /**
   * Check if user has specific permission
   */
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    // Basic role-based permissions
    switch (user.role) {
      case 'SuperAdmin':
        return true; // SuperAdmin has all permissions
      case 'Admin':
        return ['read', 'write', 'delete', 'moderate'].includes(permission);
      case 'Customer':
        return ['read'].includes(permission);
      default:
        return false;
    }
  };

  /**
   * Context value object
   */
  const contextValue: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
    loading,
    updateProfile,
    refreshToken,
    hasPermission,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use authentication context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

/**
 * Higher-order component for authentication protection
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    requireAuth?: boolean;
    requireAdmin?: boolean;
    redirectTo?: string;
  } = {}
) {
  const {
    requireAuth = true,
    requireAdmin = false,
    redirectTo = '/auth/login'
  } = options;

  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    // Show loading while checking authentication
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    // Check authentication requirements
    if (requireAuth && !isAuthenticated) {
      if (typeof window !== 'undefined') {
        window.location.href = redirectTo;
      }
      return null;
    }

    // Check admin requirements
    if (requireAdmin && !isAdmin) {
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
      return null;
    }

    return <Component {...props} />;
  };
}

/**
 * Hook for role-based conditional rendering
 */
export function useRoleAccess() {
  const { user, isAdmin, hasPermission } = useAuth();

  return {
    isCustomer: user?.role === 'Customer',
    isAdmin,
    isSuperAdmin: user?.role === 'SuperAdmin',
    hasPermission,
    canRead: hasPermission('read'),
    canWrite: hasPermission('write'),
    canDelete: hasPermission('delete'),
    canModerate: hasPermission('moderate'),
  };
}

/**
 * Authentication guard component for route protection
 */
interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  fallback?: ReactNode;
}

export function AuthGuard({ 
  children, 
  requireAuth = false, 
  requireAdmin = false,
  fallback = null 
}: AuthGuardProps) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-4">Please log in to access this page.</p>
          <a 
            href="/auth/login" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  if (requireAdmin && !isAdmin) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
          <a 
            href="/" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}