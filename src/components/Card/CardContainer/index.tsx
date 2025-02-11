import React, { useEffect, useState, useRef } from 'react';
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
import CardChoice from '../CardChoise';
import CardSection from './CardSection.tsx';

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
  category?: string[];
}

interface CardContainerProps {
  sorting: string;
  scrollToCategory: string;
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

export default function CardContainer({
  sorting,
  scrollToCategory,
}: CardContainerProps) {
  const [modalActive, setModalActive] = useState(false);
  const [selectComponent, setSelectComponent] = useState({
    image: '',
    title: '',
    description: '',
    price: 0,
  });
  const [meatCards, setMeatCards] = useState<Card[]>([]);
  const [spicyCards, setSpicyCards] = useState<Card[]>([]);
  const [vegCards, setVegCards] = useState<Card[]>([]);
  const meatRef = useRef<HTMLDivElement>(null);
  const spicyRef = useRef<HTMLDivElement>(null);
  const vegRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getData = async () => {
      const sortingQuery = sortQueries[sorting];
      const data = await fetchCards(sortingQuery);
      setMeatCards(data.filter((card) => card.category?.includes('meat')));
      setSpicyCards(data.filter((card) => card.category?.includes('spicy')));
      setVegCards(data.filter((card) => card.category?.includes('veg')));
    };
    getData();
  }, [sorting]);

  useEffect(() => {
    if (scrollToCategory === 'meat') {
      meatRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (scrollToCategory === 'spicy') {
      spicyRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (scrollToCategory === 'veg') {
      vegRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollToCategory]);

  const closeModal = () => {
    setModalActive(false);
  };

  const openModal = (
    image: string,
    title: string,
    description: string,
    price: number
  ) => {
    setSelectComponent({ image, title, description, price });
    setModalActive(true);
  };

  return (
    <>
      <article ref={meatRef}>
        <CardSection
          title="Мясные пиццы"
          cards={meatCards}
          openModal={openModal}
        />
      </article>
      <article ref={spicyRef}>
        <CardSection
          title="Острые пиццы"
          cards={spicyCards}
          openModal={openModal}
        />
      </article>
      <article ref={vegRef}>
        <CardSection
          title="Вегетарианские пиццы"
          cards={vegCards}
          openModal={openModal}
        />
      </article>
      <Modal active={modalActive} closeModal={closeModal}>
        <CardChoice {...selectComponent} />
      </Modal>
    </>
  );
}
