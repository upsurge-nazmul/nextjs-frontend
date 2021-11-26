import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const addToken = (payload) => {
  return ApiCalls.postResponse(
    "notification/addtoken",
    payload,
    getCookie("accesstoken")
  );
};
const addnotification = (payload) => {
  return ApiCalls.postResponse(
    "notification/addnotification",
    payload,
    getCookie("accesstoken")
  );
};
const NotificationApis = {
  addToken,
  addnotification,
};

export default NotificationApis;
