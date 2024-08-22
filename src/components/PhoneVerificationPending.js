import React, { useContext, useState } from "react";
import LoginApis from "../actions/apis/LoginApis";
import OtpNotVerfied from "./Auth/OtpNotVerified";
import { MainContext } from "../context/Main";
import UniCoinSvg from "./SVGcomponents/UniCoinSvg";
import styles from "../styles/emailverificationpending/emailverificationpending.module.scss";
function PhoneVerificationPending({ settoastdata }) {
  const { userdata } = useContext(MainContext);
  const [phoneverified, setphoneverified] = useState(false);
  const [show, setshowOTP] = useState(false);
  return (
    <div className={styles.main} style={{ backgroundColor: "#17d1bc" }}>
      <div className={styles.unicoins}>
        <div className={styles.coin}>
          <UniCoinSvg />
        </div>
        Earn 1000
      </div>
      <div className={styles.text}>
        <p>
          Please verify your phone <b>{userdata?.parent_phone}</b> to redeem
          wonderful rewards!
        </p>
      </div>
      <div
        className={styles.button}
        onClick={() => {
          setshowOTP(true);
        }}
      >
        Verify now
      </div>
      {show ? (
        <div className={styles.otpnotverified}>
          <OtpNotVerfied
            setshowOTP={setshowOTP}
            userphone={userdata?.parent_phone}
            email={userdata?.parent_email}
            setphoneverified={setphoneverified}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default PhoneVerificationPending;
