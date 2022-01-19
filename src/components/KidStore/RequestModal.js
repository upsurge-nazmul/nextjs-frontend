import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import Toast from "../Toast";
import styles from "../../styles/KidStore/requestmodal.module.scss";
import BackButtonSvg from "../SVGcomponents/BackButtonSvg";
import PaymentSuccessBackground from "../SVGcomponents/PaymentSuccessBackground";
import PaymentSuccessSvg from "../SVGcomponents/PaymentSuccessSvg";
import KidApis from "../../actions/apis/KidApis";

export default function RequestModal({
  showmodal,
  setshowmodal,
  data,
  availableUnicoins,
}) {
  //modes will be start , category , template, assign

  const [success, setsuccess] = useState(false);
  const [error, seterror] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  useEffect(() => {
    if (!showmodal) {
      setsuccess(false);
    }
  }, [showmodal]);
  async function buyAvatar() {
    let response = await KidApis.buyavatar({ avatar_id: data.avatar_id });
    if (response && response.data && response.data.success) {
      setsuccess(true);
    } else {
      seterror(response?.data.message || "Error connecting to server");
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
                    Buy <span>{data.name}</span> Avatar
                  </p>
                </div>
              </div>
              <div className={styles.details}>
                <div className={styles.label}>Price</div>
                <div className={styles.value}>{data.price} Unicoins</div>
              </div>
              <div className={styles.details}>
                <div className={styles.label}>Available Unicoins</div>
                <div className={styles.value}>{availableUnicoins} Unicoins</div>
              </div>
              <div className={styles.button} onClick={() => buyAvatar()}>
                Request Parent
              </div>
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
