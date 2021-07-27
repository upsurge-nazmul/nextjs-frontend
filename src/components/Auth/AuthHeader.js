import React from "react";
import BackButton from "../../assets/backButton.svg";

function AuthHeader({ handleBack, setmode, mode }) {
  return (
    <div className="headingflex">
      <p className="heading">
        {mode !== "login" ? (
          <img
            src={BackButton.src}
            className="svg"
            onClick={() => handleBack()}
            alt=""
          />
        ) : null}
        {mode !== "login" ? "Sign Up" : "Login"}
      </p>
      {mode === "login" ? (
        <p className="changemode">
          No Account? <span onClick={() => setmode("selection")}>Sign Up</span>
        </p>
      ) : (
        <p className="changemode">
          Already have an account?{" "}
          <span onClick={() => setmode("login")}>Sign In</span>
        </p>
      )}
    </div>
  );
}

export default AuthHeader;
