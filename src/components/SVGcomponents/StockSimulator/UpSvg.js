import React from "react";

export default function UpSvg({ className, onClick }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 34 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
    >
      <path
        d="M19.1679 1.98583L32.7841 25.4527C33.9384 27.4442 32.5407 30 30.2135 30L2.9812 30C0.65775 30 -0.743697 27.4479 0.414341 25.4527L14.0305 1.98583C14.2891 1.5328 14.6629 1.15623 15.1141 0.894304C15.5652 0.632379 16.0776 0.494418 16.5992 0.494418C17.1209 0.494418 17.6332 0.632379 18.0843 0.894303C18.5355 1.15623 18.9093 1.5328 19.1679 1.98583Z"
        fill="currentcolor"
      />
    </svg>
  );
}
