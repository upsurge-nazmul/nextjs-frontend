import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const getavatars = (payload, token) => {
  return ApiCalls.getResponse(`kid/getavatars`, payload, token);
};

const buyavatar = (payload, token) => {
  return ApiCalls.postResponse(
    `kid/buyavatar`,
    payload,
    getCookie("accesstoken")
  );
};

const getlevel = (payload, token) => {
  return ApiCalls.getResponse(`kid/getlevel`, payload, token);
};
const getchildchores = (payload, token) => {
  return ApiCalls.getResponse(`kid/getchildchores`, payload, token);
};
const buyvoucher = (payload, token) => {
  return ApiCalls.postResponse(
    `kid/buyvoucher`,
    payload,
    getCookie("accesstoken")
  );
};
const KidApis = {
  getlevel,
  getavatars,
  getchildchores,
  buyavatar,
  buyvoucher,
};

export default KidApis;
