import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/GeneralComponents/otp.module.scss";
export default function OTPCustomComponent({ resetotp, size, setotp }) {
  const [otpdata, setotpdata] = useState(new Array(size).fill(""));
  const [currentfocused, setcurrentfocused] = useState(0);
  useEffect(() => {
    let first = document.getElementById("Character0");
    if (first) {
      first.focus();
    }
  }, []);
  useEffect(() => {
    if (resetotp) {
      setotpdata(new Array(size).fill(""));
    }
  }, [resetotp]);
  useEffect(() => {
    setotp(getstring());
    function getstring() {
      let res = "";
      for (let i = 0; i < otpdata.length; i++) {
        res = res + otpdata[i];
      }
      return res;
    }
  }, [otpdata]);

  return (
    <div className={styles.otpwrapper}>
      {otpdata.map((item, index) => {
        return (
          <input
            id={"Character" + index}
            autoComplete="off"
            type="number"
            key={"otpinput" + index}
            maxLength={1}
            onFocus={() => {
              if (currentfocused !== index) {
                setcurrentfocused(index);
              }
            }}
            onClick={() => {
              if (otpdata[index]) {
                let newotparray = JSON.parse(JSON.stringify(otpdata));
                newotparray[index] = "";
                setotpdata(newotparray);
              }
            }}
            value={otpdata[index] || ""}
            onInput={(e) => {
              if (!e.target.value || isNaN(e.target.value)) {
                return;
              }
              let newotparray = JSON.parse(JSON.stringify(otpdata));
              newotparray[index] = e.target.value;
              setotpdata(newotparray);
              if (!(currentfocused === size - 1)) {
                let nextcomp = document.getElementById(
                  "Character" + (currentfocused + 1)
                );
                setcurrentfocused((prev) => prev + 1);
                if (nextcomp) {
                  nextcomp.focus();
                }
              }
            }}
            onKeyPress={(e) => {
              if (otpdata[index]) {
                if (!e.key || isNaN(e.key)) {
                  return;
                }
                let newotparray = JSON.parse(JSON.stringify(otpdata));
                newotparray[index] = e.key;
                setotpdata(newotparray);
                if (!(currentfocused === size - 1)) {
                  let nextcomp = document.getElementById(
                    "Character" + (currentfocused + 1)
                  );
                  setcurrentfocused((prev) => prev + 1);
                  if (nextcomp) {
                    nextcomp.focus();
                  }
                }
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                if (!(currentfocused === size - 1)) {
                  let nextcomp = document.getElementById(
                    "Character" + (currentfocused + 1)
                  );
                  setcurrentfocused((prev) => prev + 1);
                  if (nextcomp) {
                    nextcomp.focus();
                  }
                }
              }
              if (e.key === "ArrowLeft") {
                if (!(currentfocused === 0)) {
                  let nextcomp = document.getElementById(
                    "Character" + (currentfocused - 1)
                  );
                  setcurrentfocused((prev) => prev - 1);
                  if (nextcomp) {
                    nextcomp.focus();
                  }
                }
              }
              if (e.key === "Backspace") {
                if (otpdata[index]) {
                  let newotparray = JSON.parse(JSON.stringify(otpdata));
                  newotparray[index] = "";
                  setotpdata(newotparray);
                }
                if (!(currentfocused === 0)) {
                  let nextcomp = document.getElementById(
                    "Character" + (currentfocused - 1)
                  );
                  setcurrentfocused((prev) => prev - 1);
                  if (nextcomp) {
                    nextcomp.focus();
                  }
                }
              }
            }}
          />
        );
      })}
    </div>
  );
}
