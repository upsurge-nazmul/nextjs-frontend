import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";
const getschools = (payload, token) => {
  return ApiCalls.getResponse("users/schools", payload, token);
};
const getuserdata = (payload, token) => {
  return ApiCalls.getResponse(`users/getprofile`, payload, token);
};
const getChildDetails = (payload, token) => {
  return ApiCalls.getResponse(`parent/getchilddata`, payload, token);
};
const getchildrequests = (payload, token) => {
  return ApiCalls.getResponse(`parent/childrequests`, payload, token);
};
const updateprofile = (payload) => {
  return ApiCalls.postResponse(
    "users/updateprofile",
    payload,
    getCookie("accesstoken")
  );
};
const updateparent = (payload) => {
  return ApiCalls.postResponse(
    "users/parent_signup",
    payload,
    getCookie("accesstoken")
  );
};

const updatechildprofile = (payload) => {
  return ApiCalls.postResponse(
    "users/updatechildprofile",
    payload,
    getCookie("accesstoken")
  );
};
const addkids = (payload) => {
  return ApiCalls.postResponse(
    `parent/addchild`,
    payload,
    getCookie("accesstoken")
  );
};
const editkids = (payload) => {
  return ApiCalls.postResponse(
    `parent/updatechild`,
    payload,
    getCookie("accesstoken")
  );
};
const getkids = (payload, token) => {
  return ApiCalls.getResponse(`parent/getchildren`, payload, token);
};
const getgames = (payload, token) => {
  return ApiCalls.getResponse(`parent/getgames`, payload, token);
};
const getliveclasses = (payload, token) => {
  return ApiCalls.getResponse(`parent/getliveclasses`, payload, token);
};
const getallavatars = (payload, token) => {
  return ApiCalls.getResponse(`parent/getavailableavatars`, payload, token);
};
const getallbadges = (payload, token) => {
  return ApiCalls.getResponse(`parent/getavailablebadges`, payload, token);
};
const getallvouchers = (payload, token = getCookie("accesstoken")) => {
  return ApiCalls.postResponse(`voucher/vouchers`, payload, token);
};
const ordervouchers = (payload) => {
  return ApiCalls.postResponse(
    "voucher/order",
    payload,
    getCookie("accesstoken")
  );
};
const rewardunicoinstochild = (payload, token) => {
  return ApiCalls.postResponse(
    `users/rewardunicoins`,
    payload,
    token || getCookie("accesstoken")
  );
};
const completeintroguide = () => {
  return ApiCalls.getResponse(
    "users/completeintroguide",
    {},
    getCookie("accesstoken")
  );
};
const getuservouchers = (payload, token) => {
  return ApiCalls.getResponse(
    "voucher/uservouchers",
    payload,
    token || getCookie("accesstoken")
  );
};
const deletechild = (payload) => {
  return ApiCalls.deleteResponse(
    "parent/deletechild",
    payload,
    getCookie("accesstoken")
  );
};

const convertUnicoins = (payload) => {
  return ApiCalls.postResponse(
    "users/convertunicoins",
    payload,
    getCookie("accesstoken")
  );
};
const completerequest = (payload) => {
  return ApiCalls.postResponse(
    "parent/completerequest",
    payload,
    getCookie("accesstoken")
  );
};
const deleterequest = (payload) => {
  return ApiCalls.postResponse(
    "parent/deleterequest",
    payload,
    getCookie("accesstoken")
  );
};

const searchuser = (payload, token) => {
  return ApiCalls.getResponse("users/searchuser", payload, token);
};

const markwelcomecomplete = (payload, token) => {
  return ApiCalls.putResponse("users/markwelcomecomplete", payload, token);
};

const getoverallleaderboard = (payload) => {
  return ApiCalls.getResponse(
    "users/overallleaderboard",
    payload,
    getCookie("accesstoken")
  );
};

const createVerificationOtp = (payload) => {
  return ApiCalls.postResponse(
    "users/createVerificationOtp",
    payload,
    getCookie("accesstoken")
  );
};
const getTodo = (payload, token) => {
  return ApiCalls.getResponse(
    "users/todo",
    payload,
    token || getCookie("accesstoken")
  );
};
//getchores
const DashboardApis = {
  addkids,
  getkids,
  getgames,
  getliveclasses,
  getuserdata,
  updateprofile,
  getallavatars,
  getallbadges,
  getallvouchers,
  editkids,
  deletechild,
  getChildDetails,
  ordervouchers,
  getuservouchers,
  convertUnicoins,
  getchildrequests,
  completerequest,
  updatechildprofile,
  searchuser,
  getschools,
  markwelcomecomplete,
  getoverallleaderboard,
  createVerificationOtp,
  getTodo,
  completeintroguide,
  rewardunicoinstochild,
  deleterequest,
  updateparent,
};

export default DashboardApis;
