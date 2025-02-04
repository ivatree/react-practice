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
  CollectionReference,
  Query,
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
const sortByPrice = query(productsRef, orderBy('price'));
const sortByTitle = query(productsRef, orderBy('title'));

interface Card {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

const fetchCards = async (sortingQuery): Promise<Card[]> => {
  const querySnapshot: QuerySnapshot<DocumentData> =
    await getDocs(sortingQuery);
  const cards: Card[] = [];
  querySnapshot.forEach((doc) => {
    cards.push({ id: doc.id, ...(doc.data() as Card) });
  });
  return cards;
};

export default function CardContainer() {
  const [modalActive, setModalActive] = useState(false);
  const navigate = useNavigate();
  const [selectComponent, setSelectComponent] = useState({
    image: '',
    title: '',
    description: '',
    price: 0,
  });
  const [cards, setCards] = useState<Card[]>([]);
  const [sorting, setSorting] = useState<
    Query<DocumentData> | CollectionReference<DocumentData>
  >(productsRef);

  useEffect(() => {
    const updateSorting = () => {
      if (window.location.href.includes('/Price')) {
        setSorting(sortByPrice);
      } else if (window.location.href.includes('/Name')) {
        setSorting(sortByTitle);
      } else {
        setSorting(productsRef);
      }
    };
    updateSorting();
  });

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCards(sorting);
      setCards(data);
    };
    getData();
  }, [sorting]);

  useEffect(() => {
    navigate('/');
  }, [window.location.reload]);

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
    <div className="container">
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
    </div>
  );
}
