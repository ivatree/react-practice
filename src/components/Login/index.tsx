import React, { ReactElement } from 'react';
import { Form } from 'components/Form/RegForm';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './styles.scss';
import Button from 'components/Button';
import { db, replaceGuestBasket } from 'utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import SignUp from 'components/SignUp';

interface LoginProps {
  openModalContent: (content: ReactElement) => void;
}

export function Login({ openModalContent }: LoginProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
            navigate('/');
          } else {
            console.error('Документ пользователя не существует');
          }
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
        <Button className="switchBtn" onClick={moveToSignUp} text="Создать" />
      </span>
      <Form title="Войти" handleClick={handleLogin} />
    </div>
  );
}
