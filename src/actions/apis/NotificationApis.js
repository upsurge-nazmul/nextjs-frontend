import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const addToken = (payload) => {
  return ApiCalls.postResponse(
    "notification/addtoken",
    payload,
    getCookie("accesstoken")
  );
};
const NotificationApis = {
  addToken,
};

export default NotificationApis;
