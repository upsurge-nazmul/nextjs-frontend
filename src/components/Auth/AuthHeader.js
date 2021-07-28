import React from "react";
import BackButton from "../../assets/backButton.svg";
import styles from "../../styles/Auth/auth.module.scss";

function AuthHeader({ handleBack, setmode, mode }) {
  return (
    <div className={styles.headingflex}>
      <p className={styles.heading}>
        {mode !== "login" ? (
          <img
            src={BackButton.src}
            className={styles.svg}
            onClick={() => handleBack()}
            alt=""
          />
        ) : null}
        {mode !== "login" ? "Sign Up" : "Login"}
      </p>
      {mode === "login" ? (
        <p className={styles.changemode}>
          No Account? <span onClick={() => setmode("selection")}>Sign Up</span>
        </p>
      ) : (
        <p className={styles.changemode}>
          Already have an account?{" "}
          <span onClick={() => setmode("login")}>Sign In</span>
        </p>
      )}
    </div>
  );
}

export default AuthHeader;
