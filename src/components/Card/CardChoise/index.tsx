import Button from 'components/Button';
import React, { useEffect, useState } from 'react';
import './styles.scss';
import { getBasket, saveBasket } from 'utils/firebase';

interface BasketProps {
  image: string;
  title: string;
  description: string;
  price: number;
}

export default function CardChoice({ ...props }: BasketProps) {
  const [basketItem, setBasketItem] = useState([]);

  useEffect(() => {
    const fetchBasket = async () => {
      const fetchItems = await getBasket();
      setBasketItem(fetchItems || []);
    };
    fetchBasket();
  }, []);

  const addToBasket = async () => {
    if (props) {
      const newItem = [...basketItem, props];
      setBasketItem(newItem);
      console.log('Данные корзины сохранены', newItem);
      await saveBasket(newItem);
    }
  };

  return (
    <div className="prewiew-container">
      <div className="prewiew-body">
        <img className="card-image" src={props.image} alt={props?.title} />
        <h3 className="card-title">{props.title}</h3>
        <span className="card-description">{props.description}</span>
        <div className="card-settings">
          <div className="size-input">
            <label>
              <input type="radio" name="value-radio" value="value-1" />
              <span>25 см</span>
            </label>
            <label>
              <input type="radio" name="value-radio" value="value-2" />
              <span>30 см</span>
            </label>
            <label>
              <input type="radio" name="value-radio" value="value-3" />
              <span>35 см</span>
            </label>
            <span className="selection"></span>
          </div>
          <div className="type-setting">
            <label className="type-label">
              <input
                className="type-input"
                type="radio"
                name="value-radio"
                value="value-4"
              />
              <span>Классика</span>
            </label>
            <label className="type-label">
              <input
                className="type-input"
                type="radio"
                name="value-radio"
                value="value-5"
              />
              <span>Тонкое</span>
            </label>
            <span className="type-selection"></span>
          </div>
        </div>
      </div>
      <div className="prewiew-footer">
        <Button
          className="addProduct"
          onClick={addToBasket}
          text={`В корзину ${props.price} руб.`}
        />
      </div>
    </div>
  );
}
