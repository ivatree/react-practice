import React, { useEffect, useState } from 'react';
import { Modal } from 'components/Modal';
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Card from 'components/Card/ProductCard';
import './styles.scss';
import Button from 'components/Button';
import CardChange from 'components/Form/ChangeForm';
import AddProduct from 'components/Form/AddingForm';
import {
  addNewProduct,
  deleteProductCard,
  updateProduct,
} from 'utils/firebase';

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
  category: string;
}

const fetchCards = async (): Promise<Card[]> => {
  const querySnapshot = await getDocs(collection(db, 'pizza-card'));
  const cards: Card[] = [];
  querySnapshot.forEach((doc) => {
    cards.push({ id: doc.id, ...(doc.data() as Card) });
  });
  return cards;
};

export default function AdminPage() {
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [selectComponent, setSelectComponent] = useState({
    id: '',
    image: '',
    title: '',
    description: '',
    price: 0,
    category: '',
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
    navigate('/Admin');
  };

  const openAddProductModal = () => {
    setSelectComponent({
      id: '',
      image: '',
      title: '',
      description: '',
      price: 0,
      category: '',
    });
    setIsAddingProduct(true);
    setModalActive(true);
  };

  const openEditProductModal = (
    id: string,
    image: string,
    title: string,
    description: string,
    price: number,
    category: string
  ) => {
    setSelectComponent({ id, image, title, description, price, category });
    setIsAddingProduct(false);
    setModalActive(true);
  };

  const handleAddProductClick = async (
    image: string,
    title: string,
    description: string,
    price: number,
    category: string
  ) => {
    await addNewProduct(image, title, description, price, category);
    const data = await fetchCards();
    setCards(data);
    closeModal();
  };

  const handleSaveProductClick = async (
    id: string,
    image: string,
    title: string,
    description: string,
    price: number,
    category: string
  ) => {
    await updateProduct(id, image, title, description, price, category);
    const data = await fetchCards();
    setCards(data);
    closeModal();
  };

  const handleDeleteProductClick = async (id: string) => {
    await deleteProductCard(id);
    const data = await fetchCards();
    setCards(data);
  };

  return (
    <article className="admin-container">
      <div className="btn-container">
        <Button
          className="addProduct"
          onClick={openAddProductModal}
          text="Добавить продукт"
        />
      </div>
      <div className="product-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            image={card.image}
            title={card.title}
            description={card.description}
            price={card.price}
            onClick={() => ''}
          >
            <div className="cardBtn-container">
              <Button
                className="regBtn"
                onClick={() =>
                  openEditProductModal(
                    card.id,
                    card.image,
                    card.title,
                    card.description,
                    card.price,
                    card.category
                  )
                }
                text="Изменить"
              />
              <Button
                className="addProduct"
                onClick={() => handleDeleteProductClick(card.id)}
                text="Удалить"
              />
            </div>
          </Card>
        ))}
        <Modal active={modalActive} closeModal={closeModal}>
          {isAddingProduct ? (
            <AddProduct handleClick={handleAddProductClick} />
          ) : (
            <CardChange
              id={selectComponent.id}
              image={selectComponent.image}
              title={selectComponent.title}
              description={selectComponent.description}
              price={selectComponent.price}
              category={selectComponent.category}
              handleSave={handleSaveProductClick}
            />
          )}
        </Modal>
      </div>
    </article>
  );
}
