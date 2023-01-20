import React from "react";

export default function NextSvg({ className, onClick, clr }) {
  return (
    <svg
      width={"24px"}
      height={"24px"}
      viewBox="0 0 24 24"
      className={className}
      onClick={onClick}
    >
      <path
        fill="currentColor"
        d="M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
      />
    </svg>
  );
}
