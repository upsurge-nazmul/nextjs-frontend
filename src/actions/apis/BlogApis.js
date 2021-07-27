import * as ApiCalls from "../ApiCalls";

const getblogs = (payload) => {
  return ApiCalls.getResponse(`blogs/getblogs`, payload);
};
//getchores
const BlogApis = {
  getblogs,
};

export default BlogApis;
