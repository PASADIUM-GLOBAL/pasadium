'use client';

import React, { createContext, useContext, useMemo, useState, useRef, useEffect } from 'react';
import { createBrandOSClient, BrandOSClient } from '@pasadium/bridge';

interface AuthContextValue {
  bridge: BrandOSClient;
  setToken: (t: string | null) => void;
  token: string | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const tokenRef = useRef<string | null>(null);

  // SSR-Safe Token Provider utilizing the ref for instant resolution
  const getToken = () => {
    if (tokenRef.current) return tokenRef.current;
    if (typeof window !== 'undefined') {
      return localStorage.getItem('svrn_token');
    }
    return null;
  };

  const setToken = (newToken: string | null) => {
    tokenRef.current = newToken;
    setTokenState(newToken);
    if (typeof window !== 'undefined') {
      newToken ? localStorage.setItem('svrn_token', newToken) : localStorage.removeItem('svrn_token');
    }
  };

  // Hydrate state on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('svrn_token');
      if (savedToken) {
        tokenRef.current = savedToken;
        setTokenState(savedToken);
      }
    }
  }, []);

  // P0: The only instance allowed in the Workstation, using a stable ref for credentials
  const bridge = useMemo(() => 
    createBrandOSClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000', getToken), 
    [] 
  );

  return (
    <AuthContext.Provider value={{ 
      bridge, 
      setToken, 
      token, 
      isAuthenticated: !!token 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
