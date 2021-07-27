import * as ApiCalls from "../ApiCalls";

const addkids = (payload) => {
  return ApiCalls.postResponse(`parent/addchild`, payload);
};
const getkids = (payload) => {
  return ApiCalls.getResponse(`parent/getchildren`, payload);
};
const getgames = (payload) => {
  return ApiCalls.getResponse(`parent/getgames`, payload);
};
const getliveclasses = (payload) => {
  return ApiCalls.getResponse(`parent/getliveclasses`, payload);
};
const addchore = (payload) => {
  return ApiCalls.postResponse(`parent/addchore`, payload);
};
const editchore = (payload) => {
  return ApiCalls.postResponse(`parent/editchore`, payload);
};
const getchores = (payload) => {
  return ApiCalls.getResponse(`parent/getchores`, payload);
};
const getcompletedchores = (payload) => {
  return ApiCalls.getResponse(`parent/getcompletedchores`, payload);
};
const getpendingchores = (payload) => {
  return ApiCalls.getResponse(`parent/getpendingchores`, payload);
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
