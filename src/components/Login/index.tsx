import React, { ReactElement, useState } from 'react';
import { Form } from 'components/Form/RegForm';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import './styles.scss';
import Button from 'components/Button';
import { auth, db, replaceGuestBasket } from 'utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import SignUp from 'components/SignUp';
import { log } from 'console';

interface LoginProps {
  openModalContent: (content: ReactElement) => void;
}

export function Login({ openModalContent }: LoginProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const moveToSignUp = () => {
    openModalContent(<SignUp openModalContent={openModalContent} />);
    navigate('/SignUp');
  };

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        user.getIdToken().then(async (token) => {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = {
              email: user.email,
              id: user.uid,
              token: token,
              admin: userDoc.data().admin,
            };
            dispatch(setUser(userData));
            await replaceGuestBasket(user.uid);
          } else {
            console.error('Документ пользователя не существует');
          }
        });
      })
      .catch((error) => {
        console.error(error);
        alert(`Ошибка авторизации: ${error.message}`);
      });
  };

  const ResetPassword = async (email: string) => {
    if (!email) {
      setError('Введите email для сброса пароля');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('1');
    } catch (error) {
      setError(`Ошибка при сбросе пароля: ${error.message}`);
      console.error(`Ошибка при сбросе пароля: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Авторизация</h2>
      <span>
        Нет аккаунта?
        <Button className="switchBtn" onClick={moveToSignUp} text="Создать" />
      </span>
      <span>
        Забыли пароль?
        <Button
          text="Сброс пароля"
          className="switchBtn"
          onClick={() => ResetPassword}
        />
      </span>
      <Form title="Войти" handleClick={handleLogin} />
    </div>
  );
}
