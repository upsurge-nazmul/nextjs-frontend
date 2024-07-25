import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";
// ,"/quiz/addquiz","/quiz/getallquiz","/quiz/getquiz","/quiz/addquestion"
const loggameclick = (payload) => {
  return ApiCalls.postResponse(`analytics/loggameclick`, payload);
};
const loggameerror = (payload) => {
  return ApiCalls.postResponse(`analytics/loggameerror`, payload);
};
const gamedata = (payload) => {
  return ApiCalls.getResponse("games/gamedata", payload);
};
const unicoinreward = (payload, token) => {
  return ApiCalls.postResponse(
    "games/gameunicoins",
    payload,
    token || getCookie("accesstoken")
  );
};
const getgameunicoinrewards = (payload, token) => {
  return ApiCalls.getResponse("games/gameunicoins", payload, token);
};
const gamesList = (payload) => {
  return ApiCalls.getResponse("games/list", payload);
};

const GameApis = {
  loggameclick,
  loggameerror,
  gamedata,
  unicoinreward,
  getgameunicoinrewards,
  gamesList,
};

export default GameApis;
