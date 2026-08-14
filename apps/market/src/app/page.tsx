"use client";
import React, { useEffect, useState } from 'react';
import { MarketLayout } from "@/components/layout/MarketLayout";
import { ProductCard } from "@/components/market/ProductCard";
import { Container } from "@shared/ui";
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

  const handleAddToCart = (product: Product) => {
    setCartCount(prev => prev + 1);
    // In a real app, we would call mockMarketApi.addToCart()
  };

  return (
    <MarketLayout>
      <Container>
        <div className="market-hero">
          <h1>Digital Asset Marketplace</h1>
          <p>Discover high-performance tools and services from the PASADIUM ecosystem.</p>
        </div>

        {loading ? (
          <div className="loading-state">Loading Marketplace...</div>
        ) : (
          <div className="product-grid">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            ))}
          </div>
        )}
      </Container>
    </MarketLayout>
  );
}
