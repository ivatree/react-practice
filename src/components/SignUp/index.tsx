import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice';
import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Form } from '../Form';
import './styles.scss';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';

export function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const moveToLogin = () => {
    navigate('/Login');
  };

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        user.getIdToken().then((token) => {
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: token,
            })
          );
          navigate('/Login');
          alert('Пользователь успешно зарегистрирован!');
        });
      })
      .catch((error) => {
        console.error(error);
        alert(`Ошибка регистрации: ${error.message}`);
      });
  };

  return (
    <div className="signUp-container">
      <h2 className="signUp-header">Регистрация</h2>
      <span>
        У вас есть аккаунт?
        <Button className="switchBtn" onClick={moveToLogin} text="Войти" />
      </span>
      <Form title="Зарегистрироваться" handleClick={handleRegister} />
    </div>
  );
}
