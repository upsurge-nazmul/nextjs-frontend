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

  const { amount } = router.query;

  async function fetchStripeConfig() {
    const res = await PaymentsApi.getStripeConfig();
    if (res && res.statusText === "OK") {
      setStripePromise(loadStripe(res.data.publishableKey));
    }
  }

  async function fetchCreatePaymentIntent(amount) {
    const res = await PaymentsApi.createStripePaymentIntent({
      amount: amount * 100, // Amount should be in 'Cents'
    });
    if (res && res.statusText === "OK") {
      setClientSecret(res.data.clientSecret);
    }
  }

  useEffect(() => {
    fetchStripeConfig();
    fetchCreatePaymentIntent(amount);
  }, [amount]);

  return (
    <div className={styles.paymentPage}>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            {...{ amount: amount, bundle: "Premium", subscription: "Yearly" }} // Subscription= 'Yearly'/ 'Half-Yearly' / 'Monthly
          />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
