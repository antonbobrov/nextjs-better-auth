import type { SVGProps } from 'react';

export const Safari = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13m2.62 2.7L7.3 7.3 4.2 10.62l3.32-3.32z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
