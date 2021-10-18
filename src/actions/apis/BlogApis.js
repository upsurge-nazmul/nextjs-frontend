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
//getchores
const BlogApis = {
  getblogs,
  getblogwithid,
  gethomeblogs,
};

export default BlogApis;
