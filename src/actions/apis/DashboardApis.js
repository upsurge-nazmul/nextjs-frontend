import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const getuserdata = (payload, token) => {
  return ApiCalls.getResponse(`users/getprofile`, payload, token);
};
const getChildDetails = (payload, token) => {
  return ApiCalls.getResponse(`parent/getchilddata`, payload, token);
};
const updateprofile = (payload) => {
  return ApiCalls.postResponse(
    "users/updateprofile",
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
const getallvouchers = (payload, token) => {
  return ApiCalls.postResponse(`voucher/vouchers`, payload, token);
};
const ordervouchers = (payload) => {
  return ApiCalls.postResponse(
    "voucher/order",
    payload,
    getCookie("accesstoken")
  );
};

const getuservouchers = (payload) => {
  return ApiCalls.getResponse(
    "voucher/uservouchers",
    payload,
    getCookie("accesstoken")
  );
};
const deletechild = (payload) => {
  return ApiCalls.deleteResponse(
    "parent/deletechild",
    payload,
    getCookie("accesstoken")
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
};

export default DashboardApis;
