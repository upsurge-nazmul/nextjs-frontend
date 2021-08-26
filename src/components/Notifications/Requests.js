import React from "react";
import ClockSvg from "../SVGcomponents/ClockSvg";
import RemoveSvg from "../SVGcomponents/RemoveSvg";

function Requests() {
  const demoNotification = {
    image:
      "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTFWtjP3S55GF9SiB8xsodk5w2QO5MichphEj4JcYRpo-Eewh5WdqGZH6G1OtIgoB-PmyPDWcx-9ieyysbz5g",
    heading: "Buy Minions Avatar",
    sub: "Request by Pulkit",
    time: "2 mins ago",
  };
  return (
    <div className="notifications">
      <img src={demoNotification.image} alt="" />
      <div className="headingandsub">
        <div className="heading">{demoNotification.heading}</div>
        <div className="sub">{demoNotification.sub}</div>
      </div>
      <div className="time">
        <ClockSvg />

        <p>{demoNotification.time}</p>
      </div>
      <div className="button">Accept</div>
      <div className="removebutton">
        <RemoveSvg />
      </div>
    </div>
  );
}

export default Requests;
