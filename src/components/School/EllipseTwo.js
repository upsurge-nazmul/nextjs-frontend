import React from "react";

const EllipseTwo = ({ color, className }) => {
  return (
    <svg
      width="513"
      height="343"
      viewBox="0 0 513 343"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_b_1268_1171)">
        <path
          d="M512.472 211.015C509.624 339.19 463.622 343.822 382.576 342.021C254.669 339.179 -2.74236 209.294 0.105705 81.1196C2.95377 -47.0548 110.045 14.8336 237.952 17.6758C365.859 20.5179 515.32 82.8408 512.472 211.015Z"
          fill={color}
        />
      </g>
      <defs>
        <filter
          id="filter0_b_1268_1171"
          x="-3.91772"
          y="-3.73523"
          width="520.43"
          height="350.005"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_1268_1171"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_1268_1171"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default EllipseTwo;
