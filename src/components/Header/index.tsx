import React from 'react';
import './styles.scss';
import pizzalogo from '../../assets/pizzalogoB.png';
import Button from '../Button/index';

interface HeaderProps {
  openBasket: (
    image: string,
    title: string,
    description: string,
    price: number,
    id: string
  ) => void;
  openRegForm: () => void;
  LogOut: () => void;
  isUser: boolean;
  selectComponent: {
    image: string;
    title: string;
    description: string;
    price: number;
    id: string;
  };
}

export default function Header({
  openBasket,
  openRegForm,
  LogOut,
  isUser,
  selectComponent,
}: HeaderProps) {
  return (
    <header>
      <div className="headerContainer">
        <div className="containerForLogo">
          <img className="logo" src={pizzalogo} alt="Logo" />
          <span className="title">REACT PIZZA</span>
          <span className="description">самая вкусная пицца во вселенной</span>
        </div>
        <div className="containerForBtn">
          <Button
            className="regBtn"
            onClick={() =>
              openBasket(
                selectComponent.image,
                selectComponent.title,
                selectComponent.description,
                selectComponent.price,
                selectComponent.id
              )
            }
            text={'Корзина'}
          />
          {isUser ? (
            <Button className="regBtn" onClick={LogOut} text={'Выйти'} />
          ) : (
            <Button
              className="regBtn"
              onClick={openRegForm}
              text={'Регистрация'}
            />
          )}
        </div>
      </div>
    </header>
  );
}
