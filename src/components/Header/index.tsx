import React from 'react';
import './styles.scss';
import pizzalogo from 'assets/pizzalogoB.png';
import Button from 'components/Button/index';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useNavigate } from 'react-router-dom';

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
  selectComponent,
}: HeaderProps) {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  return (
    <header>
      <div className="headerContainer">
        <a href="/" className="containerForLogo">
          <img className="logo" src={pizzalogo} alt="Logo" />
          <h1 className="title">REACT PIZZA</h1>
          <span className="description">самая вкусная пицца во вселенной</span>
        </a>
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
          {user.id && user.admin && (
            <Button
              className="regBtn"
              onClick={() => navigate('/Admin')}
              text={'Админ'}
            />
          )}
          {user.id ? (
            <Button className="regBtn" onClick={LogOut} text={'Выйти'} />
          ) : (
            <Button className="regBtn" onClick={openRegForm} text={'Войти'} />
          )}
        </div>
      </div>
    </header>
  );
}
