import React from "react";
import styles from "../../styles/Auth/auth.module.scss";
import BackButtonSvg from "../SVGcomponents/BackButtonSvg";

function AuthHeader({
  handleBack,
  setmode,
  mode,
  setshowpopup,
  setshowauth,
  onlyLogin,
}) {
  return (
    <div className={styles.headingflex}>
      <p className={styles.heading}>
        {mode !== "login" ? (
          <BackButtonSvg className={styles.svg} onClick={() => handleBack()} />
        ) : null}
        {mode !== "login"
          ? mode === "reset"
            ? "Forgot Password"
            : "Sign Up"
          : "Login"}
      </p>
      {/* {mode !== "reset" &&
        (mode === "login" ? (
          !onlyLogin && (
            <p className={styles.changemode}>
              No Account?{" "}
              <span
                onClick={() => {
                  setmode("parent");
                }}
              >
                Sign up
              </span>
            </p>
          )
        ) : (
          <p className={styles.changemode}>
            Already have an account?{" "}
            <span onClick={() => setmode("login")}>Sign In</span>
          </p>
        ))} */}
      {!onlyLogin & (mode !== "reset") & (mode === "login") ? (
        <div className={styles.changemode} onClick={() => setmode("reset")}>
          <span> Forgot password?</span>
        </div>
      ) : null}
    </div>
  );
}

export default AuthHeader;
