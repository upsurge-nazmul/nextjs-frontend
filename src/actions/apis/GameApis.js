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
const unicoinreward = (payload) => {
  return ApiCalls.postResponse(
    "games/gameunicoins",
    payload,
    getCookie("accesstoken")
  );
};
const getgameunicoinrewards = (payload, token) => {
  return ApiCalls.getResponse("games/gameunicoins", payload, token);
};
//getchores
const GameApis = {
  loggameclick,
  loggameerror,
  gamedata,
  unicoinreward,
  getgameunicoinrewards,
};

export default GameApis;
