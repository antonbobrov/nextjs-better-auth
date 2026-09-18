import type { SVGProps } from 'react';

export const Edge = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 1.5A6.5 6.5 0 0 0 1.5 8c0 1.3.4 2.5 1.04 3.5C3.2 9.2 5.3 7.7 8.4 7.7c.7 0 1.5.1 1.5.1S8.7 6.3 6.4 6.3c-1.5 0-3.1.7-4.02 1.86A6.5 6.5 0 0 1 8 1.5m5.9 5.2C13.3 4.5 10.9 3.2 8.3 3.7 10.7 4.6 12 6.5 12 8.4c0 2.7-2 4.4-4.5 4.4-1.7 0-3.1-.8-3.86-1.9.5 2.2 2.5 3.6 5.06 3.6 3.3 0 6.3-2.3 6.3-5.7 0-.8-.3-1.5-.1-2.1"
      fill="currentColor"
    />
  </svg>
);
