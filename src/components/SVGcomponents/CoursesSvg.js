import React from "react";

export default function CoursesSvg({ className, onClick }) {
  return (
    <svg
      onClick={onClick}
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="currentColor" d="M6.5,20.5c-0.6,0-1-0.4-1-1h6.7c-0.1-0.4-0.2-0.8-0.2-1.2c0-3,2.4-5.4,5.4-5.4c1.1,0,2.2,0.3,3,0.9c0,0,0,0,0,0V4.5C20.5,3.1,19.4,2,18,2H6.5C5.1,2,4,3.1,4,4.5v15C4,20.9,5.1,22,6.5,22h7.1c-0.4-0.4-0.8-0.9-1-1.5H6.5z M7,6c0-0.6,0.4-1,1-1h8c0.6,0,1,0.4,1,1v1c0,0.6-0.4,1-1,1H8C7.4,8,7,7.6,7,7V6z"/>
      <path fill="currentColor" d="M17.4,13.8c2.5,0,4.5,2,4.5,4.5s-2,4.5-4.5,4.5c-2.5,0-4.5-2-4.5-4.5S14.9,13.8,17.4,13.8z M16.2,16.3v4.2c0,0.3,0.4,0.5,0.6,0.3l3-2.1c0.2-0.2,0.2-0.5,0-0.7l-3-2.1C16.6,15.7,16.2,15.9,16.2,16.3z"/>

    </svg>
  );
}
