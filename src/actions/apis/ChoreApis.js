import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const approvechore = (payload) => {
  return ApiCalls.putResponse(
    "chore/approvechore",
    payload,
    getCookie("accesstoken")
  );
};
const addchore = (payload) => {
  return ApiCalls.postResponse(
    `chore/addchore`,
    payload,
    getCookie("accesstoken")
  );
};
const editchore = (payload) => {
  return ApiCalls.postResponse(
    `chore/editchore`,
    payload,
    getCookie("accesstoken")
  );
};
const getchores = (payload, token) => {
  return ApiCalls.getResponse(`chore/getchores`, payload, token);
};
const getchorebyid = (payload, token) => {
  return ApiCalls.getResponse(`chore/getchorebyid`, payload, token);
};

const getcompletedchores = (payload, token) => {
  return ApiCalls.getResponse(`chore/getcompletedchores`, payload, token);
};
const getpendingchores = (payload, token) => {
  return ApiCalls.getResponse(`chore/getpendingchores`, payload, token);
};

const getcompletedchildchores = (payload, token) => {
  return ApiCalls.getResponse(`chore/completedchildchore`, payload, token);
};
const getpendingchildchore = (payload, token) => {
  return ApiCalls.getResponse(`chore/pendingchildchore`, payload, token);
};
const getexpiredchores = (payload, token) => {
  return ApiCalls.getResponse(`chore/getexpiredchores`, payload, token);
};
const deletechore = (payload) => {
  return ApiCalls.deleteResponse(
    "parent/deletechore",
    payload,
    getCookie("accesstoken")
  );
};
const markchorestarted = (payload, token) => {
  return ApiCalls.postResponse(
    `chore/markchorestarted`,
    payload,
    getCookie("accesstoken")
  );
};
const markchoreforapproval = (payload, token) => {
  return ApiCalls.postResponse(
    `chore/markchoreforapproval`,
    payload,
    getCookie("accesstoken")
  );
};
//getchores
const ChoreApis = {
  addchore,
  getchores,
  getexpiredchores,
  getpendingchores,
  getcompletedchores,
  editchore,
  deletechore,
  approvechore,
  getchorebyid,
  getpendingchildchore,
  getcompletedchildchores,
  markchorestarted,
  markchoreforapproval,
};

export default ChoreApis;
