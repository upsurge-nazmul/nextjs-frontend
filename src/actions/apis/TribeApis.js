import * as ApiCalls from "../ApiCalls";

const createtribe = (payload, token) => {
  return ApiCalls.postResponse(`tribes/create`, payload, token);
};
//getchores
const TribeApis = {
  createtribe,
};

export default TribeApis;
