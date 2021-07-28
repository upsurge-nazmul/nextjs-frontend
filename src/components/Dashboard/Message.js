import React from "react";

function Message() {
  const demoMessage = {
    image:
      "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTFWtjP3S55GF9SiB8xsodk5w2QO5MichphEj4JcYRpo-Eewh5WdqGZH6G1OtIgoB-PmyPDWcx-9ieyysbz5g",
    name: "Pulkit Mehra",
    msg: "Hello guys, we have discussed about ...",
    time: "16.04",
  };
  return (
    <div className="message">
      <img src={demoMessage.image} alt="" />
      <div className="nameandmsg">
        <div className="name">{demoMessage.name}</div>
        <div className="msg">{demoMessage.msg}</div>
      </div>

      <p className="time">{demoMessage.time}</p>
    </div>
  );
}

export default Message;
