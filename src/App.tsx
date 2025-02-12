import React, { ReactElement, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Layout from 'components/Layout/Layout';
import { useDispatch } from 'react-redux';
import { removeUser, setUser } from 'store/slices/userSlice';
import { Modal } from 'components/Modal';
import SignUp from 'components/SignUp';
import { Basket } from 'components/Basket/index';
import { clearBasket, db } from 'utils/firebase';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import AdminPage from 'pages/admin';
import { doc, getDoc } from 'firebase/firestore';
import CardContainer from 'components/Card/CardContainer';
import Navbar from 'components/Navbar';
import Button from 'components/Button';
import { AiOutlineCaretUp } from 'react-icons/ai';
import AboutPage from 'pages/infoPage/about';
import { Login } from 'components/Login';
import RulesPage from 'pages/infoPage/rules';
import PoliticsPage from 'pages/infoPage/polit';

function App() {
  const dispatch = useDispatch();
  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState<ReactElement | null>(null);
  const [sorting, setSorting] = useState('popular');
  const [scrollToCategory, setScrollToCategory] = useState('');
  const auth = getAuth();
  const [showButton, setShowButton] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectComponent, setSelectComponent] = useState({
    image: '',
    title: '',
    description: '',
    price: 0,
    id: '',
  });

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
        navigate('/');
      })
      .catch((error) => {
        console.error('Ошибка при выходе!', error);
      });
    await clearBasket();
  };

  const openModalContent = (content: ReactElement) => {
    setModalContent(content);
    setModalActive(true);
  };

  const openRegForm = () => {
    openModalContent(<SignUp openModalContent={openModalContent} />);
  };

  const openBasket = (
    image: string,
    title: string,
    description: string,
    price: number,
    id: string
  ) => {
    setSelectComponent({ image, title, description, price, id });
    openModalContent(
      <Basket isOpen={true} closeBasket={closeModal} initialItems={[]} />
    );
  };

  const closeModal = () => {
    setModalActive(false);
    setModalContent(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const moveUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showNavbar =
    location.pathname === '/' ||
    location.pathname === '/Login' ||
    location.pathname === '/SignUp';

  return (
    <Layout
      openBasket={openBasket}
      openRegForm={openRegForm}
      LogOut={LogOut}
      selectComponent={selectComponent}
    >
      {showNavbar && (
        <Navbar
          setSorting={setSorting}
          setScrollToCategory={setScrollToCategory}
        />
      )}
      <section className="main-container">
        <Routes>
          <Route
            path="/"
            element={
              <CardContainer
                sorting={sorting}
                scrollToCategory={scrollToCategory}
              />
            }
          >
            <Route
              path="/SignUp"
              element={<SignUp openModalContent={openModalContent} />}
            />
            <Route
              path="/Login"
              element={<Login openModalContent={openModalContent} />}
            />
          </Route>
          <Route path="/About" element={<AboutPage />} />
          <Route path="/Admin" element={<AdminPage />} />
          <Route path="/Rules" element={<RulesPage />} />
          <Route path="/Politics" element={<PoliticsPage />} />
        </Routes>
      </section>
      <Modal active={modalActive} closeModal={closeModal}>
        {modalContent}
      </Modal>
      {showButton && (
        <Button
          className="moveBtn"
          text={<AiOutlineCaretUp />}
          onClick={moveUp}
        />
      )}
    </Layout>
  );
}

export default App;
