import type { SVGProps } from 'react';

type Props = {
  size?: number;
} & SVGProps<SVGSVGElement>;

export const ChevronUp = ({ size = 24, ...props}: Props) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d="m12 6.586-8.707 8.707 1.414 1.414L12 9.414l7.293 7.293 1.414-1.414L12 6.586z"
      fillRule='evenodd'
      clipRule='evenodd'
      fill='currentColor'
    />
  </svg>
)