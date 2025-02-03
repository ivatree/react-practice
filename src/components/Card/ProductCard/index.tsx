import React from 'react';

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
        <span className="product-title">{title}</span>
        <span className="product-description">{description}</span>
        <span className="product-price">от {price} руб.</span>
        {children}
      </div>
    </div>
  );
}
