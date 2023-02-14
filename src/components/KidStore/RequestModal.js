import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import Toast from "../Toast";
import styles from "../../styles/KidStore/requestmodal.module.scss";
import BackButtonSvg from "../SVGcomponents/BackButtonSvg";
import PaymentSuccessBackground from "../SVGcomponents/PaymentSuccessBackground";
import PaymentSuccessSvg from "../SVGcomponents/PaymentSuccessSvg";
import KidApis from "../../actions/apis/KidApis";
import Spinner from "../Spinner";
import { UniCoinValue } from "../../../config";

export default function RequestModal({
  showmodal,
  setshowmodal,
  data,
  availableUnicoins,
  quantity,
  userdatafromserver,
  setshowOTP
}) {
  //modes will be start , category , template, assign
  const [success, setsuccess] = useState(false);

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  useEffect(() => {
    if (!showmodal) {
      seterror("");
      setloading(false);
      setsuccess(false);
    }
  }, [showmodal]);
  async function buyAvatar() {
    setloading(true);
    seterror("");
    if (data.price > availableUnicoins) {
      seterror("Insufficient unicoins");
      setloading(false);
      return;
    }
     if(userdatafromserver.phone_verified === false || userdatafromserver.phone_verified === null)
     {
       seterror("Phone number not verified");
       setloading(false);  
     }
     else if(userdatafromserver.email_verified === false || userdatafromserver.email_verified === null )
     {
       seterror("Email not verified");
       setloading(false);  
     }
     else if(userdatafromserver.profile_completed === false)
     {
       seterror("profile not completed");
       setloading(false);  
     }
     else{
      if (data.type && data.type === "voucher") {
        let response = await KidApis.buyvoucher({
          voucher_id: data.id,
          price: data.price,
          quantity: quantity,
        });
        if (response && response.data && response.data.success) {
          setsuccess(true);
        } else {
          seterror(response?.data.message || "Error connecting to server");
          setloading(false);
        }
      } else {
        let response = await KidApis.buyavatar({ avatar_id: data.avatar_id });
        if (response && response.data && response.data.success) {
          setsuccess(true);
        } else {
          seterror(response?.data.message || "Error connecting to server");
          setloading(false);
        }
      }
    }
    }
  return (
    <div className={styles.requestModal}>
      <Toast data={toastdata} />
      <AnimatePresence>
        {showmodal && !success ? (
          <div className={styles.requestModalWrapper}>
            <div
              className={styles.background}
              onClick={() => setshowmodal(false)}
              ></div>
            <div className={styles.requestModalcontainer}>
              <div className={styles.heading}>
                <BackButtonSvg />
                <div className={styles.text}>
                  <p>
                    Buy <span>{data.name}</span>{" "}
                    {data.type !== "voucher" ? "Avatar" : "Voucher"}
                  </p>
                </div>
              </div>
              <div className={styles.details}>
                <div className={styles.label}>Available Unicoins</div>
                <div className={styles.value}>
                  {availableUnicoins > 1000
                    ? availableUnicoins / UniCoinValue + "K "
                    : availableUnicoins}{" "}
                  Unicoins
                </div>
              </div>
              <div className={styles.details}>
                <div className={styles.label}>Price</div>
                <div className={styles.value}>
                  {data.price*quantity > 1000
                    ? data.price*quantity / UniCoinValue + "K "
                    : data.price*quantity}{" "}
                  Unicoins
                </div>
              </div>
              <div className={styles.details}>
                <div className={styles.label}>
                  Available Unicoins post purchase
                </div>
                <div className={styles.value}>
                  {availableUnicoins - (data.price*quantity) > 1000
                    ? (availableUnicoins - (data.price*quantity)) / UniCoinValue + "K "
                    : availableUnicoins - data.price*quantity}{" "}
                  Unicoins
                </div>
              </div>
              {error && 
              <p className={styles.error}>
                {error}
                </p>
                }
              {error === "Phone number not verified" && 
                <div className={styles.continue} onClick={()=>{setshowOTP(true)}}>
                  Enter Now to Continue
                </div>
                }
               
              {!loading ? (
                <div className={styles.button} onClick={() => buyAvatar()}>
                  Request Parent
                </div>
              ) : (
                <div className={`${styles.button} ${styles.spinner_btn}`}>
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        ) : showmodal && success ? (
          <div className={styles.requestModalWrapper}>
            <div
              className={styles.background}
              onClick={() => setshowmodal(false)}
            ></div>
            <div className={styles.requestModalcontainer}>
              <div className={styles.heading}>
                <BackButtonSvg />
                <div className={styles.text}>
                  <p>Yay!</p>
                  <p className={styles.payment}>Request sent to your parent.</p>
                </div>
              </div>

              <div className={styles.svgholder}>
                <PaymentSuccessSvg className={styles.ticksvg} />
                <PaymentSuccessBackground className={styles.backsvg} />
              </div>
              <div
                className={styles.button}
                onClick={() => setshowmodal(false)}
              >
                Done
              </div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
