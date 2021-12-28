import React, { useState } from "react";
import VoucherRedeem from "../Dashboard/VoucherRedeem";
import styles from "../../styles/WaitlistDashboard/rewardcomponent.module.scss";
import DropDown from "../DropDown";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
export default function Reward({
  data,
  setuser_balance,
  email,
  phone,
  balance,
}) {
  const [prices, setprices] = useState(data.valueDenominations?.split(",")[0]);
  const [quantity, setquantity] = useState(1);
  const [showpopup, setshowpopup] = useState(false);
  async function redeem() {
    if (quantity < 1) {
      alert("Please select a quantity to redeem");
      return;
    }
    setshowpopup(true);
  }
  return (
    <div className={styles.reward}>
      {showpopup && (
        <VoucherRedeem
          userdata_email={email}
          userdata_phone={phone}
          quantity={quantity}
          prices={prices}
          data={data}
          setshowpopup={setshowpopup}
          setuser_balance={setuser_balance}
        />
      )}
      {Number(data.valueDenominations.split(",")[0]) > balance && (
        <div className={styles.gray}></div>
      )}
      <img src={data.imageUrl} alt="" />
      <p className={styles.name}>{data.name}</p>
      <div className={styles.quantityandprice}>
        <DropDown
          options={data.valueDenominations?.split(",") || ["test"]}
          value={prices}
          presign={"INR "}
          keyprefix={data.name + "price"}
          placeholder={"Price"}
          setvalue={setprices}
        />
        <DropDown
          options={[1, 2, 3, 4, 5]}
          value={quantity}
          keyprefix={data.name + "quantity"}
          setvalue={setquantity}
          placeholder={"Quantity"}
        />
      </div>
      <div className={styles.button} onClick={redeem}>
        Redeem
      </div>
    </div>
  );
}
