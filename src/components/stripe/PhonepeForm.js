import { useEffect, useState } from "react";
import PaymentsApi from "../../actions/apis/PaymentsApi";
import axios from "axios";
import crypto from "crypto";

export default function PhonepeForm({ planId }) {
  const [plan, setPlan] = useState();

  async function fetchPlan() {
    const res = await PaymentsApi.getPlans({ plan_id: planId });
    if (res && res.data && res.data.success) {
      setPlan(res.data.data);
    }
  }

  function computeSHA256(lines) {
    const hash = crypto.createHash("sha256");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim(); // remove leading/trailing whitespace
      if (line === "") continue; // skip empty lines
      hash.write(line); // write a single line to the buffer
    }

    return hash.digest("base64"); // returns hash as string
  }

  async function paymentInit() {
    const data = Buffer.from(
      `{
      "merchantId": "UPSURGEUAT",
      "merchantTransactionId": "ef310ggkgkjjkjhjkc0a-b984-11ed-afa1-0242ac120002PRATHAM",
      "merchantUserId": "d780c37f-55e2-4aff-ghjgfjsgsjjsjaaae-1d1ba93e0440PRATHAM",
      "amount": 10000,
      "redirectUrl": "http://localhost:3000/test",
      "redirectMode": "POST",
      "callbackUrl": "http://localhost:3000/callback-url",
      "mobileNumber": "9999999999",
      "paymentInstrument": {
        "type": "TOKEN"
      }
    }`
    ).toString("base64");

    const hash = crypto
      .createHash("sha256")
      .update(data + "/pg/v1/pay89efe538-f358-4a7f-959f-1d6edf953bde")
      .digest("hex");

    const options = {
      method: "POST",
      url: "https://api-preprod.phonepe.com/apis/merchant-simulator/pg/v1/pay",
      data: {
        request: data,
      },
      mode: "no-cors",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": `${hash}###1`,
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
  }

  useEffect(() => {
    fetchPlan();
    paymentInit();
  }, []);

  useEffect(() => {
    const xVerify =
      crypto
        .createHash("sha256")
        .update(
          "/pg/v1/status/UPSURGEUAT/OD620471739210623pay89efe538-f358-4a7f-959f-1d6edf953bde"
        )
        .digest("hex") + "###1";
    const options = {
      method: "GET",
      url: "https://cors-anywhere.herokuapp.com/https://api-preprod.phonepe.com/apis/merchant-simulator/pg/v1/status/UPSURGEUAT/OD620471739210623",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
        "X-MERCHANT-ID": "UPSURGEUAT",
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
