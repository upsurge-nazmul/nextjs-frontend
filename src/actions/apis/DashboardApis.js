import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const addnotification = (payload) => {
  return ApiCalls.postResponse(
    "users/addnotification",
    payload,
    getCookie("accesstoken")
  );
};
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
const getchorebyid = (payload, token) => {
  return ApiCalls.getResponse(`parent/getchorebyid`, payload, token);
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
const getallavatars = (payload, token) => {
  return ApiCalls.getResponse(`parent/getavailableavatars`, payload, token);
};
const getallbadges = (payload, token) => {
  return ApiCalls.getResponse(`parent/getavailablebadges`, payload, token);
};
const getallvouchers = (payload, token) => {
  return ApiCalls.getResponse(`parent/getavailablevouchers`, payload, token);
};
const deletechild = (payload) => {
  return ApiCalls.deleteResponse(
    "parent/deletechild",
    payload,
    getCookie("accesstoken")
  );
};
const deletechore = (payload) => {
  return ApiCalls.deleteResponse(
    "parent/deletechore",
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
  addchore,
  getchores,
  getexpiredchores,
  getpendingchores,
  getcompletedchores,
  editchore,
  getuserdata,
  updateprofile,
  getallavatars,
  getallbadges,
  getallvouchers,
  editkids,
  deletechild,
  getChildDetails,
  getchorebyid,
  deletechore,
  addnotification,
};

export default DashboardApis;
