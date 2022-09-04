import { FC } from 'react';

type Props = {
  src: string;
  className?: string;
  alt?: string;
}
export const Image: FC<Props>  = ({ src, className, alt }) => (
  <img
    className={ className || 'inline-block h-9 w-9 rounded-full' }
    src={src}
    alt={alt || ''}
  />
);

export default Image;
