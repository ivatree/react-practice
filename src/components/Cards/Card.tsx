import React from 'react'
import Button from '../Button/Button'

export default function Card() {

    const click = () => {
        console.log('cliked')
    }

    return (
        <div className="card-container">
            <img className="pizza-prewie" src="" alt="Pizza-prewie"/>
            <span className="pizza-title"></span>
            <div className="pizza-settings">

            </div>
            <span className="pizza-price"></span>
            <Button className={"sadas"} onClick={click} text={"+ Добавить"}/>
        </div>
    )
}