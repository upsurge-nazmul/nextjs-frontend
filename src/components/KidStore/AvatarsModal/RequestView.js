import styles from "../../../styles/KidStore/requestView.module.scss";
import React, { useEffect, useState } from "react";
import BackButtonSvg from "../../SVGcomponents/BackButtonSvg";
import PaymentSuccessBackground from "../../SVGcomponents/PaymentSuccessBackground";
import PaymentSuccessSvg from "../../SVGcomponents/PaymentSuccessSvg";
import KidApis from "../../../actions/apis/KidApis";
import Spinner from "../../Spinner";
import { UniCoinValue } from "../../../../config";

export default function RequestView({
  data,
  availableUnicoins,
  setRequestMode,
}) {
  const [success, setsuccess] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  async function buyAvatar() {
    setloading(true);
    seterror("");
    if (data.price > availableUnicoins) {
      seterror("Insufficient unicoins");
      setloading(false);
      return;
    }
    let response = await KidApis.buyavatar({ avatar_id: data.avatar_id });
    if (response && response.data && response.data.success) {
      setsuccess(true);
    } else {
      seterror(response?.data.message || "Error connecting to server");
      setloading(false);
    }
  }

  return (
    <div className={styles.requestView}>
      {success ? (
        <div className={styles.requestModalWrapper}>
          <div className={styles.background}></div>
          <div className={styles.requestModalcontainer}>
            <div className={styles.heading}>
              <BackButtonSvg
                className={styles.backIcon}
                onClick={() => setRequestMode(false)}
              />
              <div
                className={styles.text}
                onClick={() => setRequestMode(false)}
              >
                <div className={styles.text}>
                  Buy <span className={styles.name}>{data.name}</span>{" "}
                  {data.type !== "voucher" ? "Avatar" : "Voucher"}
                </div>
              </div>
            </div>
            <div className={styles.successArea}>
              <div className={styles.message}>Yay!</div>
              <PaymentSuccessSvg
                className={styles.ticksvg}
                primaryClr={"#FFF"}
                secondaryClr={"#17D1BC"}
              />
              <p className={styles.payment}>Avatar now available in your profile.</p>
              {/* <PaymentSuccessBackground className={styles.backsvg} /> */}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.requestModalcontainer}>
          <div className={styles.heading}>
            <BackButtonSvg
              className={styles.backIcon}
              onClick={() => setRequestMode(false)}
            />
            <div className={styles.text}>
              Buy <span className={styles.name}>{data.name}</span>{" "}
              {data.type !== "voucher" ? "Avatar" : "Voucher"}
            </div>
          </div>
          <div className={styles.body}>
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
                {data.price > 1000
                  ? data.price / UniCoinValue + "K "
                  : data.price}{" "}
                Unicoins
              </div>
            </div>
            <div className={styles.details}>
              <div className={styles.label}>
                Available Unicoins post purchase
              </div>
              <div className={styles.value}>
                {availableUnicoins - data.price > 1000
                  ? (availableUnicoins - data.price) / UniCoinValue + "K "
                  : availableUnicoins - data.price}{" "}
                Unicoins
              </div>
            </div>
          </div>
          <div className={styles.actionArea}>
            {error ? (
              <p className={styles.error}>{error}</p>
            ) : (
              <>
                {!loading ? (
                  <div className={styles.button} onClick={() => buyAvatar()}>
                    Buy Avatar
                  </div>
                ) : (
                  <div className={`${styles.button} ${styles.spinner_btn}`}>
                    <Spinner />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
