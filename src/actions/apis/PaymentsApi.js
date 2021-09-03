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
const PaymentsApi = {
  createorder,
  savereceipt,
};

export default PaymentsApi;
