import React from "react";

export default function MiniLogo({ className, onClick, dark, id }) {
  return (
    <svg
      id={id}
      width="118"
      onClick={onClick}
      className={className}
      height="130"
      viewBox="0 0 118 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M117.106 0.89473V32.1605L86.0762 0.89473H117.106Z"
        fill="#4166EB"
      />
      <path
        d="M31.9239 0.89473L0.894531 32.1605V0.89473H31.9239Z"
        fill="#4166EB"
      />
      <path
        d="M59 80.4715L95.0133 116.759C85.1174 124.654 72.6098 129.362 59 129.362C45.3903 129.362 32.8827 124.654 22.9868 116.759L59 80.4715Z"
        fill="#17D1BC"
      />
      <path
        d="M114.35 88.6319C111.642 97.1787 107.042 104.88 101.027 111.23L59.0001 68.8584L16.9726 111.206C10.9585 104.856 6.35797 97.1787 3.65039 88.6078L59.0001 32.8123L114.35 88.6319Z"
        fill="#FF6263"
      />
      <path
        d="M117.105 43.7734V70.7899C117.105 73.6389 116.913 76.4395 116.506 79.1918L58.9997 21.2476L1.49355 79.1918C1.08622 76.4395 0.894531 73.6389 0.894531 70.7899V43.7734L43.4251 0.89473H74.5503L117.105 43.7734Z"
        fill="#FDCC03"
      />
    </svg>
  );
}
