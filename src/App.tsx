import React from 'react';
import './App.css'
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Card from './components/Cards/Card';
import Footer from './components/Footer/Footer';

function App() {
  return (
<>
      <Header></Header>
      <Navbar></Navbar>
      <div className="card-container">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App