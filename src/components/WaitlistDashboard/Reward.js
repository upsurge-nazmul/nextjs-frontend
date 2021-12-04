import React, { useState } from "react";
import styles from "../../styles/WaitlistDashboard/rewardcomponent.module.scss";
import DropDown from "../DropDown";
export default function Reward({ data }) {
  const [prices, setprices] = useState(data.valueDenominations.split(",")[0]);
  const [quantity, setquantity] = useState(0);
  return (
    <div className={styles.reward}>
      <img src={data.imageUrl} alt="" />
      <p className={styles.name}>{data.name}</p>
      <div className={styles.quantityandprice}>
        <DropDown
          options={data.valueDenominations.split(",")}
          value={prices}
          presign={"INR "}
          setvalue={setprices}
        />
        <DropDown
          options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          value={quantity}
          setvalue={setquantity}
          placeholder={"0"}
        />
      </div>
      <div className={styles.button}>Add to cart</div>
    </div>
  );
}
