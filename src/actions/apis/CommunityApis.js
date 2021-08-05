import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const gettopusers = (payload) => {
  return ApiCalls.getResponse(`community/topusers`, payload);
};
const getannouncements = (payload) => {
  return ApiCalls.getResponse(`community/getannouncements`, payload);
};
const getallposts = (payload) => {
  return ApiCalls.getResponse(`community/getallposts`, payload);
};

const addpost = (payload, token) => {
  return ApiCalls.postResponse(
    `community/addpost`,
    payload,
    getCookie("accesstoken")
  );
};

const addvote = (payload, token) => {
  return ApiCalls.postResponse(
    `community/vote`,
    payload,
    getCookie("accesstoken")
  );
};
//getchores
const CommunityApis = {
  gettopusers,
  getannouncements,
  getallposts,
  addpost,
  addvote,
};

export default CommunityApis;
