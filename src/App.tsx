import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Layout from './components/Layout/Layout';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice';
import { Modal } from 'components/Modal';
import { SignUp } from 'components/SignUp';
import { Basket } from 'components/Basket/index';
import { Login } from 'components/Login';
import CardContainer from 'components/Card/CardContainer/container';
import { clearBasket } from 'utils/firebase';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [selectComponent, setSelectComponent] = useState({
    image: '',
    title: '',
    description: '',
    price: 0,
    id: '',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      dispatch(setUser(JSON.parse(userData)));
      setIsUser(true);
    }
  }, [dispatch]);

  const LogOut = async () => {
    localStorage.clear();
    await clearBasket();
    window.location.reload();
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
      isUser={isUser}
      selectComponent={selectComponent}
    >
      <div className="main-container">
        <Navbar />
        <CardContainer />
      </div>
      <Modal active={modalActive} closeModal={closeModal}>
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/Basket"
            element={
              <Basket
                isOpen={true}
                closebasket={closeModal}
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
