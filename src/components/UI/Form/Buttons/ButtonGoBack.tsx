import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/outline';

export const ButtonGoBack: FC = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="flex items-center bg-transparent leading-snug rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
      onClick={() => router.push('/auth/login')}
    >
      <span className="w-3.5"><ArrowLeftIcon /></span>
      <span className="ml-1">Back</span>
    </button>
  );
};

export default ButtonGoBack;
