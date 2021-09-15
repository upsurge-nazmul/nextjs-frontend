import React, { useContext, useState } from "react";
import LoginApis from "../actions/apis/LoginApis";
import { MainContext } from "../context/Main";
import styles from "../styles/emailverificationpending/emailverificationpending.module.scss";
function EmailVerificationPending({ settoastdata }) {
  const { userdata } = useContext(MainContext);
  const [mailsentagain, setmailsentagain] = useState(false);
  async function resendemail() {
    let response = await LoginApis.sendverificationemail();
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
      {mailsentagain ? (
        <p className={styles.text}>
          Verification mail sent to {userdata.email}.
        </p>
      ) : (
        <p className={styles.text}>
          Your are almost there!, we have sent an email to {userdata.email} .
        </p>
      )}
      {!mailsentagain && (
        <div className={styles.button} onClick={resendemail}>
          Resend Email
        </div>
      )}
    </div>
  );
}

export default EmailVerificationPending;
