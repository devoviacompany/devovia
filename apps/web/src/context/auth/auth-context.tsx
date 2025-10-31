/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useAuth } from "@/hooks";
import { currentUserResponseType } from "@/types/api/app/auth/auth.type";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";

// Define the context shape
type AuthContextType = {
  user?: currentUserResponseType['user'];
  role?: string;
  isRole: (roles: string | string[]) => boolean;
  error: any;
  isLoading: boolean;
  isFetching: boolean;
  isAuthenticated: boolean;
  refetchAuth: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  // Compute the main site origin (strip known dashboard subdomains like admin.)
  const getMainOrigin = () => {
    if (typeof window === 'undefined') return '';
    const { protocol, hostname, port } = window.location;
    // If hostname ends with .localhost -> use localhost; else use last two labels (example.com)
    const parts = hostname.split('.');
    let baseHost = hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      baseHost = hostname;
    } else if (hostname.endsWith('.localhost')) {
      baseHost = 'localhost';
    } else if (parts.length >= 2) {
      baseHost = parts.slice(-2).join('.');
    }
    return `${protocol}//${baseHost}${port ? `:${port}` : ''}`;
  };

  // Fetch current user (with silent refresh)
  const {
    data: authData,
    error: authError,
    isLoading,
    isFetching,
    refetch: refetchAuth,
  } = useAuth();

  const user = authData?.user;
  const isAuthenticated = !!user?._id;
  const role = user?.role;

  // Handle authentication redirects
  useEffect(() => {
    if (authError) {
      const status = (authError as any)?.response?.status;
      if (status === 401) {
        // Unauthorized - redirect to login on main origin
        if (typeof window !== 'undefined') {
          const origin = getMainOrigin();
          window.location.replace(`${origin}/auth/login`);
        }
      } else if (status === 403) {
        // Forbidden - redirect to home on main origin
        if (typeof window !== 'undefined') {
          const origin = getMainOrigin();
          window.location.replace(`${origin}/`);
        }
      }
    }
  }, [authError, router]);

  const isRole = (r: string | string[]) => {
    if (!role) return false;
    return Array.isArray(r) ? r.includes(role) : role === r;
  };

  // Logout function
  const logout = async () => {
    try {
      // Call logout API to clear cookies
      const { logoutMutationFn } = await import("@/services");
      await logoutMutationFn();
      // Redirect to login on main origin (strip dashboard subdomain)
      if (typeof window !== 'undefined') {
        const origin = getMainOrigin();
        window.location.replace(`${origin}/auth/login`);
        return;
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Force redirect even if API call fails
      if (typeof window !== 'undefined') {
        const origin = getMainOrigin();
        window.location.replace(`${origin}/auth/login`);
        return;
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isRole,
        error: authError,
        isLoading,
        isFetching,
        isAuthenticated,
        refetchAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

export const useAuthContextOptional = () => {
  return useContext(AuthContext); // returns undefined if no provider
};