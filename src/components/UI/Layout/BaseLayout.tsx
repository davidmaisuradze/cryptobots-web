
import React, { FC } from 'react';
import Navbar from '../Navbar';

type Props = {
  children: React.ReactElement
}

export const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 overflow-hidden min-h-screen">
        <div className="mx-auto space-y-4 sm:px-2 lg:px-4">
          {children}
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
