import * as ApiCalls from "../ApiCalls";

const createtribe = (payload, token) => {
  return ApiCalls.postResponse(`tribes/create`, payload, token);
};

const getTribes = (payload, token) => {
  return ApiCalls.getResponse(`tribes/gettribes`, payload, token);
};

const userTribes = (payload, token) => {
  return ApiCalls.getResponse(`tribes/usertribes`, payload, token);
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

const popularTribes = (payload, token) => {
  return ApiCalls.getResponse("tribes/populartribes", payload, token);
};

const getchorefeed = (payload, token) => {
  return ApiCalls.getResponse("tribes/tribechorefeed", payload, token);
};

const gettriberequests = (payload, token) => {
  return ApiCalls.getResponse("tribes/getjoinrequests", payload, token);
};
const approveaddrequest = (payload, token) => {
  return ApiCalls.getResponse("tribes/approveaddrequest", payload, token);
};

const rejectrequest = (payload, token) => {
  return ApiCalls.getResponse("tribes/rejectrequest", payload, token);
};

const getTribeStatus = (payload, token) => {
  return ApiCalls.getResponse("tribes/getstatus", payload, token);
};
const getpendingmembers = (payload, token) => {
  return ApiCalls.getResponse("tribes/getpendingmembers", payload, token);
};

const members = (payload, token) => {
  return ApiCalls.getResponse("tribes/members", payload, token);
};

const updatetribe = (payload, token) => {
  return ApiCalls.putResponse("tribes/updatetribe", payload, token);
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
  userTribes,
  popularTribes,
  getchorefeed,
  gettriberequests,
  approveaddrequest,
  rejectrequest,
  getTribeStatus,
  getpendingmembers,
  members,
  updatetribe,
};

export default TribeApis;
