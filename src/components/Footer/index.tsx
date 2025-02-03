import React from 'react';
import './styles.scss';
import pizzalogo from '../../assets/pizzalogoW.png';

export default function Footer() {
  return (
    <footer>
      <div className="footer-head">
        <img className="logo" src={pizzalogo} alt="logo"></img>
        <span className="footer-logo">REACT PIZZA © 2025</span>
      </div>
      <div className="footer-body">
        <span className="pay-info">Принимаем к оплате</span>
        <a className="footer-infobase" href="">
          Правовая информация
        </a>
        <a href="https://bepaid.by/kak-oplatit">
          <img
            className="pay-icon"
            src="https://cdn.dodostatic.net/site-static/dist/assets/78e07cdb3b918637aad2..png"
            alt="pay-info"
          />
        </a>
      </div>
    </footer>
  );
}
