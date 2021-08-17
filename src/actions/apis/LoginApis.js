import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const signup = (payload) => {
  return ApiCalls.postResponse(`users/signup`, payload);
};

const setphone = (payload) => {
  return ApiCalls.postResponse(`users/setphone`, payload);
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

const checkemail = (payload) => {
  return ApiCalls.getResponse(`users/findByEmail`, payload);
};
const LoginApis = {
  signup,
  setphone,
  verifyotp,
  login,
  checktoken,
  saveemail,
  checkemail,
};

export default LoginApis;
