import type { SVGProps } from 'react';

type Props = {
  size?: number;
} & SVGProps<SVGSVGElement>;

export const ChevronDown = ({ size = 24, ...props}: Props) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z"
      fillRule='evenodd'
      clipRule='evenodd'
      fill='currentColor'
    />
  </svg>
)