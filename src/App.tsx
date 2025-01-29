import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Layout from './components/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import Card from 'components/Card';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      dispatch(setUser(JSON.parse(userData)));
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Layout>
          <div className="main-container">
            <Navbar></Navbar>
            <div className="card-container">
              <Card />
            </div>
          </div>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
