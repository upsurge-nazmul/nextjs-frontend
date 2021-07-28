import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const addkids = (payload) => {
  return ApiCalls.postResponse(
    `parent/addchild`,
    payload,
    getCookie("accesstoken")
  );
};
const getkids = (payload) => {
  return ApiCalls.getResponse(
    `parent/getchildren`,
    payload,
    getCookie("accesstoken")
  );
};
const getgames = (payload) => {
  return ApiCalls.getResponse(
    `parent/getgames`,
    payload,
    getCookie("accesstoken")
  );
};
const getliveclasses = (payload) => {
  return ApiCalls.getResponse(
    `parent/getliveclasses`,
    payload,
    getCookie("accesstoken")
  );
};
const addchore = (payload) => {
  return ApiCalls.postResponse(`parent/addchore`, payload);
};
const editchore = (payload) => {
  return ApiCalls.postResponse(`parent/editchore`, payload);
};
const getchores = (payload) => {
  return ApiCalls.getResponse(
    `parent/getchores`,
    payload,
    getCookie("accesstoken")
  );
};
const getcompletedchores = (payload) => {
  return ApiCalls.getResponse(
    `parent/getcompletedchores`,
    payload,
    getCookie("accesstoken")
  );
};
const getpendingchores = (payload) => {
  return ApiCalls.getResponse(
    `parent/getpendingchores`,
    payload,
    getCookie("accesstoken")
  );
};
const getexpiredchores = (payload) => {
  return ApiCalls.getResponse(`parent/getexpiredchores`, payload);
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
};

export default DashboardApis;
