import React from "react";
import MenuSvg from "../SVGcomponents/MenuSvg";

function Reward({ type, amount }) {
  return (
    <div className="rewardComponent">
      <img src="" alt="" />
      <p className="amount">{amount}</p>
      <MenuSvg />
    </div>
  );
}

export default Reward;
