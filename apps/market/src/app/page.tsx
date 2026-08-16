"use client";
import React, { useEffect, useState } from 'react';
import { AppShell, Button, Card, Container } from "@pasadium/ui";
import { Product } from "@pasadium/api";
import { marketApi } from "@/lib/api-client";

export default function MarketPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await marketApi.getProducts();
        setProducts(data);
      } catch (e) {
        console.error("Failed to load products", e);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleAddToCart = async (product: Product) => {
    try {
      await marketApi.purchaseProduct(product.id);
      setCartCount(prev => prev + 1);
      alert(`${product.name} added to cart!`);
    } catch (e) {
      alert('Purchase failed');
    }
  };

  const navigation = [
    { label: 'Discover', href: '/', active: true },
    { label: 'Categories', href: '/categories' },
    { label: 'Services', href: '/services' },
    { label: 'Assets', href: '/assets' },
    { label: 'Creators', href: '/creators' },
    { label: 'Offers', href: '/offers' },
    { label: 'Transactions', href: '/transactions' },
  ];

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Marketplace...</div>;

  return (
    <AppShell 
      appName="Marketplace" 
      navigation={navigation} 
      user={{ name: 'customer_1', role: 'Client' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <section style={{ textAlign: 'center', padding: '60px 0' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '16px' }}>DISCOVER THE PASADIUM MARKET</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 32px' }}>
            Services, assets and opportunities across the PASADIUM ecosystem.
          </p>
          <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search for services, assets..." 
              style={{ width: '100%', padding: '16px 24px', borderRadius: '32px', backgroundColor: 'var(--color-bg-surface)', color: 'white', border: '1px solid var(--color-border)', fontSize: '1rem' }}
            />
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--color-text-secondary)' }}>FEATURED OFFERINGS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {products.map(product => (
              <Card key={product.id}>
                <div style={{ height: '180px', backgroundColor: 'var(--color-bg-elevated)', borderRadius: '4px', marginBottom: '16px' }}></div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{product.name}</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>{product.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${product.price}</span>
                  <Button 
                    variant="primary" 
                    onClick={() => handleAddToCart(product)}
                    style={{ padding: '8px 16px' }}
                  >
                    View
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
