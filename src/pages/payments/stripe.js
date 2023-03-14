import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/stripe/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import PaymentsApi from "../../actions/apis/PaymentsApi";
import styles from "../../styles/payments/payment.module.scss";

function Payment() {
  const router = useRouter();
  const [plan, setPlan] = useState();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const { plan_id } = router.query;

  async function fetchPlanDetails() {
    const res = await PaymentsApi.getPlans({ plan_id });
    if (res && res.data && res.data.success) {
      setPlan(res.data.data);
    }
  }

  async function fetchStripeConfig() {
    const res = await PaymentsApi.getStripeConfig();
    if (res && res.statusText === "OK") {
      setStripePromise(loadStripe(res.data.publishableKey));
    }
  }

  async function fetchCreatePaymentIntent() {
    const res = await PaymentsApi.createStripePaymentIntent({
      plan_id,
    });
    if (res && res.statusText === "OK") {
      setClientSecret(res.data.clientSecret);
    }
  }

  useEffect(() => {
    if (plan_id) fetchPlanDetails();
  }, [plan_id]);

  useEffect(() => {
    fetchStripeConfig();
    fetchCreatePaymentIntent();
  }, [plan_id]);

  return (
    <div className={styles.paymentPage}>
      <div className={styles.content}>
        {plan && (
          <div className={styles.paymentDetails}>
            <div className={styles.title}>
              {plan.name} {plan.duration}
            </div>
            <div className={styles.subtitle}>
              <div className={styles.paymentLabel}>Amount: </div>
              <div className={styles.paymentValue}>{plan.amount}₹</div>
            </div>
          </div>
        )}
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm {...{ plan_id }} />
          </Elements>
        )}
      </div>
    </div>
  );
}

export default Payment;
