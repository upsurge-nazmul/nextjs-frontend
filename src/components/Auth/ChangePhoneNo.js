import { useState } from "react";
import styles from "../../styles/Auth/changePhone.module.scss";
import Spinner from "../Spinner";
import validator from "validator";
import LoginApis from "../../actions/apis/LoginApis";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
export default function ChangePhoneNo({
  phone,
  email,
  setphone,
  error,
  seterror,
  settoastdata,
  setmode,
  setshowmodal,
}) {
  const [newPhone, setNewPhone] = useState(phone);
  const [loading, setloading] = useState(false);

  const changePhoneNo = async () => {
    setloading(true);
    if (!validator.isMobilePhone(newPhone, "en-IN")) {
      seterror("Invalid Phone");
      setloading(false);
      return;
    }
    let checkphone = await LoginApis.checkphone({ phone: newPhone });
    if (checkphone && checkphone.data && checkphone.data.success) {
      let updatedPhoneRes = await LoginApis.updatePhoneByEmail({
        email,
        oldPhone: phone,
        newPhone,
      });
      if (
        updatedPhoneRes &&
        updatedPhoneRes.data &&
        updatedPhoneRes.data.success
      ) {
        mixpanel.track('ChangePhoneno',{'event':'Phone number changed OTP pending'});
        fbq('trackCustom', 'ChangePhoneno', {event: 'Phone_number_changed'});
        dataLayer.push({'event':'phoneno-change-successful'});
        let otpRes = await LoginApis.genotp({ phone: newPhone });
        if (otpRes.data.success) {
          settoastdata({
            show: true,
            msg: otpRes.data.message,
            type: "success",
          });
        } else {
          setloading(false);
          seterror(otpRes.data.message || "Cannot reach server");
        }
        setphone(newPhone);
        setmode("otp");
        setloading(false);
      } else {
        seterror(updatedPhoneRes?.data.message || "Error connecting to server");
        setloading(false);
        return;
      }
    } else {
      seterror(checkphone?.data.message || "Error connecting to server");
      setloading(false);
      return;
    }
  };

  return (
    <div className={styles.changePhone}>
      <div className={styles.heading}>
        Please edit your phone number and continue
      </div>
      <div className={styles.phoneWrapper}>
        <p>+91</p>{" "}
        <input
          className={styles.inputText}
          type="text"
          placeholder="Phone"
          value={newPhone}
          maxLength={10}
          onChange={(e) => {
            if (!isNaN(e.target.value)) setNewPhone(e.target.value);
          }}
        />
      </div>
      {!loading ? (
        <div className={`${styles.button}`} onClick={changePhoneNo}>
          Continue
        </div>
      ) : (
        <div className={`${styles.button} ${styles.spinner_btn}`}>
          <Spinner />
        </div>
      )}
    </div>
  );
}
