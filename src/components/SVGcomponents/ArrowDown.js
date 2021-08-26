import React from "react";

export default function ArrowDown({ className, onClick, clr, height, width }) {
  return (
    <svg
      onClick={onClick}
      className={className}
      width={width ? width : "14"}
      height={height ? height : "16"}
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 1.00056L7 14.7148"
        stroke={clr ? clr : "#AEAEAE"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 7L7 0.999999L1 7"
        stroke={clr ? clr : "#AEAEAE"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
