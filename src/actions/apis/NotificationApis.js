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

const getnotifications = (payload) => {
  return ApiCalls.getResponse(
    "notification/notifications",
    payload,
    getCookie("accesstoken")
  );
};

const markread = (payload) => {
  return ApiCalls.putResponse(
    "notification/markread",
    payload,
    getCookie("accesstoken")
  );
};
const NotificationApis = {
  addToken,
  addnotification,
  getnotifications,
  markread,
};

export default NotificationApis;
