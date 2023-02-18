import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/stripe/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import PaymentsApi from "../../actions/apis/PaymentsApi";

function Payment() {
  const router = useRouter();
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  async function fetchStripeConfig() {
    const res = await PaymentsApi.getStripeConfig();
    if (res && res.statusText === "OK") {
      setStripePromise(loadStripe(res.data.publishableKey));
    }
  }

  async function fetchCreatePaymentIntent() {
    const res = await PaymentsApi.createStripePaymentIntent({
      amount: router.query.amount,
    });
    if (res && res.statusText === "OK") {
      setClientSecret(res.data.clientSecret);
    }
  }

  useEffect(() => {
    fetchStripeConfig();
    fetchCreatePaymentIntent();
  }, []);

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
