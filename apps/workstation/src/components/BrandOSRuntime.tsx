'use client';

import { useEffect } from 'react';
import { initializeBrandOS } from '@pasadium/bridge';
import { useAuthority } from '../hooks/useAuthority';

export const BrandOSRuntime = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthority((state) => state.token);

  useEffect(() => {
    if (token) {
      initializeBrandOS({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000',
        getToken: () => token,
      });
    }
  }, [token]);

  return <>{children}</>;
};
