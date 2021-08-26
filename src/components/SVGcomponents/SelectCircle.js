import React from "react";

export default function SelectCircle({ className, onClick }) {
  return (
    <svg
      className={className}
      onClick={onClick}
      width="10"
      height="10"
      viewBox="0 0 18 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.21924 6.8136L6.40783 12L16.7806 1.6272"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
