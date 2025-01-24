import Button from "components/Button/Button";
import React, { useState } from "react";
import styles from '../Button/Button.module.css'
import './Form.css'

interface FormProps {
    title: string,
    handleClick: (email: string, password: string) => void;
}

export function Form({title, handleClick}:FormProps)  {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    return(
        <div className="form-container">
            <label>Email:</label>
            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите Email">
            </input>
            <label>Пароль:</label>
            <input 
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Введите пароль">
            </input>
            <div className="btn-container">
                <Button 
                    className={styles.choise} 
                    onClick={() => handleClick(email, pass)} 
                    text={title}>
                </Button>
            </div>
        </div>
    )
}