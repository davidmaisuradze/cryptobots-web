import { FC, useState } from 'react';
type Props = {
  open? :boolean
  onClickHamburger: () => void;
}
const Hamburger :FC<Props> = ({ open, onClickHamburger }) => {
  return (
    <>
      <button
        className="flex items-center space-x-2 focus:outline-none" onClick={onClickHamburger}>
        <div className="w-6 flex items-center justify-center relative">
          <span
            className={`transform transition w-full h-px bg-current absolute ${open ? 'translate-y-0 rotate-45' : '-translate-y-2' }`}></span>
          <span
            className={`transform transition w-full h-px bg-current absolute ${open ? 'opacity-0 translate-x-3': 'opacity-100'}`}></span>
          <span
            className={`transform transition w-full h-px bg-current absolute ${open ?  'translate-y-0 -rotate-45':'translate-y-2'}`}></span>
        </div>
      </button>
    </>
  );
};
export default Hamburger;