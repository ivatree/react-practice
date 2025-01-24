import React from "react";
import { useDispatch } from "react-redux";
import {setUser} from 'store/slices/userSlice'
import {Form} from '../Form/Form'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
    const dispatch =  useDispatch();
    
    const handleLogin = (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(console.log)
            .catch(console.error)
    }

    return (
        <div>
            <Form
                title = 'Войти'
                handleClick = {handleLogin}
            />
        </div>
    )
}