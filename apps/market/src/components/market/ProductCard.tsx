import React from 'react';
import { Card, Button } from "@pasadium/ui";
import { Product } from "@pasadium/api";

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="product-card">
      <div className="product-image-placeholder">
        {product.image}
      </div>
      <div className="product-info">
        <span className="category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="price">${product.price}</span>
          <Button variant="primary" onClick={() => onAddToCart(product)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
}
