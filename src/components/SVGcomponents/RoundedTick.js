import React from "react";

export default function RoundedTick({ className, onClick }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 9C0 6.61305 0.948212 4.32387 2.63604 2.63604C4.32387 0.948212 6.61305 0 9 0C11.3869 0 13.6761 0.948212 15.364 2.63604C17.0518 4.32387 18 6.61305 18 9C18 11.3869 17.0518 13.6761 15.364 15.364C13.6761 17.0518 11.3869 18 9 18C6.61305 18 4.32387 17.0518 2.63604 15.364C0.948212 13.6761 0 11.3869 0 9Z"
        fill="white"
      />
      <path
        d="M7.73237 10.2408L12.1353 5.83789L13.0916 6.79426L7.73237 12.1535L4.86328 9.28441L5.81964 8.32805L7.73237 10.2408Z"
        fill="#4166EB"
      />
    </svg>
  );
}
