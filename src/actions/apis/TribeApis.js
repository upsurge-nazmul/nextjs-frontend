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

const addcomment = (payload, token) => {
  return ApiCalls.postResponse("tribes/addcomment", payload, token);
};

const leaderboard = (payload, token) => {
  return ApiCalls.getResponse(`tribes/leaderboard`, payload, token);
};
//getchores
const TribeApis = {
  createtribe,
  getTribes,
  gettribedetail,
  addpost,
  getTribePosts,
  likePost,
  addcomment,
  leaderboard,
};

export default TribeApis;
