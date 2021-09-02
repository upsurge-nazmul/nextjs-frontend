import * as ApiCalls from "../ApiCalls";

const getblogs = (payload) => {
  return ApiCalls.getResponse(`blogs/getblogs`, payload);
};
const getblogwithid = (payload) => {
  return ApiCalls.getResponse(`blogs/getblogwithid`, payload);
};
//getchores
const BlogApis = {
  getblogs,
  getblogwithid,
};

export default BlogApis;
