import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

const searchvoucher = (payload) => {
  return ApiCalls.getResponse(
    "voucher/searchvoucher",
    payload,
    getCookie("accesstoken")
  );
};

const VoucherApis = {
  searchvoucher,
};

export default VoucherApis;
