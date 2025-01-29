import React, { useEffect, useState } from 'react';
import Button from '../Button';
import styles from '../Button/Button.module.scss';
import './Card.scss';
import { Modal } from '../Modal';
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import CardChoise from './CardChoise';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BACKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface Card {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

const fetchCards = async (): Promise<Card[]> => {
  const querySnapshot = await getDocs(collection(db, 'pizza-card'));
  const cards: Card[] = [];
  querySnapshot.forEach((doc) => {
    cards.push({ id: doc.id, ...(doc.data() as Card) });
  });
  return cards;
};

export default function Card() {
  const [modalActive, setModalActive] = useState(false);
  const navigate = useNavigate();

  const [selectComponent, setSelectComponent] = useState({
    image: '',
    title: '',
    description: '',
    price: 0,
  });
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCards();
      setCards(data);
    };
    getData();
  }, []);

  const closeModal = () => {
    setModalActive(false);
    navigate('/');
  };

  const openModal = (
    image: string,
    title: string,
    description: string,
    price: number,
    id: string
  ) => {
    setSelectComponent({ image, title, description, price, id });
    setModalActive(true);
    navigate(`/product/${id}`);
  };

  return (
    <>
      {cards.map((card) => (
        <div
          key={card.id}
          className="pizza-card"
          onClick={() =>
            openModal(
              card.image,
              card.title,
              card.description,
              card.price,
              card.id
            )
          }
        >
          <img className="pizza-prewie" src={card.image} alt={card.title} />
          <span className="pizza-title">{card.title}</span>
          <span className="pizza-description">{card.description}</span>
          <div className="pizza-add-container">
            <span className="pizza-price">от {card.price} руб.</span>
            <Button
              className={styles.addPizza}
              onClick={() =>
                openModal(
                  card.image,
                  card.title,
                  card.description,
                  card.price,
                  card.id
                )
              }
              text={'Выбрать'}
            />
          </div>
        </div>
      ))}
      <Modal active={modalActive} closeModal={closeModal}>
        <CardChoise
          image={selectComponent.image}
          title={selectComponent.title}
          description={selectComponent.description}
          price={selectComponent.price}
          id={selectComponent.id}
        />
      </Modal>
    </>
  );
}
