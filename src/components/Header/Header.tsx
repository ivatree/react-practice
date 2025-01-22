import React from 'react';
import './Header.css';
import pizzaLogo from './pizzaLogo.png';
import Button from '../Button/Button';
import styles from '../Button/Button.module.css';

export default function Header() {

    const handleClick = () => {
        console.log("clicked")
    }

    return (
    <>
        <header>
            <div className="headerContainer">
                <div className="containerForLogo">
                    <img className="logo" src={pizzaLogo} alt="Logo"/>
                    <span className="title">REACT PIZZA</span>
                    <span className="description">самая вкусная пицца во вселенной</span>
                </div>
                <Button className={styles.regBtn} onClick={handleClick} text={"РЕГИСТРАЦИЯ"} />            </div>
        </header>
    </>
    )
}
