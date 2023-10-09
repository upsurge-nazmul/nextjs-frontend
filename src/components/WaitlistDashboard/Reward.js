import React, { useEffect, useState, useContext } from "react";
import VoucherRedeem from "../Dashboard/VoucherRedeem";
import styles from "../../styles/WaitlistDashboard/rewardcomponent.module.scss";
import DropDown from "../DropDown";
import { UniCoinValue } from "../../../config";
import RequestModal from "../KidStore/RequestModal";
import UniCoinSvg from "../SVGcomponents/UniCoinSvg";
import { MainContext } from "../../context/Main";
import OtpNotVerfied from "../Auth/OtpNotVerified";
import Modal from "../Modal";
import RewardDetails from "./RewardDetails";

export default function Reward({
  data,
  setuser_balance,
  email,
  phone,
  balance,
  kidsdata,
  kid,
  unicoins,
  parent,
  userdatafromserver,
}) {
  const [prices, setprices] = useState([]);
  const [showOTP, setshowOTP] = useState(false);
  const { userdata, setuserdata } = useContext(MainContext);
  const [selectedprice, setselectedprice] = useState(
    data.valueDenominations?.split(",")[0]
  );
  const [quantity, setquantity] = useState(1);
  const [showpopup, setshowpopup] = useState(false);
  const [showDetails, setShowDetails] = useState();
  const [phoneverified, setphoneverified] = useState(false);

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
      unicoinvalues.push(Number(item));
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
              price: selectedprice * 1000,
              id: data.productId,
            }}
            userdatafromserver={userdatafromserver}
            quantity={quantity}
            availableUnicoins={unicoins}
            setshowOTP={setshowOTP}
          />
        ))}
      {showOTP && (
        <div className={styles.showOTP}>
          <OtpNotVerfied
            userphone={userdata?.parent_phone}
            setphoneverified={setphoneverified}
            setshowOTP={setshowOTP}
            email={userdatafromserver?.parent_email}
          />
        </div>
      )}

      {showDetails && (
        <Modal
          title={data.name}
          actions={{
            cancelText: "Close",
            isCancel: true,
            handleCancel: () => setShowDetails(),
          }}
          onOutsideClick={() => setShowDetails()}
        >
          <RewardDetails data={data} />
        </Modal>
      )}
      <div className={styles.left}>
      <img className={styles.image} src={data.imageUrl} alt="" />
      <div className={styles.nameArea}>
          <div className={styles.name}>{data.name}</div>
          
        </div>
      </div>  
      
      <div className={styles.right}>
        
        <div className={styles.quantityandprice}>
          <DropDown
            options={prices}
            value={selectedprice}
            shorter={true}
            keyprefix={data.name + "price"}
            placeholder={"Reward (₹)"}
            setvalue={(value) => setselectedprice(value)}
          />

          {/* {
            <DropDown
              options={[1]}
              value={quantity}
              keyprefix={data.name + "quantity"}
              setvalue={setquantity}
              placeholder={"Quantity"}
              className={styles.quantity}
            />
          } */}
         <div className={styles.valueArea}>
            <UniCoinSvg className={styles.svg} clr={"#434040"} />
            <div className={styles.value}>
              {selectedprice * quantity * UniCoinValue}
            </div>
          </div>
        </div>
{/*         
        {(data.productId === 31057 ? (<div className={styles.description}>
        Phone number registered with us should have full wallet KYC with Paytm to succesfully redeem this voucher.
        </div>) : "")}
         */}
        <div className={styles.actionArea}>
        <button
            className={styles.detailsButton}
            onClick={() => setShowDetails(true)}
          >
            Details
          </button>

          {parent ? (
            ""
          ) : (
            <button className={styles.redeemButton} onClick={redeem}>
              Redeem
            </button>
          )}
          
        </div>
      </div>
    </div>
  );
}

