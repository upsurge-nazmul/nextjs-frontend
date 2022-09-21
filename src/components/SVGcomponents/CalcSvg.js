import React from "react";

export default function CalcSvg({ className, onClick }) {
  return (
    <svg
      onClick={onClick}
      className={className}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      style={{ enableBackground: "new 0 0 512 512" }}
      xmlSpace="preserve"
    >
      <g id="XMLID_1_">
        <path
          id="XMLID_13_"
          d="M394,0H118C85.3,0,59.2,27,59.2,58.8v394.5c0,32.6,26.1,58.8,58.8,58.8H394c32.6,0,58.8-27,58.8-58.8V58.8
       C453.7,27,426.7,0,394,0z M187,454.2h-58.8v-58.8H187V454.2z M187,345.1h-58.8v-58.8H187V345.1z M187,236.9h-58.8v-58.8H187V236.9z
        M285.8,454.2h-58.8v-58.8h58.8V454.2z M285.8,345.1h-58.8v-58.8h58.8V345.1z M285.8,236.9h-58.8v-58.8h58.8V236.9z M384.7,454.2
       h-58.8V286.3h58.8V454.2z M384.7,236.9h-58.8v-58.8h58.8V236.9z M384.7,118.4H128.2V59.7h256.5V118.4z"
        />
      </g>
    </svg>
  );
}
