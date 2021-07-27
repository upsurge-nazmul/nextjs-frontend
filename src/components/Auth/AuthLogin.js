import React, { useState } from "react";
import google from "../../assets/google.svg";
import apple from "../../assets/apple.svg";
import LoginApis from "../../actions/apis/LoginApis";
import validator from "validator";
import { useRouter } from "next/dist/client/router";

function AuthLogin({ settoastdata }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [passhidden, setpasshidden] = useState(true);
  const history = useRouter();
  // login Function
  async function handleSignin() {
    if (password === "" || !validator.isEmail(email)) {
      settoastdata({
        show: true,
        msg: "Enter password and email",
        type: "error",
      });
      return;
    }

    // temp changes
    let response = await LoginApis.login({ email, password });
    if (response.data && response.data.success) {
      localStorage.setItem("islogged", true);
      localStorage.setItem("accesstoken", response.data.data.token);
      settoastdata({
        show: true,
        msg: response.data.message,
        type: "success",
      });
      localStorage.setItem("islogged", true);
      history.push("/dashboard");
    } else {
      settoastdata({ show: true, msg: response.data.message, type: "error" });
    }
  }

  return (
    <div className="logindetails">
      <input
        type="text"
        placeholder="Username/Email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <div className="passwordBox">
        <input
          type={passhidden ? "password" : "text"}
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <p className="show" onClick={() => setpasshidden(!passhidden)}>
          {passhidden ? "Show" : "Hide"}
        </p>
      </div>
      <div className="button" onClick={handleSignin}>
        Sign In
      </div>
      <div className="or">OR</div>
      <div className="google">
        <img src={google.src} alt="" />
        <p>Continue with Google</p>
      </div>
      <div className="apple">
        <img src={apple.src} alt="" />
        <p>Continue with Apple</p>
      </div>
      <div className="reset">
        Forgot your <span>Username</span> or <span>Password</span>?
      </div>
    </div>
  );
}

export default AuthLogin;
