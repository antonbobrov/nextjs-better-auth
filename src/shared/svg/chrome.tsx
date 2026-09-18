import type { SVGProps } from 'react';

export const Chrome = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M8 1.5a6.5 6.5 0 1 0 5.76 3.5H8a3 3 0 1 0 2.6 1.5h4.36A6.5 6.5 0 0 0 8 1.5m0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
