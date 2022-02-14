import React, { useEffect, useState } from "react";
import VoucherRedeem from "../Dashboard/VoucherRedeem";
import styles from "../../styles/WaitlistDashboard/rewardcomponent.module.scss";
import DropDown from "../DropDown";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { UniCoinValue } from "../../../config";
import RequestModal from "../KidStore/RequestModal";
export default function Reward({
  data,
  setuser_balance,
  email,
  phone,
  balance,
  kidsdata,
  kid,
  unicoins,
}) {
  const [prices, setprices] = useState([]);
  const [selectedprice, setselectedprice] = useState(
    data.valueDenominations?.split(",")[0] * UniCoinValue
  );
  const [quantity, setquantity] = useState(1);
  const [showpopup, setshowpopup] = useState(false);
  async function redeem() {
    if (quantity < 1) {
      alert("Please select a quantity to redeem");
      return;
    }
    setshowpopup(true);
  }
  useEffect(() => {
    let values = data.valueDenominations?.split(",");
    let unicoinvalues = [];
    values.forEach((item) => {
      unicoinvalues.push(Number(item) * UniCoinValue);
    });
    setprices(unicoinvalues);
    setselectedprice(unicoinvalues[0]);
  }, []);
  return (
    <div className={styles.reward}>
      {showpopup &&
        (!kid ? (
          <VoucherRedeem
            userdata_email={email}
            userdata_phone={phone}
            quantity={quantity}
            prices={selectedprice}
            data={data}
            setshowpopup={setshowpopup}
            setuser_balance={setuser_balance}
            kidsdata={kidsdata}
          />
        ) : (
          <RequestModal
            showmodal={showpopup}
            setshowmodal={setshowpopup}
            data={{
              name: data.name,
              type: "voucher",
              price: selectedprice,
              id: data.productId,
            }}
            availableUnicoins={unicoins}
          />
        ))}

      <img src={data.imageUrl} alt="" />
      <p className={styles.name}>{data.name}</p>
      <div className={styles.quantityandprice}>
        <DropDown
          options={prices}
          value={selectedprice}
          shorter={true}
          keyprefix={data.name + "price"}
          placeholder={"UniCoins"}
          setvalue={(value) => setselectedprice(value)}
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
