import React from "react";

function AuthPhone({ phone, setphone, setmode }) {
  return (
    <div className="phone">
      <div className="phoneWrapper">
        <p>+91</p>
        <input
          type="text"
          onChange={(e) => setphone(e.target.value)}
          value={phone}
          placeholder="Phone"
        />
      </div>

      <div className="button" onClick={() => setmode("otp")}>
        Continue
      </div>
    </div>
  );
}

export default AuthPhone;
