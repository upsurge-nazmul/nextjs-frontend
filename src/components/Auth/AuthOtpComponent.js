import React, { useEffect, useRef, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";

function AuthOtpComponent({
  phone,
  email,
  password,
  setuserdata,
  settoastdata,
  setmode,
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
    let response = await LoginApis.verifyotp({ otp });
    if (response.data.success) {
      setuserdata(response.data.data.user);
      settoastdata({ show: true, msg: response.data.message, type: "success" });
      localStorage.setItem("islogged", true);
      setmode("privacy");
    } else {
      settoastdata({ show: true, msg: response.data.message, type: "error" });
    }
  }

  return (
    <div className="otp">
      <div className="otpHeadWrapper">
        <p className="text">Enter the 4-digit code sent to you at</p>
        <p className="phone">{"+91 " + phone}</p>
      </div>
      <div className="otpWrapper" id="otpWrapper">
        {otpValues.map((item, index) => {
          console.log("active", index, activeInput === index);
          return (
            <input
              type="text"
              placeholder=""
              maxlength="1"
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
      <div className="resendButton">Resend OTP</div>
      <div className="button" onClick={() => verifyOtp()}>
        Continue
      </div>
    </div>
  );
}

export default AuthOtpComponent;
