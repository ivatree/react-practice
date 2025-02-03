import Footer from 'components/Footer';
import Header from 'components/Header';
import React from 'react';

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
  isUser: boolean;
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
  isUser,
  selectComponent,
}: LayoutProps) => {
  return (
    <>
      <Header
        openBasket={openBasket}
        openRegForm={openRegForm}
        LogOut={LogOut}
        isUser={isUser}
        selectComponent={selectComponent}
      />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
