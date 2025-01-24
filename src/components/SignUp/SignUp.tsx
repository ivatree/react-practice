import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from 'store/slices/userSlice'
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import {Form} from '../Form/Form'
import './SignUp.css'

export function SignUp() {
    const dispatch =  useDispatch();
    
    const handleRegister = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword (auth, email, password)
            .then(console.log)
            .catch(console.error)
    }
    
    return (
        <div className="signUp-container">
            <p className="signUp-header">Регистрация</p>
            <Form
                title = 'Зарегистрироваться'
                handleClick = {handleRegister}
            />
        </div>
    )
}
