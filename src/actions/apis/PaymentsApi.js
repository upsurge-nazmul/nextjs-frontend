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

const PaymentsApi = {
  createorder,
  savereceipt,
  subscribe,
  getpricing,
  getinvoice,
};

export default PaymentsApi;
