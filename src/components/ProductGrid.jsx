import React from 'react';
import ProductCard from './ProductCard';
import '../styles.css';

const ProductGrid = ({ products, onProductClick }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;