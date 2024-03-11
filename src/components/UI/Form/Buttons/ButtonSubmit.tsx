import React, { FC } from 'react';

type Props = {
  title: string;
}

export const ButtonSubmit: FC<Props> = ({ title }) => {
  return (
    <button
      type="submit"
      className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
    >
      {title}
    </button>
  );
};

export default ButtonSubmit;
