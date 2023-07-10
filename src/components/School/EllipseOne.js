import React from "react";

const EllipseOne = ({ color, className }) => {
  return (
    <svg
      width="422"
      height="296"
      viewBox="0 0 422 296"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_b_1268_1172)">
        <path
          d="M421.789 53.7255C419.566 153.776 368.73 277.252 308.058 293.466C207.635 287.712 -1.76126 324.194 0.461888 224.144C2.68503 124.094 109.055 21.0215 208.897 23.24C308.738 25.4585 424.012 -46.325 421.789 53.7255Z"
          fill={color}
        />
      </g>
      <defs>
        <filter
          id="filter0_b_1268_1172"
          x="-3.55566"
          y="-3.62634"
          width="429.376"
          height="303.028"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_1268_1172"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_1268_1172"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default EllipseOne;
