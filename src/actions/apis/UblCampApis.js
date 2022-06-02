import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const register = (payload) => {
  return ApiCalls.postResponse(
    `ubl/register`,
    payload,
    getCookie("accesstoken")
  );
};
const createotp = (payload) => {
  return ApiCalls.postResponse(
    `ubl/createotp`,
    payload,
    getCookie("accesstoken")
  );
};

const UblCampApis = {
  register,
  createotp,
};

export default UblCampApis;
