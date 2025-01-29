import Button from 'components/Button';
import React, { useEffect, useState } from 'react';
import styles from 'components/Button/Button.module.scss';
import './Basket.scss';
import { getBasket, clearBasket, deleteItem } from 'utils/firebase';
import { AiOutlineClose } from 'react-icons/ai';

interface BasketItem {
  image: string;
  title: string;
  description: string;
  price: number;
}

interface BasketProps {
  isOpen: boolean;
  closebasket: () => void;
  initialItems: BasketItem[];
}

export function Basket({
  isOpen,
  closebasket,
  initialItems = [],
}: BasketProps) {
  const [basketItems, setBasketItems] = useState(initialItems);

  useEffect(() => {
    if (isOpen) {
      const fetchBasket = async () => {
        const fetchItems = await getBasket();
        console.log('Данные получены', fetchItems);
        setBasketItems(fetchItems || []);
      };
      fetchBasket();
    }
  }, [isOpen]);

  const deleteProduct = async (itemToDelete: BasketItem) => {
    await deleteItem(itemToDelete);
    setBasketItems((prevItems) =>
      prevItems.filter((item) => item !== itemToDelete)
    );
  };

  const clearBasketPage = async () => {
    setBasketItems([]);
    await clearBasket();
  };

  const finishBuy = async () => {
    alert('Ваш заказ одобрен');
    setBasketItems([]);
    await clearBasket();
    closebasket();
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
                <div className="item-delete">
                  <Button
                    className={styles.deleteItem}
                    onClick={() => deleteProduct(item)}
                    text={<AiOutlineClose />}
                  />
                </div>
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
              onClick={clearBasketPage}
              text="Очистить"
            />
          </div>
        </div>
      )}
    </div>
  );
}
