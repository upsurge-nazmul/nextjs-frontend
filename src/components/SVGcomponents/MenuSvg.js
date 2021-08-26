import React from "react";

export default function MenuSvg({ className, onClick }) {
  return (
    <svg
      width="5"
      height="23"
      viewBox="0 0 5 23"
      onClick={onClick}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="2.5" cy="2.5" r="2.5" fill="#424242" />
      <circle cx="2.5" cy="11.5" r="2.5" fill="#424242" />
      <circle cx="2.5" cy="20.5" r="2.5" fill="#424242" />
    </svg>
  );
}
