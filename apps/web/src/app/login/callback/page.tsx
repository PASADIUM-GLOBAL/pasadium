"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from "@shared/utils";
import { API_CONFIG } from "@shared/utils";

export default function LoginCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const state = params.get('state');
      const storedState = localStorage.getItem('pkce_state');
      const verifier = localStorage.getItem('pkce_verifier');

      if (!code || !verifier || state !== storedState) {
        console.error('Authentication failed: invalid state or missing code');
        router.push('/login?error=auth_failed');
        return;
      }

      try {
        const response = await fetch(`${API_CONFIG.authBaseUrl}/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            code_verifier: verifier,
            client_id: 'web-gateway',
          }),
        });

        const data = await response.json();
        if (data.access_token) {
          apiClient.setToken(data.access_token);
          localStorage.removeItem('pkce_verifier');
          localStorage.removeItem('pkce_state');
          router.push('/');
        } else {
          throw new Error('Failed to retrieve access token');
        }
      } catch (err) {
        console.error('Token exchange failed', err);
        router.push('/login?error=token_failed');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Completing Authentication...</h2>
        <p>Please wait while we secure your session.</p>
      </div>
    </div>
  );
}
