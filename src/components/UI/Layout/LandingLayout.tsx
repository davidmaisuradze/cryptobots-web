
import React, { FC } from 'react';
import Header from '../Header';
import Footer from '../Footer';

type Props = {
  children: React.ReactElement
}

export const LandingLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header/>
      {children}
      <Footer />
    </>
  );
};

export default LandingLayout;
