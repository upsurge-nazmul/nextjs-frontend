import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const createorder = (payload) => {
  return ApiCalls.postResponse(
    `payments/createorder`,
    payload,
    getCookie("accesstoken")
  );
};
const savereceipt = (payload) => {
  return ApiCalls.postResponse(
    "payments/savereceipt",
    payload,
    getCookie("accesstoken")
  );
};

const subscribe = (payload) => {
  return ApiCalls.postResponse(
    "payments/subscribe",
    payload,
    getCookie("accesstoken")
  );
};
const getpricing = (payload) => {
  return ApiCalls.getResponse("payments/getpricing", payload);
};
const getinvoice = (payload, token) => {
  return ApiCalls.getResponse("payments/invoice", payload, token);
};
const getStripeConfig = (payload) => {
  return ApiCalls.getResponse(
    "payments/stripe/config",
    payload,
    getCookie("accesstoken")
  );
};
const createStripePaymentIntent = (payload) => {
  return ApiCalls.postResponse(
    "payments/stripe/create-payment-intent",
    payload,
    getCookie("accesstoken")
  );
};

const updateSubscription = (payload, token = "") => {
  return ApiCalls.postResponse(
    "payments/addsubscription",
    payload,
    token || getCookie("accesstoken")
  );
};

const getSubscriptionDetails = (token = "") => {
  return ApiCalls.getResponse(
    "payments/subscriptionDetails",
    null,
    token || getCookie("accesstoken")
  );
};

const getPlans = (payload, token) => {
  return ApiCalls.getResponse("payments/plans", payload, token);
};

const getPhonePe = (payload, token = "") => {
  return ApiCalls.postResponse(
    "payments/phonepe",
    payload,
    token || getCookie("accesstoken")
  );
};

const checkPhonepeStatus = (payload, token = "") => {
  return ApiCalls.postResponse(
    "payments/phonepe/check-payment-status",
    payload,
    token || getCookie("accesstoken")
  );
};

const addTransactionRecord = (payload, token = "") => {
  return ApiCalls.postResponse(
    "payments/addTransactionRecord",
    payload,
    token || getCookie("accesstoken")
  );
};

const checkTransactionRecord = (payload, token = "") => {
  return ApiCalls.getResponse(
    "payments/checkTransactionRecord",
    payload,
    token || getCookie("accesstoken")
  );
};

const deleteTransactionRecord = (payload, token) => {
  return ApiCalls.getResponse(
    "payments/deleteTransactionRecord",
    payload,
    token || getCookie("accesstoken")
  );
};

const PaymentsApi = {
  createorder,
  savereceipt,
  subscribe,
  getpricing,
  getinvoice,
  getStripeConfig,
  createStripePaymentIntent,
  updateSubscription,
  getSubscriptionDetails,
  getPlans,
  getPhonePe,
  checkPhonepeStatus,
  addTransactionRecord,
  checkTransactionRecord,
  deleteTransactionRecord,
};

export default PaymentsApi;
