import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";
const addtocontactmsgs = (payload) => {
  return ApiCalls.postResponse(`users/addtocontactmsgs`, payload);
};
const signup = (payload) => {
  return ApiCalls.postResponse(`users/signup`, payload);
};
const getwaitlistdetails = (payload) => {
  return ApiCalls.getResponse(`users/getwaitlistdetails`, payload);
};
const unsub = (payload) => {
  return ApiCalls.postResponse(`users/unsubscribe`, payload);
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

const googlelogin = (payload) => {
  return ApiCalls.postResponse(`users/googlelogin`, payload);
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
const addtonewslettersubs = (payload) => {
  return ApiCalls.postResponse("users/addtonewslettersubs", payload);
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
const checkphone = (payload) => {
  return ApiCalls.postResponse(`users/checkphone`, payload);
};
const getuserbyid = (payload, token) => {
  return ApiCalls.getResponse("users/finduserbyid", payload, token);
};
const refer = (payload) => {
  return ApiCalls.postResponse(
    `users/refer`,
    payload,
    getCookie("accesstoken")
  );
};
const refersignup = (payload) => {
  return ApiCalls.postResponse("users/refersignup", payload);
};

const checkpasslink = (payload) => {
  return ApiCalls.getResponse("users/checkpasslink", payload);
};

const generatepass = (payload) => {
  return ApiCalls.postResponse("users/generatepassword", payload);
};

const getearlyaccess = (payload) => {
  return ApiCalls.postResponse("users/getearlyaccess", payload);
};

const resetpass = (payload) => {
  return ApiCalls.postResponse("users/resetpassword", payload);
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
  checkphone,
  googlelogin,
  getuserbyid,
  getwaitlistdetails,
  addtonewslettersubs,
  addtocontactmsgs,
  unsub,
  refer,
  refersignup,
  checkpasslink,
  generatepass,
  getearlyaccess,
  resetpass,
};

export default LoginApis;
