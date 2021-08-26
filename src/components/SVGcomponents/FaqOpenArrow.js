import React from "react";

export default function FaqOpenArrow({ className, onClick, clr }) {
  return (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      onClick={onClick}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.95447 11.394L0.416466 1.8495C-0.0530339 1.0395 0.515466 -5.78521e-07 1.46197 -5.37148e-07L12.538 -5.3001e-08C13.483 -1.16938e-08 14.053 1.038 13.582 1.8495L8.04397 11.394C7.93878 11.5783 7.78674 11.7314 7.60325 11.8379C7.41977 11.9445 7.21138 12.0006 6.99922 12.0006C6.78705 12.0006 6.57866 11.9445 6.39518 11.8379C6.2117 11.7314 6.05965 11.5783 5.95447 11.394Z"
        fill="white"
      />
    </svg>
  );
}
