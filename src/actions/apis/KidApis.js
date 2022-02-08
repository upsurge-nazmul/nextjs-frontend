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

const getbadges = (payload, token) => {
  return ApiCalls.getResponse(`kid/getbadges`, payload, token);
};
const getchildchores = (payload, token) => {
  return ApiCalls.getResponse(`kid/getchildchores`, payload, token);
};

const KidApis = {
  getbadges,
  getavatars,
  getchildchores,
  buyavatar,
};

export default KidApis;
