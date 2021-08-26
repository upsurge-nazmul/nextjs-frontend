import React from "react";

export default function PaymentSvg({ className, onClick }) {
  return (
    <svg
      onClick={onClick}
      className={className}
      width="20"
      height="15"
      viewBox="0 0 20 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 2.8C1 2.32261 1.18964 1.86477 1.52721 1.52721C1.86477 1.18964 2.32261 1 2.8 1H17.2C17.6774 1 18.1352 1.18964 18.4728 1.52721C18.8104 1.86477 19 2.32261 19 2.8V11.8C19 12.2774 18.8104 12.7352 18.4728 13.0728C18.1352 13.4104 17.6774 13.6 17.2 13.6H2.8C2.32261 13.6 1.86477 13.4104 1.52721 13.0728C1.18964 12.7352 1 12.2774 1 11.8V2.8Z"
        stroke="#4F4F4F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 9.99961C11.4912 9.99961 12.7 8.79078 12.7 7.29961C12.7 5.80844 11.4912 4.59961 10 4.59961C8.50888 4.59961 7.30005 5.80844 7.30005 7.29961C7.30005 8.79078 8.50888 9.99961 10 9.99961Z"
        stroke="#4F4F4F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 4.6C1.95478 4.6 2.87045 4.22072 3.54558 3.54558C4.22072 2.87045 4.6 1.95478 4.6 1"
        stroke="#4F4F4F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.3999 13.6C15.3999 12.6452 15.7792 11.7295 16.4543 11.0544C17.1294 10.3793 18.0451 10 18.9999 10"
        stroke="#4F4F4F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
