import React from "react";
import PaymentsApi from "../../actions/apis/PaymentsApi";
import displayRazorpay from "../../actions/RazorPay";
function Temp() {
  return (
    <div>
      <button
        onClick={() =>
          displayRazorpay("Avatar", "This is some awesome avatar.")
        }
      >
        Pay
      </button>
    </div>
  );
}

export default Temp;
