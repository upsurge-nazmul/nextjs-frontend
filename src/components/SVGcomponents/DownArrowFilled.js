import React from "react";

export default function DownArrowFilled({ className, onClick, clr }) {
  return (
    <svg
      onClick={onClick}
      className={className}
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.3962 0H0.603751C0.100078 0 -0.18116 0.639064 0.130759 1.07535L8.52701 12.7751C8.76734 13.11 9.2301 13.11 9.47299 12.7751L17.8692 1.07535C18.1812 0.639064 17.8999 0 17.3962 0Z"
        fill={clr ? clr : "#787878"}
      />
    </svg>
  );
}
