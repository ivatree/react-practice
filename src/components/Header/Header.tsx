import React, {useState} from 'react';
import './Header.css';
import pizzaLogo from './pizzaLogo.png';
import Button from '../Button/Button';
import styles from '../Button/Button.module.css';
import { Modal } from '../Modal/Modal';
import { Basket } from 'components/Basket/Basket';
import { SignUp } from 'components/SignUp/SignUp';

export default function Header() {
    const [modalActive, setModalActive] = useState(false)
    const [selectComponent, setSelectComponent] = useState(null)

    const openModal = (component) => {
        setSelectComponent(component);
        setModalActive(true);
    }

    const closeModal = () => {
        setSelectComponent(null);
        setModalActive(false);
    };

    return (
    <>
        <header>
            <div className="headerContainer">
                <div className="containerForLogo">
                    <img className="logo" src={pizzaLogo} alt="Logo"/>
                    <span className="title">REACT PIZZA</span>
                    <span className="description">самая вкусная пицца во вселенной</span>
                </div>
                <div className='containerForBtn'>
                    <Button className={styles.regBtn} onClick={() => openModal(<Basket/>)} text={"КОРЗИНА"} />            
                    <Button className={styles.regBtn} onClick={() => openModal(<SignUp/>)} text={"РЕГИСТРАЦИЯ"} />            
                </div>
            </div>
            <Modal active={modalActive} closeModal={closeModal}>
                {selectComponent}
            </Modal>
        </header>
    </>
    )
}
