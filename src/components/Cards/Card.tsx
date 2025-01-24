import React, {useState} from 'react'
import Button from '../Button/Button'
import styles from '../Button/Button.module.css'
import './Card.css'
import { Modal } from '../Modal/Modal'
import { Basket } from 'components/Basket/Basket'

export default function Card() {
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
        <div className='pizza-card' onClick={() => openModal(<Basket/>)}>
            <img className="pizza-prewie" src="https://media.dodostatic.net/image/r:584x584/11efa1eecbfe557d92cd312e3b438dae.avif" alt="Pizza-prewie"/>
            <span className="pizza-title">Кола-барбекю </span>
            <span className="pizza-description">
            Пряная говядина, пикантная пепперони, острые колбаски чоризо, соус кола-барбекю, моцарелла и фирменный томатный соус
            </span>
            <div className="pizza-add-container">
                <span className="pizza-price">от 22,99 руб.</span>
                <Button className={styles.addPizza} onClick={() => openModal(<Basket/>)} text={"Выбрать"} />            
            </div>
        </div>            
           <Modal active={modalActive} closeModal={closeModal}>
                {selectComponent}
            </Modal>    </>
    )
}