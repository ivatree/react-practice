import Button from 'components/Button';
import React, { useEffect, useState } from 'react';
import styles from 'components/Button/Button.module.scss';
import './Basket.scss';

interface BasketProps {
  image: string;
  title: string;
  description: string;
  price: number;
}

export function Basket({ image, title, description, price }: BasketProps) {
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    const storedItems =
      JSON.parse(localStorage.getItem('selected-cards')) || [];
    setBasketItems(storedItems);
  }, []);

  const clearBasket = () => {
    localStorage.clear();
    window.location.reload();
  };

  const finishBuy = () => {
    localStorage.clear();
    alert('Ваш заказ одобрен');
    window.location.reload();
  };

  const getTotalPrice = () => {
    const total = basketItems.reduce((total, item) => total + item.price, 0);
    return total.toFixed(2);
  };

  return (
    <div>
      {basketItems.length === 0 ? (
        <div className="basket-container">
          <div className="basket-head">
            <h2 className="basket-title">Корзина</h2>
          </div>
          <div className="basket-body">
            <h3 className="basket-message">Корзина пустая</h3>
          </div>
        </div>
      ) : (
        <div className="basket-container">
          <div className="basket-head">
            <h2 className="basket-title">Корзина</h2>
          </div>
          <div className="basket-body">
            {basketItems.map((item, index) => (
              <div key={index} className="basket-item">
                <img className="item-image" src={item.image} alt={item.title} />
                <h3 className="item-title">{item.title}</h3>
                <span className="item-description">{item.description}</span>
                <h4 className="item-price">Цена {item.price} руб.</h4>
              </div>
            ))}
          </div>
          <div className="btn-container">
            <Button
              className={styles.regBtn}
              onClick={finishBuy}
              text={`Заказать: ${getTotalPrice()} руб.`}
            />
            <Button
              className={styles.addPizza}
              onClick={clearBasket}
              text="Очистить"
            />
          </div>
        </div>
      )}
    </div>
  );
}
