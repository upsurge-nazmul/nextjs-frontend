import React, { useContext, useState } from "react";
import LoginApis from "../actions/apis/LoginApis";
import OtpNotVerfied from "./Auth/OtpNotVerified"
import { MainContext } from "../context/Main";
import styles from "../styles/emailverificationpending/emailverificationpending.module.scss";
function PhoneVerificationPending({ settoastdata }) {
  const { userdata } = useContext(MainContext);
  const [phoneverified, setphoneverified] = useState(false);
  const [show,setshowOTP] = useState(false);
  return (
    <div className={styles.main} style={{backgroundColor: "#17d1bc"}}>
        <p className={styles.text}>
          Your are almost there! we have sent a OTP to your Phone no. {userdata?.parent_phone} 
        </p>
        <div className={styles.button} onClick={()=>{setshowOTP(true)}}>Enter Now!</div>
        {show ?
        <div className={styles.otpnotverified}>
            <OtpNotVerfied setshowOTP={setshowOTP} userphone={userdata?.parent_phone} email={userdata?.parent_email} setphoneverified={setphoneverified} />
        </div>
:<>
</>
        }
    </div>
  );
}

export default PhoneVerificationPending;
