import React from "react";
import { ReactComponent as Mascot } from "../../assets/mascot.svg";
function AuthLearner() {
  return (
    <div className="learner">
      <div className="top">
        <div className="left">
          <p>Howdy</p>
          <h1>learner</h1>
        </div>
        <Mascot className="mascot" />
      </div>
      <div className="bottom">
        <p>We currently only allow parents to sign up and add their kids.</p>
        <h1>Please ask your parent to create an account for you.</h1>
      </div>
    </div>
  );
}

export default AuthLearner;
