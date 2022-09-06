
import React, { FC } from 'react';
import Navbar from '../Navbar';

type Props = {
  children: React.ReactElement
}

export const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="bg-gray-50 overflow-hidden min-h-screen">
        <div>
          {children}
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
