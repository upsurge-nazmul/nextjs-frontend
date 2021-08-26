import React from "react";

export default function ArrowUp({ className, onClick, clr }) {
  return (
    <svg
      onClick={onClick}
      className={className}
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 14.7143V1"
        stroke={clr ? clr : "#AEAEAE"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 8.71484L7 14.7148L13 8.71484"
        stroke={clr ? clr : "#AEAEAE"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
