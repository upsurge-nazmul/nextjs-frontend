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

const getexpiredchores = (payload, token) => {
  return ApiCalls.getResponse(`chore/getexpiredchores`, payload, token);
};
const deletechore = (payload) => {
  return ApiCalls.deleteResponse(
    "chore/deletechore",
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

const gettemplates = (payload, token) => {
  return ApiCalls.getResponse("chore/choretemplates", payload, token);
};
const addtemplate = (payload) => {
  return ApiCalls.postResponse(
    `chore/addtemplate`,
    payload,
    getCookie("accesstoken")
  );
};

const gettemplatedetail = (payload, token) => {
  return ApiCalls.getResponse("chore/templatedetail", payload, token);
};

const deletetemplate = (payload, token) => {
  return ApiCalls.deleteResponse("chore/deletetemplate", payload, token);
};

const rejectchore = (payload, token) => {
  return ApiCalls.putResponse("chore/rejectchore", payload, token);
};
const getchildchores = (payload, token) => {
  return ApiCalls.getResponse(`chore/getchildchores`, payload, token);
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
  markchorestarted,
  markchoreforapproval,
  addtemplate,
  gettemplates,
  gettemplatedetail,
  deletetemplate,
  rejectchore,
  getchildchores,
};

export default ChoreApis;
