import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice';
import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Form } from '../Form/RegForm';
import './styles.scss';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
export function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const moveToLogin = () => {
    navigate('/Login');
  };

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const token = await user.getIdToken();
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: token,
          })
        );
        try {
          await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
          });
          navigate('/');
          alert('Пользователь успешно зарегистрирован!');
        } catch (error) {
          console.error('Ошибка добавления пользователя в Firestore:', error);
        }
      })
      .catch((error) => {
        console.error('Ошибка регистрации:', error);
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
