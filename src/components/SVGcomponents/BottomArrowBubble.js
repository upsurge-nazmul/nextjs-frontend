import React from "react";

export default function BottomArrowBubble({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 75 111"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_3891:5270)">
        <path
          d="M11.3164 0.22656L64.3164 0.22661C41.8164 22.7266 29.8164 83.7267 31.8164 90.2267C33.8164 96.7267 6.3164 52.2266 11.3164 0.22656Z"
          fill="white"
        />
        <path
          d="M11.3164 0.22656L64.3164 0.22661C41.8164 22.7266 29.8164 83.7267 31.8164 90.2267C33.8164 96.7267 6.3164 52.2266 11.3164 0.22656Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_3891:5270"
          x="0.70752"
          y="0.226562"
          width="73.6089"
          height="110.633"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="10" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0.28 0 0 0 0 1 0 0 0 0.14 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3891:5270"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3891:5270"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
