import * as ApiCalls from "../ApiCalls";

const signup = (payload) => {
  return ApiCalls.postResponse(`users/signup`, payload);
};

const setphone = (payload) => {
  return ApiCalls.postResponse(`users/setphone`, payload);
};

const verifyotp = (payload) => {
  return ApiCalls.postResponse(`users/verifyotp`, payload);
};

const login = (payload) => {
  return ApiCalls.postResponse(`users/login`, payload);
};

const checktoken = (payload) => {
  return ApiCalls.postResponse(`users/checktoken`, payload, payload.token);
};
const LoginApis = {
  signup,
  setphone,
  verifyotp,
  login,
  checktoken,
};

export default LoginApis;
