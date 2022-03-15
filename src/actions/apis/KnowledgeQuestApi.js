import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const getquestions = (payload, token) => {
  return ApiCalls.getResponse(`knowledgequest/quizdata`, payload, token);
};
const checkanswer = (payload, token) => {
  return ApiCalls.getResponse(`knowledgequest/checkanswer`, payload, token);
};
const KidApis = {
  getquestions,
  checkanswer,
};

export default KidApis;
