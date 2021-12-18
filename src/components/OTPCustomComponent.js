import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/GeneralComponents/otp.module.scss";
export default function OTPCustomComponent({ size, otp, setotp }) {
  const [otpdata, setotpdata] = useState(new Array(size).fill(""));
  const ref = useRef();
  const [currentfocused, setcurrentfocused] = useState(0);
  useEffect(() => {
    console.log(otpdata);
  }, [otpdata]);
  useEffect(() => {
    let first = document.getElementById("Character0");
    if (first) {
      first.focus();
    }
  }, []);

  return (
    <div className={styles.otpwrapper}>
      {otpdata.map((item, index) => {
        return (
          <input
            id={"Character" + index}
            autoComplete="off"
            type="text"
            maxLength="1"
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
            }}
          />
        );
      })}
    </div>
  );
}
