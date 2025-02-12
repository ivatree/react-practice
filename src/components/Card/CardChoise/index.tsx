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
  const [selectedSize, setSelectedSize] = useState('25 см');
  const [currentPrice, setCurrentPrice] = useState(props.price);
  const [selectedType, setSelectedType] = useState('Классика');

  const sizePrices = {
    '25 см': props.price,
    '30 см': props.price + 7,
    '35 см': props.price + 12,
  };

  useEffect(() => {
    const fetchBasket = async () => {
      const fetchItems = await getBasket();
      setBasketItem(fetchItems || []);
    };
    fetchBasket();
  }, []);

  useEffect(() => {
    setCurrentPrice(sizePrices[selectedSize]);
  }, [selectedSize]);

  const addToBasket = async () => {
    if (props) {
      const newItem = [
        ...basketItem,
        {
          ...props,
          size: selectedSize,
          price: currentPrice,
          type: selectedType,
        },
      ];
      setBasketItem(newItem);
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
              <input
                type="radio"
                name="value-radio"
                value="25 см"
                checked={selectedSize === '25 см'}
                onChange={(e) => setSelectedSize(e.target.value)}
              />
              <span>25 см</span>
            </label>
            <label>
              <input
                type="radio"
                name="value-radio"
                value="30 см"
                checked={selectedSize === '30 см'}
                onChange={(e) => setSelectedSize(e.target.value)}
              />
              <span>30 см</span>
            </label>
            <label>
              <input
                type="radio"
                name="value-radio"
                value="35 см"
                checked={selectedSize === '35 см'}
                onChange={(e) => setSelectedSize(e.target.value)}
              />
              <span>35 см</span>
            </label>
            <span className="selection"></span>
          </div>
          <div className="type-setting">
            <label className="type-label">
              <input
                className="type-input"
                type="radio"
                name="type-radio"
                value="Классика"
                checked={selectedType === 'Классика'}
                onChange={(e) => setSelectedType(e.target.value)}
              />
              <span>Классика</span>
            </label>
            <label className="type-label">
              <input
                className="type-input"
                type="radio"
                name="type-radio"
                value="Тонкое"
                checked={selectedType === 'Тонкое'}
                onChange={(e) => setSelectedType(e.target.value)}
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
          text={`В корзину ${currentPrice.toFixed(2)} руб.`}
        />
      </div>
    </div>
  );
}
