import * as ApiCalls from "../ApiCalls";
import axios from "axios";
import { xoxotoken } from "../../../config";
async function getvouchers(payload) {
  let config = {
    query: "plumProAPI.mutation.getVouchers",
    tag: "plumProAPI",
    variables: {
      data: {
        limit: 10,
        page: 1,
        includeProducts: "",
        excludeProducts: "",
        sort: {
          field: "",
          order: "",
        },
        filters: [],
      },
    },
  };
  let res = await axios.post(
    "https://stagingaccount.xoxoday.com/chef/v1/oauth/api",
    config,
    {
      headers: {
        Authorization: `Bearer ${xoxotoken}`,
      },
    }
  );

  return res;
}
//getchores
const XoxoApis = {
  getvouchers,
};

export default XoxoApis;
