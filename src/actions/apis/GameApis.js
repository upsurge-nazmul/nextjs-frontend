import * as ApiCalls from "../ApiCalls";
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
//getchores
const GameApis = {
  loggameclick,
  loggameerror,
  gamedata,
};

export default GameApis;
