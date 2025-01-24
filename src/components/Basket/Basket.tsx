import React from "react";
import Button from '../Button/Button'
import Styles from '../Button/Button.module.css'
import './Basket.css'

export function Basket(){
    return(
        <div className="basket-container">
            <div className='basket-header'>
                <span className='basket-title'>Корзина</span>
            </div>
            <div className='basket-body'>
                <span>Ваша корзина пуста</span>
            </div>
            <div className='basket-footer'>
                <Button 
                    className={Styles.accepting} 
                    onClick={() => console.log('')}
                    text={'Подтвердить'}
                />
            </div>
        </div>
    )
}