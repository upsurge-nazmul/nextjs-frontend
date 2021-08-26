import React from "react";

export default function FaqClosedArrow({ className, onClick, clr }) {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.394 8.04602L1.8495 13.584C1.0395 14.0535 0 13.485 0 12.5385V1.46252C0 0.517522 1.038 -0.0524782 1.8495 0.418522L11.394 5.95652C11.5783 6.06171 11.7314 6.21375 11.8379 6.39723C11.9445 6.58071 12.0006 6.78911 12.0006 7.00127C12.0006 7.21344 11.9445 7.42183 11.8379 7.60531C11.7314 7.78879 11.5783 7.94084 11.394 8.04602Z"
        fill="#4166EB"
      />
    </svg>
  );
}
