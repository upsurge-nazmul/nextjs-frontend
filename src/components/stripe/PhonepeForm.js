import { useEffect, useState } from "react";
import PaymentsApi from "../../actions/apis/PaymentsApi";
import axios from "axios";

export default function PhonepeForm({ planId }) {
  const [plan, setPlan] = useState();

  async function fetchPlan() {
    const res = await PaymentsApi.getPlans({ plan_id: planId });
    if (res && res.data && res.data.success) {
      setPlan(res.data.data);
    }
  }

  useEffect(() => {
    fetchPlan();
  }, []);

  useEffect(() => {
    const data = btoa(
      JSON.stringify({
        merchantId: "UPSURGEUAT",
        merchantTransactionId: "ef310c0a-b984-11ed-afa1-0242ac120002",
        merchantUserId: "d780c37f-55e2-4aff-aaae-1d1ba93e0440",
        amount: 10000,
        redirectUrl: "https://webhook.site/redirect-url",
        redirectMode: "POST",
        callbackUrl: "https://webhook.site/callback-url",
        mobileNumber: "9999999999",
        paymentInstrument: {
          type: "PAY_PAGE",
        },
      })
    );
    const options = {
      method: "POST",
      url: "https://api-preprod.phonepe.com/apis/merchant-simulator/pg/v1/pay",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": `SHA256 (${data}/pg/v1/pay89efe538-f358-4a7f-959f-1d6edf953bde) + ### + 1`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api-preprod.phonepe.com/apis/merchant-simulator/pg/v1/status/UPSURGEUAT/OD620471739210623",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return <div>Payment method</div>;
}
