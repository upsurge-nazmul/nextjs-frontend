import * as ApiCalls from "../ApiCalls";

const createtribe = (payload, token) => {
  return ApiCalls.postResponse(`tribes/create`, payload, token);
};

const getTribes = (payload, token) => {
  return ApiCalls.getResponse(`tribes/gettribes`, payload, token);
};

const gettribedetail = (payload, token) => {
  return ApiCalls.getResponse(`tribes/gettribedetail`, payload, token);
};
//getchores
const TribeApis = {
  createtribe,
  getTribes,
  gettribedetail,
};

export default TribeApis;
