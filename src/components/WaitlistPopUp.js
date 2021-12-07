import React, { useState } from "react";
import styles from "../styles/GeneralComponents/waitlistpopup.module.scss";
import validator from "validator";
import LoginApis from "../actions/apis/LoginApis";
import { useRouter } from "next/dist/client/router";

export default function WaitlistPopUp({ email, setemail, setshowpopup }) {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [error, seterror] = useState("");
  const [phone, setphone] = useState("");
  const router = useRouter();
  async function handleUpdateData() {
    if (!validator.isMobilePhone(phone, "en-IN")) {
      seterror("Invalid Phone");
      return;
    }
    let checkphone = await LoginApis.checkphone({ phone });
    if (checkphone && checkphone.data && checkphone.data.success) {
      console.log("phone ok");
    } else {
      seterror(checkphone?.data.message || "Error connecting to server");
      return;
    }
    if (!firstName) {
      seterror("First name is required");
      return;
    }
    let response = await LoginApis.saveemail({
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    });

    if (!response || !response.data.success) {
      seterror(response.data.message || "Error connecting to server");
    } else {
      router.push("/waitlist/" + email);
    }
  }
  return (
    <div className={styles.waitlistpopup}>
      <div
        className={styles.background}
        onClick={() => setshowpopup(false)}
      ></div>
      <div className={styles.block}>
        <p className={styles.heading}>We need some more information</p>
        <input
          type="text"
          placeholder="youremail@gmail.com"
          value={email}
          setvalue={setemail}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <div className={styles.phoneWrapper}>
          <p>+91</p>{" "}
          <input
            type="text"
            placeholder="Phone*"
            value={phone}
            maxLength={10}
            onChange={(e) => {
              if (!isNaN(e.target.value)) setphone(e.target.value);
            }}
          />
        </div>
        <div className={styles.nameWrapper}>
          <input
            type="text"
            placeholder="First Name*"
            maxLength={10}
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          />
          <input
            maxLength={10}
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.button} onClick={() => handleUpdateData()}>
          Join
        </div>
      </div>
    </div>
  );
}
