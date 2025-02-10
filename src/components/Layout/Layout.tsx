import React from 'react';
import Footer from 'components/Footer';
import Header from 'components/Header';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
  children?: React.ReactNode;
  openBasket: (
    image: string,
    title: string,
    description: string,
    price: number,
    id: string
  ) => void;
  openRegForm: () => void;
  LogOut: () => void;
  selectComponent: {
    image: string;
    title: string;
    description: string;
    price: number;
    id: string;
  };
}

const Layout = ({
  children,
  openBasket,
  openRegForm,
  LogOut,
  selectComponent,
}: LayoutProps) => {
  return (
    <>
      <Header
        openBasket={openBasket}
        openRegForm={openRegForm}
        LogOut={LogOut}
        selectComponent={selectComponent}
      />
      <Outlet></Outlet>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
