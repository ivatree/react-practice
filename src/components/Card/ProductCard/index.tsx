import React from 'react';
import './styles.scss';

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  onClick: () => void;
  children: React.ReactNode;
}

export default function Card({
  image,
  title,
  description,
  price,
  onClick,
  children,
}: ProductCardProps) {
  return (
    <div className="product-card" onClick={onClick}>
      <div className="product">
        <img className="product-prewie" src={image} alt={title} />
        <h3 className="product-title">{title}</h3>
        <span className="product-description">{description}</span>
        <span className="product-price">от {price.toFixed(2)} руб.</span>
        {children}
      </div>
    </div>
  );
}
