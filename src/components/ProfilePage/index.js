import { useState } from "react";
import styles from "../../styles/EditProfile/profilePage.module.scss";
import Info from "./Info";
import Bio from "./Bio";
import OtpNotVerfied from "../Auth/OtpNotVerified";
import LoginApis from "../../actions/apis/LoginApis";

export default function ProfilePage({ data, settoastdata, childavatars }) {
  const [openPhoneVerification, setopenPhoneVerification] = useState(false);

  async function resendVerificationEmail() {
    let verifypayload = {
      userid: data?.user_id,
      email: data?.parent_email,
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
  }

  async function resendPhoneOtp() {
    let response = await LoginApis.genotp({ phone: data?.parent_phone });
    if (response && response.data && response.data.success) {
      setopenPhoneVerification(true);
      settoastdata({ show: true, msg: response.data.message, type: "success" });
    } else {
      console.log(response.data.message || "Cannot connect to server");
    }
  }

  return (
    <div className={styles.mainContent}>
      <Info {...{ data, settoastdata }} />
      <Bio
        {...{
          data,
          emailVerificationHandler: resendVerificationEmail,
          phoneVerificationHandler: resendPhoneOtp,
          childavatars,
          settoastdata,
        }}
      />
      {openPhoneVerification && (
        <OtpNotVerfied
          setshowOTP={setopenPhoneVerification}
          userphone={data?.parent_phone}
          email={data?.parent_email}
          setphoneverified={() => {}}
        />
      )}
    </div>
  );
}
