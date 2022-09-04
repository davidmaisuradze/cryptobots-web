import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { ImageIcon } from '../Icons';
import Image from '../Image';

type Props = {
  title: string;
  description: string;
  name: string;
  fileUrl: string;
  className?: string;
  register: UseFormRegister<any>;
}

export const ImageUpload: FC<Props>  = ({ title, description, name, fileUrl, className, register }) => {
  const sharedClassName = `rounded-md cursor-pointer rounded-md w-3/4 ${className}`;

  return (
    <div className="h-56">
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      <div className="text-xs text-gray-500">{description}</div>
      <div className="mt-2 relative">
        {fileUrl && <Image src={fileUrl} className={sharedClassName} />}
        <label
          htmlFor={name}
          className={`flex justify-center items-center top-0 left-0 absolute ${sharedClassName} ${!fileUrl && 'border-dashed border-2 border-gray-300'}`}
        >
          {!fileUrl && <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />}
          <input id={name} type="file" className="sr-only" {...register(name)} />
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
