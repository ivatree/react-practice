import React from 'react';
import { Form } from '../Form';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './Login.scss';
import Button from 'components/Button';
import styles from '../Button/Button.module.scss';

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const moveToSignUp = () => {
    navigate('/SignUp');
  };

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        user.getIdToken().then((token) => {
          const userData = {
            email: user.email,
            id: user.uid,
            token: token,
          };
          dispatch(setUser(userData));
          localStorage.setItem('user', JSON.stringify(userData));
          window.location.reload();
        });
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
        alert(`Ошибка авторизации: ${error.message}`);
      });
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Авторизация</h2>
      <span>
        Нет аккаунта?
        <Button
          className={styles.switchBtn}
          onClick={moveToSignUp}
          text="Создать"
        />
      </span>
      <Form title="Войти" handleClick={handleLogin} />
    </div>
  );
}
