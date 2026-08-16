"use client";
import React, { useState } from 'react';
import { Container, Button, Card } from "@pasadium/ui";
import { apiClient, API_CONFIG } from "@pasadium/utils";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    
    // PKCE Implementation
    const state = Math.random().toString(36).substring(7);
    const verifier = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    // For 'plain' method, the challenge is identical to the verifier
    const challenge = verifier; 
    
    localStorage.setItem('pkce_verifier', verifier);
    localStorage.setItem('pkce_state', state);

    const authUrl = `${API_CONFIG.authBaseUrl}/authorize?` + 
      `client_id=web-gateway&` +
      `response_type=code&` +
      `redirect_uri=${encodeURIComponent(window.location.origin + '/login/callback')}&` +
      `code_challenge=${challenge}&` +
      `code_challenge_method=plain&` + 
      `state=${state}`;

    window.location.href = authUrl;
  };

  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Container>
        <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
          <Card>
            <h1 style={{ marginBottom: '24px' }}>Welcome back</h1>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '32px' }}>
              Sign in to access the PASADIUM ecosystem.
            </p>
            <Button 
              variant="primary" 
              onClick={handleLogin} 
              disabled={loading}
              style={{ width: '100%', padding: '16px' }}
            >
              {loading ? 'Connecting...' : 'Sign In with PASADIUM ID'}
            </Button>
            <p style={{ marginTop: '24px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              Secure OIDC / PKCE Authentication
            </p>
          </Card>
        </div>
      </Container>
    </main>
  );
}
