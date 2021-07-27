import React from "react";

function AuthSelection({ setmode, setusertype }) {
  return (
    <div className="selection">
      <div
        className="option"
        onClick={() => {
          setmode("learner");
          setusertype("child");
        }}
      >
        <p> I'm a </p>
        <h1> Learner</h1>
      </div>
      <div
        className="option"
        onClick={() => {
          setusertype("parent");
          setmode("parent");
        }}
      >
        <p> I'm a </p>
        <h1> Parent</h1>
      </div>
    </div>
  );
}

export default AuthSelection;
