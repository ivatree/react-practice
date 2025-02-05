import React, { useEffect, useState } from 'react';
import { Modal } from 'components/Modal';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  getDocs,
  collection,
  query,
  orderBy,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import CardChoice from '../CardChoise';
import Card from '../ProductCard';
import './styles.scss';
import Button from 'components/Button';

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
const productsRef = collection(db, 'pizza-card');

const sortQueries = {
  popular: productsRef,
  price: query(productsRef, orderBy('price')),
  title: query(productsRef, orderBy('title')),
};

interface Card {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

interface CardContainerProps {
  sorting: string;
  setSorting: (option: string) => void;
}

const fetchCards = async (sortingQuery): Promise<Card[]> => {
  if (!sortingQuery) {
    throw new Error('Invalid query');
  }

  const querySnapshot: QuerySnapshot<DocumentData> =
    await getDocs(sortingQuery);
  const cards: Card[] = [];
  querySnapshot.forEach((doc) => {
    cards.push({ id: doc.id, ...(doc.data() as Card) });
  });
  return cards;
};

export default function CardContainer({ sorting }: CardContainerProps) {
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
      const sortingQuery = sortQueries[sorting];
      const data = await fetchCards(sortingQuery);
      setCards(data);
    };
    getData();
  }, [sorting]);

  const closeModal = () => {
    setModalActive(false);
    navigate('/');
  };

  const openModal = (
    image: string,
    title: string,
    description: string,
    price: number
  ) => {
    setSelectComponent({ image, title, description, price });
    setModalActive(true);
    navigate(`/product`);
  };

  return (
    <article className="container">
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
            onClick={() => openModal}
            text="Выбрать"
          />
        </Card>
      ))}
      <Modal active={modalActive} closeModal={closeModal}>
        <CardChoice {...selectComponent} />
      </Modal>
    </article>
  );
}
