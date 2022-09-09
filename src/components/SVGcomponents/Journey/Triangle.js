import React from "react";

export default function Triangle({ className, onClick, clr, ...rest }) {
  return (
    <svg
      className={className}
      onClick={onClick}
      width="24"
      height="24"
      viewBox="0 0 43 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M21.5 0L42.7176 39H0.282377L21.5 0Z"
        fill={clr ? clr : "#15D1BC"}
      />
    </svg>
  );
}
