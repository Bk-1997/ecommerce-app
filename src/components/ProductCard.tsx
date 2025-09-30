import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isMobile = window.innerWidth <= 768;
  
  const cardStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: isMobile ? '0.8rem' : '1rem',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: isMobile ? '150px' : '200px',
    objectFit: 'contain',
    marginBottom: '1rem'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: isMobile ? '1rem' : '1.1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.3'
  };

  const priceStyle: React.CSSProperties = {
    fontSize: isMobile ? '1.1rem' : '1.2rem',
    fontWeight: 'bold',
    color: '#e74c3c',
    marginTop: 'auto'
  };

  const ratingStyle: React.CSSProperties = {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const starStyle: React.CSSProperties = {
    color: '#f39c12'
  };

  return (
    <Link 
      to={`/product/${product.id}/details`} 
      style={cardStyle}
      onMouseEnter={(e) => {
        const target = e.currentTarget as HTMLElement;
        target.style.transform = 'translateY(-4px)';
        target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as HTMLElement;
        target.style.transform = 'translateY(0)';
        target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
      }}
    >
      <img 
        src={product.image} 
        alt={product.title} 
        style={imageStyle}
        loading="lazy"
      />
      <h3 style={titleStyle}>{product.title}</h3>
      <div style={ratingStyle}>
        <span style={starStyle}>★</span>
        <span>{product.rating.rate}</span>
        <span>({product.rating.count} reviews)</span>
      </div>
      <div style={priceStyle}>${product.price.toFixed(2)}</div>
    </Link>
  );
};

export default ProductCard;