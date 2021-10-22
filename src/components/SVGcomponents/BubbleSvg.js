import React from "react";

export default function BubbleSvg({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 770 378"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_3891:5270)">
        <path
          d="M20 79C20 44.2061 48.2061 16 83 16H596C630.794 16 659 44.2061 659 79V211.405C659 228.113 665.597 244.595 680.638 251.871C707.704 264.965 744.064 271.519 749 270C754.05 268.446 728.314 284.7 692.194 289.683C674.525 292.121 659 305.936 659 323.773V323.773C659 340.467 645.467 354 628.773 354H83C48.2061 354 20 325.794 20 291V79Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_3891:5270"
          x="0"
          y="0"
          width="769.633"
          height="378"
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
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="10" />
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
