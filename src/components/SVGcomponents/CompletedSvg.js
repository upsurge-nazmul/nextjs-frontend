import React from "react";

export default function CompletedSvg({ className, onClick }) {
  return (
    <svg
      width="25"
      height="25"
      onClick={onClick}
      className={className}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 12.5C0 9.18479 1.31696 6.00537 3.66117 3.66117C6.00537 1.31696 9.18479 0 12.5 0C15.8152 0 18.9946 1.31696 21.3388 3.66117C23.683 6.00537 25 9.18479 25 12.5C25 15.8152 23.683 18.9946 21.3388 21.3388C18.9946 23.683 15.8152 25 12.5 25C9.18479 25 6.00537 23.683 3.66117 21.3388C1.31696 18.9946 0 15.8152 0 12.5Z"
        fill="#17D1BC"
      />
      <path
        d="M10.7392 14.2225L16.8544 8.10742L18.1826 9.43571L10.7392 16.8791L6.75439 12.8943L8.08268 11.566L10.7392 14.2225Z"
        fill="white"
      />
    </svg>
  );
}
