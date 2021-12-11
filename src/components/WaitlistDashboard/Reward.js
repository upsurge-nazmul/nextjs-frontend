import React, { useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import styles from "../../styles/WaitlistDashboard/rewardcomponent.module.scss";
import DropDown from "../DropDown";
export default function Reward({ data, unicoin }) {
  const [prices, setprices] = useState(data.valueDenominations?.split(",")[0]);
  const [quantity, setquantity] = useState(0);
  console.log(
    Number(data.valueDenominations.split(",")[0]),
    Number(data.valueDenominations.split(",")[0]) < unicoin
  );
  async function redeem() {
    if (quantity < 1) {
      alert("quantity must be greater than zero");
      return;
    }
    let res = await DashboardApis.ordervouchers({
      productId: data.productId,
      denomination: prices,
      quantity,
      vendor: "xoxo",
    });
    console.log(res.data);
    if (res && res.data.success) {
      alert("Success");
    } else {
      alert("Error");
    }
  }
  return (
    <div className={styles.reward}>
      {Number(data.valueDenominations.split(",")[0]) > unicoin && (
        <div className={styles.gray}></div>
      )}
      <img src={data.imageUrl} alt="" />
      <p className={styles.name}>{data.name}</p>
      <div className={styles.quantityandprice}>
        <DropDown
          options={data.valueDenominations?.split(",") || ["test"]}
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
      <div className={styles.button} onClick={redeem}>
        Redeem
      </div>
    </div>
  );
}
