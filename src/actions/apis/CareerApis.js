import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const submitApplication = (payload) => {
  return ApiCalls.postResponse(`career/submitApplication`, payload);
};
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { submitApplication };
