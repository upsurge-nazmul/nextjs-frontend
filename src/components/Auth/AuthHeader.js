import React from "react";
import styles from "../../styles/Auth/auth.module.scss";
import BackButtonSvg from "../SVGcomponents/BackButtonSvg";

function AuthHeader({ handleBack, setmode, mode }) {
  return (
    <div className={styles.headingflex}>
      <p className={styles.heading}>
        {mode !== "login" ? (
          <BackButtonSvg className={styles.svg} onClick={() => handleBack()} />
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
