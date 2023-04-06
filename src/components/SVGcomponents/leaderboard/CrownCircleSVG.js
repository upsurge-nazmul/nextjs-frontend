import React from "react";

export default function CrownCircleSVG({ color,whiteColor }) {
  return (
    <svg
      width="39"
      height="39"
      viewBox="0 0 39 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="19" cy="19" r="12" fill={`${whiteColor}`} />
      <path
        d="M19.5 3.25C10.5137 3.25 3.25 10.5625 3.25 19.5C3.25 28.4375 10.5625 35.75 19.5 35.75C28.4375 35.75 35.75 28.4375 35.75 19.5C35.75 10.5625 28.4375 3.25 19.5 3.25ZM26 25.09C26 25.6425 25.6425 26 25.09 26H13.91C13.3575 26 13 25.6425 13 25.09V24.375H26V25.09ZM26 22.75H13L11.375 13L16.25 16.25L19.5 11.375L22.75 16.25L27.625 13L26 22.75Z"
        fill={`${color}`}
      />
    </svg>
  );
}
