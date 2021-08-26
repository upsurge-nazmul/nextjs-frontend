import React from "react";

export default function HamSvg({ className, onClick }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="rgb(209, 68, 67)"
      width="40px"
      height="40px"
      data-ux="IconHamburger"
    >
      <g>
        <path fillRule="evenodd" d="M4 8h16V6H4z"></path>
        <path fillRule="evenodd" d="M4 13.096h16v-2.001H4z"></path>
        <path fillRule="evenodd" d="M4 18.346h16v-2H4z"></path>
      </g>
    </svg>
  );
}
