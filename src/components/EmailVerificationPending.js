import React, { useContext, useState } from "react";
import LoginApis from "../actions/apis/LoginApis";
import { MainContext } from "../context/Main";
import UniCoinSvg from "./SVGcomponents/UniCoinSvg";
import styles from "../styles/emailverificationpending/emailverificationpending.module.scss";
function EmailVerificationPending({ settoastdata }) {
  const { userdata } = useContext(MainContext);
  const [mailsentagain, setmailsentagain] = useState(false);
  ``;
  async function resendemail() {
    let verifypayload = {
      userid: userdata?.user_id,
      email: userdata?.parent_email,
    };
    let response = await LoginApis.sendverificationemail(verifypayload);
    console.log("VerificationResponse", response);
    if (!response.data.success) {
      settoastdata({
        show: true,
        msg: response.data.message,
        type: "error",
      });
    } else {
      settoastdata({
        show: true,
        msg: response.data.message,
        type: "success",
      });
    }
    setmailsentagain(true);
  }
  return (
    <div className={styles.main}>
      <div className={styles.unicoins}>
        <div className={styles.coin}>
          <UniCoinSvg />
        </div>
        Earn 1000
      </div>
      <div className={styles.undercontainer}>
        {mailsentagain ? (
          <>
            <p className={styles.text}>
              Verification mail sent to <b>{userdata?.parent_email}</b>. Please
              check spam folder if not found in inbox.
            </p>
          </>
        ) : (
          <>
            <p className={styles.text}>
              Verify your email <b>{userdata?.parent_email} </b>
              to redeem wonderful rewards!
            </p>
          </>
        )}
        {mailsentagain ? (
          <div className={styles.button} onClick={resendemail}>
            Resend Email
          </div>
        ) : (
          <div className={styles.button} onClick={resendemail}>
            Send verification email
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailVerificationPending;
