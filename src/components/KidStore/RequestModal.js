import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useContext } from "react";
import Toast from "../Toast";
import styles from "../../styles/KidStore/requestmodal.module.scss";
import BackButtonSvg from "../SVGcomponents/BackButtonSvg";
import PaymentSuccessBackground from "../SVGcomponents/PaymentSuccessBackground";
import PaymentSuccessSvg from "../SVGcomponents/PaymentSuccessSvg";
import KidApis from "../../actions/apis/KidApis";
import Spinner from "../Spinner";
import LoginApis from "../../actions/apis/LoginApis";
import { useRouter } from "next/router";
import { MainContext } from "../../context/Main";

export default function RequestModal({
  showmodal,
  setshowmodal,
  data,
  availableUnicoins,
  quantity,
  userdatafromserver,
  setshowOTP,
}) {
  //modes will be start , category , template, assign
  const { userdata, setTotalUnicoins } = useContext(MainContext);
  const router = useRouter();
  const [success, setsuccess] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState(false);

  async function sendVerificationEmail() {
    let verifypayload = {
      userid: userdata?.user_id,
      email: userdata?.parent_email,
    };
    let response = await LoginApis.sendverificationemail(verifypayload);
    if (!response.data.success) {
      setVerificationEmail(false);
    } else {
      setVerificationEmail(true);
    }
  }
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [actionDisabled, setActionDisabled] = useState(false);

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
    // if (data.price > availableUnicoins) {
    //   seterror("Insufficient unicoins");
    //   setloading(false);
    //   return;
    // }
    // if (
    //   userdatafromserver.phone_verified === false ||
    //   userdatafromserver.phone_verified === null
    // ) {
    //   seterror("Phone number not verified.");
    //   setloading(false);
    // } else if (
    //   userdatafromserver.email_verified === false ||
    //   userdatafromserver.email_verified === null
    // ) {
    //   seterror("Email not verified.");
    //   setloading(false);
    // } else if (userdatafromserver.profile_completed === false) {
    //   seterror("Profile not completed.");
    //   setloading(false);
    // } else {

    if (data.type && data.type === "voucher") {
      let response = await KidApis.buyvoucher({
        voucher_id: data.id,
        price: data.price,
        quantity: quantity,
      });
      if (response && response.data && response.data.success) {
        setTotalUnicoins((prev) => prev - data.price);
        setsuccess(true);
      } else {
        seterror(response?.data.message || "Error connecting to server");
        setloading(false);
      }
    } else {
      let response = await KidApis.buyavatar({ avatar_id: data.avatar_id });
      if (response && response.data && response.data.success) {
        setTotalUnicoins((prev) => prev - 20);
        setsuccess(true);
      } else {
        seterror(response?.data.message || "Error connecting to server");
        setloading(false);
      }
    }
  }

  useEffect(() => {
    if (availableUnicoins - data.price * quantity < 0) {
      setActionDisabled(true);
    } else {
      setActionDisabled(false);
    }
  }, []);

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
                  {Math.round(availableUnicoins).toLocaleString("en-IN", {
                    currency: "INR",
                  })}
                  {"  "}
                  Unicoins
                </div>
              </div>
              <div className={styles.details}>
                <div className={styles.label}>Price</div>
                <div className={styles.value}>
                  {Math.round(data.price * quantity).toLocaleString("en-IN", {
                    currency: "INR",
                  })}
                  {"  "}
                  Unicoins
                </div>
              </div>
              <div className={styles.details}>
                <div className={styles.label}>
                  Available Unicoins post purchase
                </div>
                <div className={styles.value}>
                  {Math.round(
                    availableUnicoins - data.price * quantity
                  ).toLocaleString("en-IN", {
                    currency: "INR",
                  })}
                  {"  "}
                  Unicoins
                </div>
              </div>
              <div className={styles.errors}>
                {error && <p className={styles.error}>{error}</p>}
                {error === "Phone number not verified." && (
                  <div
                    className={styles.continue}
                    onClick={() => {
                      setshowOTP(true);
                    }}
                  >
                    <u>Enter Now to Continue</u>
                  </div>
                )}
                {error === "Email not verified." &&
                  verificationEmail === false && (
                    <div
                      className={styles.continue}
                      onClick={() => {
                        sendVerificationEmail();
                      }}
                    >
                      <u>Click Here to send again</u>
                    </div>
                  )}
                {error === "Email not verified." && verificationEmail && (
                  <div className={styles.continue}>
                    <u>Verification Email sent.</u>
                  </div>
                )}
                {error === "Profile not completed." && (
                  <div
                    className={styles.continue}
                    onClick={() => router.push("/dashboard/k/editprofile")}
                  >
                    <u>Click Here to Complete</u>
                  </div>
                )}
              </div>
              {!loading ? (
                <div
                  className={
                    actionDisabled ? styles.disabledButton : styles.button
                  }
                  onClick={actionDisabled ? () => {} : () => buyAvatar()}
                >
                  {actionDisabled ? "Insufficient Balance" : "Redeem Now"}
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
                  <p className={styles.payment}>Purchase was successful.</p>
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
