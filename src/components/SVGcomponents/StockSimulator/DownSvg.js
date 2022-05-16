import React from "react";

export default function DownSvg({ className, onClick }) {
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
        d="M14.0294 28.5103L0.413196 5.04342C-0.74115 3.05189 0.656605 0.496092 2.98374 0.496092L30.2161 0.496094C32.5395 0.496094 33.941 3.0482 32.7829 5.04342L19.1668 28.5103C18.9081 28.9633 18.5343 29.3399 18.0832 29.6018C17.6321 29.8637 17.1197 30.0017 16.5981 30.0017C16.0764 30.0017 15.564 29.8637 15.1129 29.6018C14.6618 29.3399 14.288 28.9633 14.0294 28.5103Z"
        fill="currentcolor"
      />
    </svg>
  );
}
