import React from "react";
import styles from "../../styles/Auth/auth.module.scss";
import BackButtonSvg from "../SVGcomponents/BackButtonSvg";

function AuthHeader({ handleBack, setmode, mode }) {
  return (
    <div className={styles.headingflex}>
      <p
        className={`${styles.heading} ${
          mode === "reset" && styles.forgetheading
        }`}
      >
        {mode !== "login" ? (
          <BackButtonSvg className={styles.svg} onClick={() => handleBack()} />
        ) : null}
        {mode !== "login"
          ? mode === "reset"
            ? "Forgot password"
            : " Join"
          : "Login"}
      </p>
      {mode !== "reset" && mode === "login" ? (
        <p className={styles.changemode}>
          No Account?{" "}
          <span onClick={() => setmode("parent")}>Get early access</span>
        </p>
      ) : (
        mode !== "reset" && (
          <p className={styles.changemode}>
            Already have an account?{" "}
            <span onClick={() => setmode("login")}>Sign In</span>
          </p>
        )
      )}
    </div>
  );
}

export default AuthHeader;
