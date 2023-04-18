import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const getAllEvents = (payload) => {
  return ApiCalls.getResponse(
    "events/events",
    payload,
    getCookie("accesstoken")
  );
};

const getAllChallenges = (payload) => {
  return ApiCalls.getResponse(
    "events/challenges",
    payload,
    getCookie("accesstoken")
  );
};

const registerFormClick = (payload) => {
  return ApiCalls.getResponse(
    "events/event-register",
    payload,
    getCookie("accesstoken")
  );
};

export default {
  getAllEvents,
  getAllChallenges,
  registerFormClick,
};
