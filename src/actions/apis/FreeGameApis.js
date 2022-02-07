import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const presign = (payload) => {
  return ApiCalls.postResponse("users/presign", payload);
};
const gametoken = (payload) => {
  return ApiCalls.getResponse(`users/gametoken`, payload);
};
const startgame = (payload) => {
  return ApiCalls.postResponse(`users/startgame`, payload);
};
const updatescore = (payload) => {
  return ApiCalls.postResponse("users/updatescore", payload);
};

const leaderboard = (payload) => {
  return ApiCalls.getResponse(`users/leaderboard`, payload);
};
const usertoken = (payload) => {
  return ApiCalls.postResponse("users/usertoken", payload);
};
const getludoleaderboard = (payload, token) => {
  return ApiCalls.getResponse("games/ludo/leaderboard", payload, token);
};
const getludohighscore = (payload, token) => {
  return ApiCalls.getResponse("games/ludo/gethighestscore", payload, token);
};

const updateRecentGames = (payload) => {
  return ApiCalls.postResponse(
    "games/updaterecentgames",
    payload,
    getCookie("accesstoken")
  );
};

const getrecentGames = (payload, token) => {
  return ApiCalls.getResponse("games/recentgames", payload, token);
};
//getchores
const FreeGameApis = {
  leaderboard,
  presign,
  gametoken,
  startgame,
  updatescore,
  usertoken,
  getludoleaderboard,
  getludohighscore,
  updateRecentGames,
  getrecentGames,
};

export default FreeGameApis;
