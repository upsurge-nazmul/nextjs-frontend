import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const getquestions = (payload, token) => {
  return ApiCalls.getResponse(`knowledgequest/quizdata`, payload, token);
};
const checkanswer = (payload, token) => {
  return ApiCalls.getResponse(`knowledgequest/checkanswer`, payload, token);
};
const initiate = (payload, token) => {
  return ApiCalls.getResponse(`knowledgequest/initiate`, payload, token);
};
const update = (payload, token) => {
  return ApiCalls.putResponse(
    `knowledgequest/update`,
    payload,
    getCookie("accesstoken")
  );
};
const updatequizdata = (payload, token) => {
  return ApiCalls.putResponse(
    `knowledgequest/updatequizdata`,
    payload,
    getCookie("accesstoken")
  );
};
const getLevel = (payload, token) => {
  return ApiCalls.getResponse(
    `knowledgequest/level`,
    payload,
    getCookie("accesstoken")
  );
};
const KidApis = {
  getquestions,
  checkanswer,
  initiate,
  update,
  updatequizdata,
  getLevel,
};

export default KidApis;
