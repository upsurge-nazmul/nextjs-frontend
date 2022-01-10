import PaymentsApi from "./apis/PaymentsApi";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export default async function displayRazorpay(
  name,
  description,
  amount,
  setsuccess,
  type,
  seterror
) {
  const ress = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  let transactionComplete = false;
  if (!ress) {
    seterror("Razorpay SDK failed to load. Are you online?");
    return;
  }
  const res = await PaymentsApi.createorder({ amount, type, name });
  if (!res.data.success) {
    seterror(res?.data?.message ?? "error creating order");
    return;
  }
  const options = {
    key: "rzp_test_DSVdUEMf77fQrM",
    currency: res.data.data.currency,
    amount: res.data.data.amount.toString(),
    order_id: res.data.data.id,
    name,
    description,
    image: "http://localhost:3000/logo.webp",
    handler: async function (response) {
      const saveresponse = await PaymentsApi.savereceipt({
        data: {
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
          id: res.data.data.receipt,
          amount: res.data.data.amount / 100,
          currency: res.data.data.currency,
        },
      });
      if (saveresponse.data.success) {
        if (type === "Subscription") {
          PaymentsApi.subscribe({
            receipt_id: res.data.data.receipt,
            amount: amount,
            subscription: name,
          });
        }
        setsuccess(true);
      } else {
        seterror("saving receipt failed");
      }
    },
    prefill: {
      name: "tushar",
      email: "sdfdsjfh2@ndsfdf.com",
      contact: "9899999999",
    },
    theme: { color: "#4166EB" },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
  paymentObject.on("payment.failed", function (response) {
    alert(response.error.description);
  });
}
