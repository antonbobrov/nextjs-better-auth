import type { SVGProps } from 'react';

export const Opera = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13m0 1.75c-1.4 0-2.6 1.86-2.6 4.75s1.2 4.75 2.6 4.75 2.6-1.86 2.6-4.75S9.4 3.25 8 3.25"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
