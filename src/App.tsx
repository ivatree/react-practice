import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Layout from 'components/Layout/Layout';
import { useDispatch } from 'react-redux';
import { removeUser, setUser } from 'store/slices/userSlice';
import { Modal } from 'components/Modal';
import { SignUp } from 'components/SignUp';
import { Basket } from 'components/Basket/index';
import { Login } from 'components/Login';
import { clearBasket, db } from 'utils/firebase';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import AdminPage from 'pages/admin';
import { doc, getDoc } from 'firebase/firestore';
import CardContainer from 'components/Card/CardContainer';
import Navbar from 'components/Navbar';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [modalActive, setModalActive] = useState(false);
  const [selectComponent, setSelectComponent] = useState({
    image: '',
    title: '',
    description: '',
    price: 0,
    id: '',
  });
  const [sorting, setSorting] = useState('popular');
  const [scrollToCategory, setScrollToCategory] = useState('');
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = {
            email: currentUser.email,
            id: currentUser.uid,
            token: token,
            admin: userDoc.data().admin,
          };
          dispatch(setUser(userData));
          closeModal();
        } else {
          console.error('Документ пользователя не существует');
        }
      } else {
        dispatch(removeUser());
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch]);

  const LogOut = async () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => {
        console.error('Ошибка при выходе!', error);
      });
    await clearBasket();
  };

  const openRegForm = () => {
    setModalActive(true);
    navigate('/SignUp');
  };

  const openBasket = (
    image: string,
    title: string,
    description: string,
    price: number,
    id: string
  ) => {
    setSelectComponent({ image, title, description, price, id });
    setModalActive(true);
    navigate('/Basket');
  };

  const closeModal = () => {
    navigate('/');
    setModalActive(false);
  };

  return (
    <Layout
      openBasket={openBasket}
      openRegForm={openRegForm}
      LogOut={LogOut}
      selectComponent={selectComponent}
    >
      <Navbar
        setSorting={setSorting}
        setScrollToCategory={setScrollToCategory}
      />
      {location.pathname === '/Admin' ? (
        <section className="admin-container">
          <Routes>
            <Route path="/Admin" element={<AdminPage />} />
          </Routes>
        </section>
      ) : (
        <section className="main-container">
          <CardContainer
            sorting={sorting}
            scrollToCategory={scrollToCategory}
          />
        </section>
      )}
      <Modal active={modalActive} closeModal={closeModal}>
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/Basket"
            element={
              <Basket
                isOpen={true}
                closeBasket={closeModal}
                initialItems={[]}
              />
            }
          />
        </Routes>
      </Modal>
    </Layout>
  );
}

export default App;
