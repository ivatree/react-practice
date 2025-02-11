import React from 'react';
import Button from 'components/Button';
import Card from 'components/Card/ProductCard';
import './styles.scss';

interface Card {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

interface CardSectionProps {
  title: string;
  cards: Card[];
  openModal: (
    image: string,
    title: string,
    description: string,
    price: number
  ) => void;
}

const CardSection: React.FC<CardSectionProps> = ({
  title,
  cards,
  openModal,
}) => {
  return (
    <>
      <h2 className="type-title">{title}</h2>
      <article className="type-section">
        {cards.map((card) => (
          <Card
            key={card.id}
            image={card.image}
            title={card.title}
            description={card.description}
            price={card.price}
            onClick={() =>
              openModal(card.image, card.title, card.description, card.price)
            }
          >
            <Button
              className="addProduct"
              onClick={() =>
                openModal(card.image, card.title, card.description, card.price)
              }
              text="Выбрать"
            />
          </Card>
        ))}
      </article>
    </>
  );
};

export default CardSection;
