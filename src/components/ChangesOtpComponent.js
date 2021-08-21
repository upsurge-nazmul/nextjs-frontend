import React, { useEffect, useRef, useState } from "react";
import LoginApis from "../actions/apis/LoginApis";
import styles from "../styles/GeneralComponents/changesotpcomponent.module.scss";

export default function ChangesOtpComponent({
  phone,
  password,
  settoastdata,
  onBack,
  handleSave,
}) {
  const inputref1 = useRef();
  const inputref2 = useRef();
  const inputref3 = useRef();
  const inputref4 = useRef();
  const [activeInput, setActiveInput] = useState(0);
  const [otpValues, setOTPValues] = useState(["", "", "", ""]);

  useEffect(() => {
    if (activeInput === 0) {
      if (inputref1.current) {
        inputref1.current.focus();
        inputref1.current.select();
      }
    }
    if (activeInput === 1) {
      if (inputref2.current) {
        inputref2.current.focus();
        inputref2.current.select();
      }
    }
    if (activeInput === 2) {
      if (inputref3.current) {
        inputref3.current.focus();
        inputref3.current.select();
      }
    }
    if (activeInput === 3) {
      if (inputref4.current) {
        inputref4.current.focus();
        inputref4.current.select();
      }
    }
  }, [activeInput]);
  function handleOtp(e, index) {
    if (!isNaN(e.target.value)) {
      let curretOtp = [...otpValues];
      curretOtp[index] = e.target.value;
      setOTPValues(curretOtp);
      if (index !== 3 && e.target.value !== "" && e.target.value !== " ")
        setActiveInput(index + 1);
    }
  }
  function handleKeyDown(e, index) {
    console.log(e.code);
    if (e.code === "ArrowLeft") {
      if (index !== 0) setActiveInput(index - 1);
    } else if (e.code === "ArrowRight") {
      if (index !== 3) setActiveInput(index + 1);
    } else if (e.code === "Backspace") {
      if (e.target.value === "" && index !== 0) setActiveInput(index - 1);
    }
  }
  function handleOnPaste(e, index) {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .trim()
      .slice(0, 4 - activeInput)
      .split("");
    setOTPValues(pastedData);
  }
  async function verifyOtp() {
    let otp = otpValues[0] + otpValues[1] + otpValues[2] + otpValues[3];
    let response = await LoginApis.verifyotp({ otp, phone });
    if (response.data.success) {
      handleSave();
      onBack();
    } else {
      settoastdata({ show: true, msg: "Error", type: "error" });
    }
  }

  return (
    <div className={styles.changesotpcomponent}>
      <div className={styles.background} onClick={onBack} />
      <div className={styles.otp}>
        <div className={styles.heading}>
          <svg
            onClick={onBack}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 23.375C18.2816 23.375 23.375 18.2816 23.375 12C23.375 5.71836 18.2816 0.625001 12 0.625001C5.71836 0.625 0.625 5.71836 0.624999 12C0.624999 18.2816 5.71836 23.375 12 23.375ZM8.34121 11.8248L13.8865 7.79023C13.9169 7.76839 13.9528 7.75535 13.9901 7.75254C14.0274 7.74974 14.0648 7.75728 14.0981 7.77433C14.1315 7.79139 14.1594 7.8173 14.179 7.84922C14.1985 7.88114 14.2089 7.91784 14.209 7.95527L14.209 16.0193C14.2091 16.0568 14.1988 16.0937 14.1793 16.1257C14.1598 16.1577 14.1318 16.1837 14.0984 16.2008C14.065 16.2179 14.0275 16.2254 13.9901 16.2225C13.9527 16.2196 13.9169 16.2064 13.8865 16.1844L8.34121 12.1523C8.31501 12.1338 8.29364 12.1093 8.27889 12.0808C8.26414 12.0523 8.25644 12.0207 8.25644 11.9886C8.25644 11.9565 8.26414 11.9249 8.27889 11.8964C8.29364 11.8679 8.31501 11.8433 8.34121 11.8248Z"
              fill="#CCCCCC"
            />
          </svg>
          Change Phone Number
        </div>
        <div className={styles.otpHeadWrapper}>
          <p className={styles.text}>Enter the 4-digit code sent to you at</p>
          <p className={styles.phone}>{"+91 " + phone}</p>
        </div>
        <div className={styles.otpWrapper} id="otpWrapper">
          {otpValues.map((item, index) => {
            return (
              <input
                key={"otpcomponent" + index}
                type="text"
                placeholder=""
                maxLength="1"
                ref={
                  index === 0
                    ? inputref1
                    : index === 1
                    ? inputref2
                    : index === 2
                    ? inputref3
                    : index === 3
                    ? inputref4
                    : null
                }
                value={otpValues && otpValues[index]}
                onChange={(e) => handleOtp(e, index)}
                onPaste={(e) => handleOnPaste(e, index)}
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            );
          })}
        </div>
        <div className={styles.resendButton}>Resend OTP</div>
        <div className={styles.button} onClick={() => verifyOtp()}>
          Continue
        </div>
      </div>
    </div>
  );
}
