import React from "react";

export default function BallsSvg({ className, onClick, clr }) {
  return (
    <svg
      width="365"
      onClick={onClick}
      className={className}
      viewBox="0 0 365 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="320" cy="138" r="45" fill="#4166EB" />
      <circle cx="20.5" cy="162.5" r="20.5" fill="#FF6263" />
      <circle cx="308.5" cy="73.5" r="20.5" fill="#FDCC03" />
      <path
        d="M254.744 152.744C298.087 111.729 299.974 43.343 258.959 -0.000106646L102 148.529C143.015 191.872 211.401 193.759 254.744 152.744Z"
        fill="#17D1BC"
      />
    </svg>
  );
}
