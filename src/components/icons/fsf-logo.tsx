import type React from 'react';

const FsfLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 30" // Adjusted viewBox for better aspect ratio
    aria-label="Frédéric Saba Foundation Logo"
    height="30" // Default height, can be overridden by props
    {...props}
  >
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontFamily="PT Sans, sans-serif"
      fontSize="24"
      fontWeight="bold"
      fill="currentColor" // Inherits color from parent, e.g., text-white
    >
      FSF
    </text>
  </svg>
);

export default FsfLogo;
