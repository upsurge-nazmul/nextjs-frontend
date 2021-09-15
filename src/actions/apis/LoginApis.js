import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const signup = (payload) => {
  return ApiCalls.postResponse(`users/signup`, payload);
};

const logout = (payload) => {
  return ApiCalls.getResponse(
    "users/logout",
    payload,
    getCookie("accesstoken")
  );
};

const setphone = (payload) => {
  return ApiCalls.postResponse(
    `users/setphone`,
    payload,
    getCookie("accesstoken")
  );
};

const verifyotp = (payload) => {
  return ApiCalls.postResponse(
    `users/verifyotp`,
    payload,
    getCookie("accesstoken")
  );
};

const login = (payload) => {
  return ApiCalls.postResponse(`users/login`, payload);
};

const checktoken = (payload) => {
  return ApiCalls.postResponse(`users/checktoken`, payload, payload.token);
};
const saveemail = (payload) => {
  return ApiCalls.postResponse("users/saveemail", payload);
};
const checkemail = (payload) => {
  return ApiCalls.getResponse(`users/findByEmail`, payload);
};

const sendverificationemail = (payload) => {
  return ApiCalls.postResponse(
    "users/sendemail",
    payload,
    getCookie("accesstoken")
  );
};

const verifyemailtoken = (payload) => {
  return ApiCalls.postResponse("users/verifyemailtoken", payload);
};

const genotp = (payload) => {
  return ApiCalls.postResponse(
    `users/generateOtp`,
    payload,
    getCookie("accesstoken")
  );
};

const LoginApis = {
  signup,
  setphone,
  verifyotp,
  login,
  checktoken,
  saveemail,
  checkemail,
  logout,
  genotp,
  verifyemailtoken,
  sendverificationemail,
};

export default LoginApis;
