import React from "react";
import { useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import Header from "../../components/Header/Header";
import styles from "../../styles/emailverification/emailverification.module.scss";

export default function Verification({ emailVerified, msg }) {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  if(emailVerified === false)
  {
    mixpanel.track('Email Verification',{'event':'Email Verification Done'});
  }
  return (
    <div className={styles.mainPage}>
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
      />
      <div className={styles.wrapper}>
        {emailVerified ? (
          <>
            <img
              className={styles.image}
              src="https://imgcdn.upsurge.in/images/43959.jpg"
              alt=""
            />
            <p className={styles.heading}>
              Thank you, your email address has been verified.
            </p>
            <p className={styles.subheading}>
              You can close this tab or continue to login.
            </p>
          </>
        ) : (
          <>
            <img
              className={styles.image}
              src="https://imgcdn.upsurge.in/images/images.png"
              alt=""
            />
            <p className={styles.heading}>{msg}</p>
            <p className={styles.subheading}>
              You can close this tab and try to resend the verification email.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps({ params, req }) {
  let response = await LoginApis.verifyemailtoken({
    token: params.token,
  });
  if (response && response.data && response.data.success) {
    return {
      props: {
        emailVerified: true,
        msg: response.data.message,
      },
    };
  } else
    return {
      props: {
        emailVerified: false,
        msg: response?.data?.message || "Cannot reach server",
      },
    };
}
