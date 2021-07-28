import React from "react";

function RecentUser() {
  const demokiddata = {
    image:
      "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQARtruuFZD4r-jkj2vo99Ql8CfWfaFpb7a5zMzyEtm46plv9bRRq5RrCHDsDIGgr2wOeSezORZU6aGohCb4tU",
    name: "tushar",
    points: "5.6k Points",
  };
  return (
    <div className="recentUser">
      <img src={demokiddata.image} alt="" className="userimg" />
      <div className="nameandpoints">
        <p className="name">{demokiddata.name}</p>
        <p className="points">{demokiddata.points}</p>
      </div>
      <div className="msg">
        <svg
          width="22"
          height="21"
          viewBox="0 0 22 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 17C16.771 17 18.657 17 19.828 15.828C21 14.657 21 12.771 21 9C21 5.229 21 3.343 19.828 2.172C18.657 1 16.771 1 13 1H9C5.229 1 3.343 1 2.172 2.172C1 3.343 1 5.229 1 9C1 12.771 1 14.657 2.172 15.828C2.825 16.482 3.7 16.771 5 16.898"
            stroke="#4166EB"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11 9V9.5"
            stroke="#4166EB"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M7 9V9.5"
            stroke="#4166EB"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M15 9V9.5"
            stroke="#4166EB"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M13.0002 17C11.7642 17 10.4022 17.5 9.15924 18.145C7.16124 19.182 6.16224 19.701 5.67024 19.37C5.17824 19.04 5.27124 18.015 5.45824 15.966L5.50024 15.5"
            stroke="#4166EB"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default RecentUser;
