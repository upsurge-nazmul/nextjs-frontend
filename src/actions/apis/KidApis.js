import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const getavatars = (payload, token) => {
  return ApiCalls.getResponse(`kid/getavatars`, payload, token);
};
const getbadges = (payload, token) => {
  return ApiCalls.getResponse(`kid/getbadges`, payload, token);
};

const KidApis = {
  getbadges,
  getavatars,
};

export default KidApis;
