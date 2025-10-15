"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Lock, AlertTriangle, CheckCircle } from 'lucide-react';
import { getSecureToken, validateSession, removeSecureToken, UserSession } from '@/lib/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: 'consultant' | 'user';
  redirectTo?: string;
}

interface AuthStatus {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserSession | null;
  error: string | null;
}

export default function AuthGuard({
  children,
  requireAuth = true,
  requiredRole,
  redirectTo = '/login'
}: AuthGuardProps) {
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null
  });

  useEffect(() => {
    validateUserSession();
  }, []);

  const validateUserSession = async () => {
    try {
      setAuthStatus(prev => ({ ...prev, isLoading: true, error: null }));

      const token = getSecureToken();

      if (!token) {
        if (requireAuth) {
          setAuthStatus({
            isAuthenticated: false,
            isLoading: false,
            user: null,
            error: 'No authentication token found'
          });
          return;
        } else {
          setAuthStatus({
            isAuthenticated: false,
            isLoading: false,
            user: null,
            error: null
          });
          return;
        }
      }

      const sessionValidation = validateSession(token);

      if (!sessionValidation.isValid || !sessionValidation.user) {
        // Invalid session, clear token
        removeSecureToken();

        if (requireAuth) {
          setAuthStatus({
            isAuthenticated: false,
            isLoading: false,
            user: null,
            error: sessionValidation.error || 'Invalid session'
          });
          return;
        } else {
          setAuthStatus({
            isAuthenticated: false,
            isLoading: false,
            user: null,
            error: null
          });
          return;
        }
      }

      // Check role requirements
      if (requiredRole && sessionValidation.user.role !== requiredRole) {
        setAuthStatus({
          isAuthenticated: true,
          isLoading: false,
          user: sessionValidation.user,
          error: `Access denied. Required role: ${requiredRole}`
        });
        return;
      }

      // Check session expiry
      if (sessionValidation.user.expiresAt && new Date() > sessionValidation.user.expiresAt) {
        removeSecureToken();
        setAuthStatus({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          error: 'Session expired'
        });
        return;
      }

      // Valid session
      setAuthStatus({
        isAuthenticated: true,
        isLoading: false,
        user: sessionValidation.user,
        error: null
      });

    } catch (error) {
      console.error('Session validation error:', error);
      removeSecureToken();
      setAuthStatus({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: 'Session validation failed'
      });
    }
  };

  const handleLogin = () => {
    router.push(redirectTo);
  };

  const handleRetry = () => {
    validateUserSession();
  };

  // Loading state
  if (authStatus.isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Validating Session</h2>
          <p className="text-slate-600">Checking your authentication status...</p>
        </Card>
      </div>
    );
  }

  // Not authenticated and auth required
  if (requireAuth && !authStatus.isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="h-8 w-8 text-red-600" />
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-4">Authentication Required</h2>

          <p className="text-slate-600 mb-6">
            {authStatus.error === 'Session expired'
              ? 'Your session has expired. Please sign in again to continue.'
              : 'You need to be signed in to access this page.'
            }
          </p>

          {authStatus.error && authStatus.error !== 'No authentication token found' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <p className="text-sm text-red-700">{authStatus.error}</p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={handleLogin}
              className="w-full"
              style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)', color: 'white'}}
            >
              Sign In
            </Button>

            {authStatus.error && authStatus.error !== 'No authentication token found' && (
              <Button
                onClick={handleRetry}
                variant="outline"
                className="w-full"
              >
                Retry
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  }

  // Role access denied
  if (authStatus.isAuthenticated && authStatus.error?.includes('Access denied')) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-orange-600" />
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-4">Access Denied</h2>

          <p className="text-slate-600 mb-4">
            You don't have permission to access this page.
          </p>

          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg mb-6">
            <p className="text-sm text-orange-700">{authStatus.error}</p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => router.push('/dashboard')}
              className="w-full"
              style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)', color: 'white'}}
            >
              Go to Dashboard
            </Button>

            <Button
              onClick={() => {
                removeSecureToken();
                router.push('/login');
              }}
              variant="outline"
              className="w-full"
            >
              Sign Out
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Authenticated or no auth required - show children with user context
  return (
    <AuthContext.Provider value={authStatus}>
      {children}
    </AuthContext.Provider>
  );
}

// Auth context for accessing user data in components
export const AuthContext = React.createContext<AuthStatus>({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null
});

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthGuard');
  }
  return context;
};

// Security status indicator component
export function SecurityStatus() {
  const auth = useAuth();

  if (!auth.isAuthenticated || !auth.user) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 rounded-full">
        <CheckCircle className="h-3 w-3 text-green-600" />
        <span className="text-green-700 font-medium">Secure</span>
      </div>
      <span className="text-slate-500">
        Session expires: {auth.user.expiresAt ? new Date(auth.user.expiresAt).toLocaleTimeString() : 'Never'}
      </span>
    </div>
  );
}
