import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles.css';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="plp-error-message">
        Error: {error}
        <button className="plp-error-button" onClick={() => navigate('/')}>
          ← Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="plp-container">
      <h1>Product Catalog</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="plp-grid">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="plp-product-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="plp-image-container">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="plp-product-image"
                  onLoad={() => {}}
                  onError={(e) => e.target.src = 'https://via.placeholder.com/300'} 
                />
              </div>
              <div className="plp-product-info">
                <h3 className="plp-product-title">{product.title}</h3>
                <p className="plp-product-price">${product.price}</p>
                <p className="plp-product-category">{product.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListPage;