import { SVGProps } from 'react';

interface CustomIconProps extends SVGProps<SVGSVGElement> {}

export default function Logotipo(props: CustomIconProps) {
  return (
    <svg
      {...props}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_116_153)">
        <path
          d="M100 0C103.395 53.7596 146.24 96.6052 200 100C146.24 103.395 103.395 146.24 100 200C96.6052 146.24 53.7596 103.395 0 100C53.7596 96.6052 96.6052 53.7596 100 0Z"
          fill="url(#paint0_linear_116_153)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_116_153"
          x1="100"
          y1="0"
          x2="100"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#006FEE" /> <stop offset="1" stopColor="#CCE3FD" />
        </linearGradient>
        <clipPath id="clip0_116_153">
          <rect width="200" height="200" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
