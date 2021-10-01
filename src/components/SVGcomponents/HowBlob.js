import React from "react";

function HowBlob({ className, onClick }) {
  return (
    <svg
      onClick={onClick}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.4999 0.99941C8.99994 2.99941 6.99994 12.9994 0.499941 38.9994C-5.00006 67.9993 78.9999 72.4995 111 68.9995C143 65.4995 199 68.9995 239 64.4995C279 59.9995 278.853 42.4528 274 28.4995C266 5.49951 230.5 10.9995 204.5 5.49941C178.5 -0.000692368 150 5.49941 120.5 5.49941C90.9999 5.49941 69.9999 -1.00059 39.4999 0.99941Z"
        fill="#4166EB"
      />
    </svg>
  );
}

export default HowBlob;
