import { CircularProgress } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { useState, useEffect } from "react";
import PaymentsApi from "../../actions/apis/PaymentsApi";

export default function PhonepePage() {
  const [plan, setPlan] = useState();
  const router = useRouter();
  const { plan_id } = router.query;

  async function fetchPlan() {
    const res = await PaymentsApi.getPlans({ plan_id });
    if (res && res.data && res.data.success) {
      setPlan(res.data.data);
    }
  }

  async function paymentInit() {
    const result = await PaymentsApi.getPhonePe({
      plan_id,
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

  return (
    <div
      style={{
        height: "100%",
        minHeight: "80vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={100} />
    </div>
  );
}
