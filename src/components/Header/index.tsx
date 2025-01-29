import React, { useEffect, useState } from 'react';
import './Header.scss';
import pizzaLogo from './pizzaLogo.png';
import Button from '../Button';
import styles from '../Button/Button.module.scss';
import { Modal } from '../Modal';
import { SignUp } from 'components/SignUp';
import { Basket } from 'components/Basket/index';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from 'components/Login';

export default function Header() {
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [selectComponent, setSelectComponent] = useState({
    image: '',
    title: '',
    description: '',
    price: 0,
    id: '',
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsUser(true);
    }
  }, []);

  const LogOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  const openRegForm = () => {
    setModalActive(true);
    navigate('/SignUp');
  };

  const openBasket = (
    image: string,
    title: string,
    description: string,
    price: number,
    id: string
  ) => {
    setSelectComponent({ image, title, description, price, id });
    setModalActive(true);
    navigate('/Basket');
  };

  const closeModal = () => {
    navigate('/');
    setModalActive(false);
  };

  return (
    <>
      <header>
        <div className="headerContainer">
          <div className="containerForLogo">
            <img className="logo" src={pizzaLogo} alt="Logo" />
            <span className="title">REACT PIZZA</span>
            <span className="description">
              самая вкусная пицца во вселенной
            </span>
          </div>
          <div className="containerForBtn">
            <Button
              className={styles.regBtn}
              onClick={() =>
                openBasket(
                  selectComponent.image,
                  selectComponent.title,
                  selectComponent.description,
                  selectComponent.price,
                  selectComponent.id
                )
              }
              text={'КОРЗИНА'}
            />
            {isUser ? (
              <Button
                className={styles.regBtn}
                onClick={LogOut}
                text={'Выйти'}
              />
            ) : (
              <Button
                className={styles.regBtn}
                onClick={openRegForm}
                text={'РЕГИСТРАЦИЯ'}
              />
            )}
          </div>
        </div>
        <Modal active={modalActive} closeModal={closeModal}>
          <Routes>
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Login" element={<Login />} />
            <Route
              path="/Basket"
              element={
                <Basket
                  image={selectComponent.image}
                  title={selectComponent.title}
                  description={selectComponent.description}
                  price={selectComponent.price}
                />
              }
            />
          </Routes>
        </Modal>
      </header>
    </>
  );
}
