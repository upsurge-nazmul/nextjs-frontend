import React, { useContext, useState } from "react";
import LoginApis from "../actions/apis/LoginApis";
import { MainContext } from "../context/Main";
import styles from "../styles/emailverificationpending/emailverificationpending.module.scss";
function EmailVerificationPending({ settoastdata }) {
  const { userdata } = useContext(MainContext);
  const [mailsentagain, setmailsentagain] = useState(false);``
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
      {mailsentagain ? (
        <p className={styles.text}>
          Verification mail sent to {userdata?.parent_email}.
        </p>
      ) : (
        <p className={styles.text}>
          Your are almost there! we have sent a verification email to{" "}
          {userdata?.parent_email}
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
