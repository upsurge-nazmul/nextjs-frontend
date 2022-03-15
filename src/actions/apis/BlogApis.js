import * as ApiCalls from "../ApiCalls";

const getblogs = (payload) => {
  return ApiCalls.getResponse(`blogs/getblogs`, payload);
};
const getblogwithid = (payload) => {
  return ApiCalls.getResponse(`blogs/getblogwithid`, payload);
};
const gethomeblogs = (payload) => {
  return ApiCalls.getResponse(`blogs/gethomeblogs`, payload);
};
const getallblogs = (payload) => {
  return ApiCalls.getResponse(`blogs/getallblogs`, payload);
};
const blogreward = (payload, token) => {
  return ApiCalls.postResponse("blogs/blogreward", payload, token);
};
//getchores
const BlogApis = {
  getblogs,
  getblogwithid,
  gethomeblogs,
  getallblogs,
  blogreward,
};

export default BlogApis;
