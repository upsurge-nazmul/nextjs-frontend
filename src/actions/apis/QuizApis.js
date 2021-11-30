import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";
// ,"/quiz/addquiz","/quiz/getallquiz","/quiz/getquiz","/quiz/addquestion"
const getallquiz = (payload, token) => {
  return ApiCalls.getResponse(`quiz/getallquiz`, payload, token);
};

const getquizwithid = (payload, token) => {
  return ApiCalls.getResponse(`quiz/getquizwithid`, payload, token);
};

const getquestionswithids = (payload, token) => {
  return ApiCalls.getResponse(`quiz/getquestions`, payload, token);
};

const getallquestions = (payload, token) => {
  return ApiCalls.getResponse(`quiz/getallquestions`, payload, token);
};

const startquiz = (payload, token) => {
  return ApiCalls.postResponse("quiz/start", payload, token);
};
const startwaitlistquiz = (payload, token) => {
  return ApiCalls.postResponse(
    "quiz/startwaitlistquiz",
    payload,
    getCookie("accesstoken")
  );
};
const nextquestion = (payload, token) => {
  return ApiCalls.getResponse("quiz/nextquestion", payload, token);
};
const leaderboard = (payload, token) => {
  return ApiCalls.getResponse("quiz/leaderboard", payload);
};
//getchores
const QuizApis = {
  getallquiz,
  getquizwithid,
  getallquestions,
  getquestionswithids,
  startquiz,
  nextquestion,
  leaderboard,
  startwaitlistquiz,
};

export default QuizApis;
