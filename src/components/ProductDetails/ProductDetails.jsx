import React from 'react';
import './ProductDetails.css';

export default function ProductDetails({ product, onClose }) {
  if (!product) return null;

  const {
    name,
    description,
    price,
    salePrice,
    onSale,
    images,
    category,
    color,
    stock,
  } = product;

  return (
    <div className="product-details-overlay">
      <div className="product-details">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="product-image">
          <img src={images[0]} alt={name} />
        </div>
        <div className="product-info">
          <h2>{name}</h2>
          <p className="description">{description}</p>
          <p className="category">קטגוריה: {category?.join(', ')}</p>
          {color && <p className="color">צבע: {color}</p>}
          <p className="stock">מלאי: {stock}</p>
          <p className="price">
            {onSale ? (
              <>
                <span className="original-price">{price} ₪</span>
                <span className="sale-price">{salePrice} ₪</span>
              </>
            ) : (
              <span>{price} ₪</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
