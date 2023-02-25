import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/stripe/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import PaymentsApi from "../../actions/apis/PaymentsApi";
import styles from "../../styles/payments/payment.module.scss";

function Payment() {
  const router = useRouter();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const { plan_id } = router.query;

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
    fetchStripeConfig();
    fetchCreatePaymentIntent();
  }, [plan_id]);

  return (
    <div className={styles.paymentPage}>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm {...{ plan_id }} />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
