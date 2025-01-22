import React from 'react'
import "./Navbar.css"
import Button from '../Button/Button';
import styles from '../Button/Button.module.css'

export default function Navbar() {

    const handleClick = () => {
        console.log("clicked")
    }

    return(
        <nav className="settings-container">
            <div className="choise-container">
            <Button className={styles.choise} onClick={handleClick} text={"Все"}/>
            <Button className={styles.choise} onClick={handleClick} text={"Мясные"}/>
            <Button className={styles.choise} onClick={handleClick} text={"Вегетарианские"}/>
            <Button className={styles.choise} onClick={handleClick} text={"Гриль"}/>
            <Button className={styles.choise} onClick={handleClick} text={"Острые"}/>
            </div>
            <div className="dropdown-settings">
                
            </div>            
        </nav>
    )
}