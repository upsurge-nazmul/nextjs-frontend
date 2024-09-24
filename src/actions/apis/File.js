import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const uploadFile = (payload) => {
  return ApiCalls.postResponse(
    "file/upload",
    payload,
    getCookie("accesstoken")
  );
};

const FileApis = {
  uploadFile,
};

export default FileApis;
