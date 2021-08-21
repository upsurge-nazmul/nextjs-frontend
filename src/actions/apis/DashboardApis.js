import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const getuserdata = (payload, token) => {
  return ApiCalls.getResponse(`users/getprofile`, payload, token);
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

const getkids = (payload, token) => {
  return ApiCalls.getResponse(`parent/getchildren`, payload, token);
};
const getgames = (payload, token) => {
  return ApiCalls.getResponse(`parent/getgames`, payload, token);
};
const getliveclasses = (payload, token) => {
  return ApiCalls.getResponse(`parent/getliveclasses`, payload, token);
};
const addchore = (payload) => {
  return ApiCalls.postResponse(
    `parent/addchore`,
    payload,
    getCookie("accesstoken")
  );
};
const editchore = (payload) => {
  return ApiCalls.postResponse(
    `parent/editchore`,
    payload,
    getCookie("accesstoken")
  );
};
const getchores = (payload, token) => {
  return ApiCalls.getResponse(`parent/getchores`, payload, token);
};
const getcompletedchores = (payload, token) => {
  return ApiCalls.getResponse(`parent/getcompletedchores`, payload, token);
};
const getpendingchores = (payload, token) => {
  return ApiCalls.getResponse(`parent/getpendingchores`, payload, token);
};
const getexpiredchores = (payload, token) => {
  return ApiCalls.getResponse(`parent/getexpiredchores`, payload, token);
};
//getchores
const DashboardApis = {
  addkids,
  getkids,
  getgames,
  getliveclasses,
  addchore,
  getchores,
  getexpiredchores,
  getpendingchores,
  getcompletedchores,
  editchore,
  getuserdata,
  updateprofile,
};

export default DashboardApis;
