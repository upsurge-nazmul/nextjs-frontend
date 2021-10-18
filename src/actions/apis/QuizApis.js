import * as ApiCalls from "../ApiCalls";
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
  return ApiCalls.getResponse("quiz/start", payload, token);
};

const nextquestion = (payload, token) => {
  return ApiCalls.getResponse("quiz/nextquestion", payload, token);
};

//getchores
const QuizApis = {
  getallquiz,
  getquizwithid,
  getallquestions,
  getquestionswithids,
  startquiz,
  nextquestion,
};

export default QuizApis;
