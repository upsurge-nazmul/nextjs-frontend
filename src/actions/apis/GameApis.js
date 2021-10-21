import * as ApiCalls from "../ApiCalls";
// ,"/quiz/addquiz","/quiz/getallquiz","/quiz/getquiz","/quiz/addquestion"
const loggameclick = (payload) => {
  return ApiCalls.postResponse(`analytics/loggameclick`, payload);
};
const loggameerror = (payload) => {
  return ApiCalls.postResponse(`analytics/loggameerror`, payload);
};

//getchores
const GameApis = {
  loggameclick,
  loggameerror,
};

export default GameApis;
