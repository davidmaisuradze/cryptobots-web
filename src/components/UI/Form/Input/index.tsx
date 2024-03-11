import React, { FC } from 'react';
import { Label } from 'flowbite-react';
import { FieldError, UseFormRegister } from 'react-hook-form';

type Props = {
  type: string;
  name: string;
  label: string;
  showLabel?: boolean;
  errors?: FieldError,
  register: UseFormRegister<any>,
}

export const Input: FC<Props> = ({ type, name, label, showLabel, errors, register }) => {
  return (
    <div className="mb-6">
      {showLabel && (<div className="mb-2 block">
        <Label htmlFor="email">{label}</Label>
      </div>)}
      <input
        type={type}
        id={name}
        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        {...register(name)}
        placeholder={label}
      />
      {errors && <div className="text-red-400">{errors.message}</div>}
    </div>
  );
};

export default Input;
