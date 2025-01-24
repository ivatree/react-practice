import React, {useState} from 'react'
import "./Navbar.css"
import Button from '../Button/Button';
import styles from '../Button/Button.module.css'
import { Menu } from '../DdMenu/Menu';
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";


export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(false)
    const [selectedOption, setSelectedOption] = useState('popular');

    const arrow = openMenu ? <AiOutlineCaretUp /> : <AiOutlineCaretDown/>;

    const options: { [key: string]: string } = {
        popular: 'популярности',
        cost: 'цене',
        alphabet: 'алфавиту'
    };

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
        setOpenMenu(false);
    };

    return(
        <>
            <nav className="settings-container">
                <div className="choise-container">
                <Button className={styles.choise} onClick={() => console.log("clicked")} text={"Все"}/>
                <Button className={styles.choise} onClick={() => console.log("clicked")} text={"Мясные"}/>
                <Button className={styles.choise} onClick={() => console.log("clicked")} text={"Вегетарианские"}/>
                <Button className={styles.choise} onClick={() => console.log("clicked")} text={"Гриль"}/>
                <Button className={styles.choise} onClick={() => console.log("clicked")} text={"Острые"}/>
                </div>
                <div className="sort-settings">
                <Button 
                    className={styles.openSort} 
                    onClick={() => setOpenMenu((prev: boolean) => !prev)} 
                    text={<>{arrow} Сортировка по: <span className="selected-option">{options[selectedOption]}</span></>}>
                    </Button>
                </div>            
            </nav>
            {
               openMenu && <Menu selectedOption={selectedOption} options={options} onOptionChange={handleOptionChange} />
            }
        </>
    )
}