import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const register = (payload) => {
  return ApiCalls.postResponse(
    `summercamp/register`,
    payload,
    getCookie("accesstoken")
  );
};

const SummerCampApis = {
  register,
};

export default SummerCampApis;
