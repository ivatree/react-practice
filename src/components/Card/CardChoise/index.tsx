import Button from 'components/Button';
import styles from 'components/Button/Button.module.scss';
import React from 'react';
import './styles.scss';

interface BasketProps {
  image: string;
  title: string;
  description: string;
  price: number;
}

export default function CardChoise({
  image,
  title,
  description,
  price,
}: BasketProps) {
  const addToBasket = () => {
    const selectedCard = { image, title, description, price, id };
    const existingCards = JSON.parse(
      localStorage.getItem('selected-cards') || '[]'
    );
    existingCards.push(selectedCard);
    localStorage.setItem('selected-cards', JSON.stringify(existingCards));
  };

  return (
    <div className="prewiew-container">
      <div className="prewiew-body">
        <img className="card-image" src={image} alt={title} />
        <h3 className="card-title">{title}</h3>
        <span className="card-description">{description}</span>
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
          className={styles.addPizza}
          onClick={addToBasket}
          text={`В корзину ${price} руб.`}
        />
      </div>
    </div>
  );
}
