import React from "react";

function HeaderExpandSvg({ className, onClick }) {
  return (
    <svg
      onClick={onClick}
      className={className}
      width="12"
      height="7"
      viewBox="0 0 12 7"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.84264 6.19427L5.99999 6.32172L6.15734 6.19427L6.58124 5.85094L6.58143 5.85078L11.1575 2.13705L11.3617 1.97134L11.1859 1.77578L10.3381 0.832849L10.1792 0.656099L9.99464 0.805895L5.99999 4.0484L2.00536 0.805896L1.82082 0.656099L1.6619 0.832849L0.814094 1.77578L0.638268 1.97134L0.842463 2.13705L5.41856 5.85078L5.41875 5.85093L5.84264 6.19427Z"
        fill="#4166EB"
        stroke="#4166EB"
        strokeWidth="0.5"
      ></path>
    </svg>
  );
}

export default HeaderExpandSvg;
