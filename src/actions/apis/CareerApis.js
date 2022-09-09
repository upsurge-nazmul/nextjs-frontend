import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const submitApplication = (payload) => {
  return ApiCalls.postResponse(`career/submitApplication`, payload);
};

export default { submitApplication };
