import { useEffect, useState, useContext } from "react";
import PaymentsApi from "../../actions/apis/PaymentsApi";
import { useRouter } from "next/router";

export default function PhonepeForm({ planId, userdata }) {
  const [plan, setPlan] = useState();
  const router = useRouter();
  async function fetchPlan() {
    const res = await PaymentsApi.getPlans({ plan_id: planId });
    if (res && res.data && res.data.success) {
      setPlan(res.data.data);
    }
  }

  async function paymentInit() {
    const result = await PaymentsApi.getPhonePe({
      userId: userdata.user_id,
      plan_id: planId,
      hostURL: window.location.origin,
    });
    console.log({ result });
    if (result && result.data) {
      router.push(
        result.data.redirectURL.data.instrumentResponse.redirectInfo.url
      );
    }
  }

  useEffect(() => {
    fetchPlan();
    paymentInit();
  }, []);

  return <div>Payment method</div>;
}
