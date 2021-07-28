import React from "react";
import styles from "../../styles/Auth/auth.module.scss";

function AuthPhone({ phone, setphone, setmode }) {
  return (
    <div className={styles.phone}>
      <div className={styles.phoneWrapper}>
        <p>+91</p>
        <input
          type="text"
          onChange={(e) => setphone(e.target.value)}
          value={phone}
          placeholder="Phone"
        />
      </div>

      <div className={styles.button} onClick={() => setmode("otp")}>
        Continue
      </div>
    </div>
  );
}

export default AuthPhone;
