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
import CardSection from './CardSection.tsx';
import CardChoice from '../CardChoise';

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

const createSortQueries = (isAscending: boolean) => ({
  popular: productsRef,
  price: query(productsRef, orderBy('price', isAscending ? 'asc' : 'desc')),
  title: query(productsRef, orderBy('title', isAscending ? 'asc' : 'desc')),
});

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
  isAscending: boolean;
  catName: string;
}

const fetchCards = async (sortingQuery?: any): Promise<Card[]> => {
  const querySnapshot: QuerySnapshot<DocumentData> = sortingQuery
    ? await getDocs(sortingQuery)
    : await getDocs(productsRef);
  const cards: Card[] = [];
  querySnapshot.forEach((doc) => {
    cards.push({ id: doc.id, ...(doc.data() as Card) });
  });
  return cards;
};

export default function CardContainer({
  sorting,
  scrollToCategory,
  isAscending = true,
  catName,
}: CardContainerProps) {
  const [modalActive, setModalActive] = useState(false);
  const [selectComponent, setSelectComponent] = useState({
    image: '',
    title: '',
    description: '',
    price: 0,
  });
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCards();
      setAllCards(data);
      setFilteredCards(data);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const sortingQuery = createSortQueries(isAscending)[sorting];
      const data = await fetchCards(sortingQuery);
      setAllCards(data);
    };
    getData();
  }, [sorting, isAscending]);

  useEffect(() => {
    if (scrollToCategory === 'all') {
      setFilteredCards(allCards);
    } else {
      setFilteredCards(
        allCards.filter((card) => card.category?.includes(scrollToCategory))
      );
    }
  }, [scrollToCategory, allCards]);

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
      <div>
        <CardSection
          title={catName}
          cards={filteredCards}
          openModal={openModal}
        />
      </div>
      <Modal active={modalActive} closeModal={closeModal}>
        <CardChoice {...selectComponent} />
      </Modal>
    </>
  );
}
