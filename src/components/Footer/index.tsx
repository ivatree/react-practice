import React from 'react';
import './styles.scss';
import pizzalogo from 'assets/pizzalogoW.png';

export default function Footer() {
  return (
    <footer>
      <div className="footer-head">
        <img className="logo" src={pizzalogo} alt="logo"></img>
        <span className="footer-logo">REACT PIZZA © 2025</span>
      </div>
      <div className="footer-body">
        <div className="info-container">
          <h4>Правовая информация:</h4>
          <p>
            <a href="/Rules">Условия использования</a>
          </p>
          <p>
            <a href="#">Политика конфиденциальностия</a>
          </p>
          <p>
            <a href="/About">О нас</a>
          </p>
        </div>
        <div className="contact-container">
          <h4>Связь с нами:</h4>
          <p className="footer-number">Звонок по телефону: 2025</p>
          <p className="footer-email">Email: react-pizza@gmail.com</p>
        </div>
        <div className="pay-container">
          <span className="pay-info">Принимаем к оплате</span>
          <a href="https://bepaid.by/kak-oplatit" className="pay-icon">
            <img
              src="https://cdn.dodostatic.net/site-static/dist/assets/78e07cdb3b918637aad2..png"
              alt="pay-info"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
