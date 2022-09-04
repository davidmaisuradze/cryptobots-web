import { FC } from 'react';
import { IconProps } from './types';

// eslint-disable-next-line react/display-name
export const CircleSmallIcon: FC<IconProps> = ({ className }) => 
  (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 8 8"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <circle cx={4} cy={4} r={3} />
    </svg>
  );

export default CircleSmallIcon;
