import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (error) {
    return (
      <div className="pdp-error-message">
        Error: {error}
        <button className="pdp-back-button" onClick={() => navigate(-1)}>
          ← Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="pdp-container">
      <button className="pdp-back-button" onClick={() => navigate(-1)}>
        ← Back to Products
      </button>
      {loading ? (
        <LoadingSpinner />
      ) : product ? (
        <div className="pdp-detail-container">
          <div className="pdp-image-container">
            <img
              src={product.image}
              alt={product.title}
              className="pdp-product-image"
              onError={(e) => e.target.src = 'https://via.placeholder.com/600'}
            />
          </div>
          <div className="pdp-info-container">
            <h2 className="pdp-title">{product.title}</h2>
            <p className="pdp-price">${product.price}</p>
            <p className="pdp-category">{product.category}</p>
            <p className="pdp-description">{product.description}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailPage;