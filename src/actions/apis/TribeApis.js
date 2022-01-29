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

const addpost = (payload, token) => {
  return ApiCalls.postResponse(`tribes/createpost`, payload, token);
};

const getTribePosts = (payload, token) => {
  return ApiCalls.getResponse(`tribes/gettribeposts`, payload, token);
};

const likePost = (payload, token) => {
  return ApiCalls.postResponse(`tribes/likepost`, payload, token);
};
//getchores
const TribeApis = {
  createtribe,
  getTribes,
  gettribedetail,
  addpost,
  getTribePosts,
  likePost,
};

export default TribeApis;
