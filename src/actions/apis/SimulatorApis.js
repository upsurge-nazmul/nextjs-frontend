import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

// watchlist apis
const getWatchlist = ({ payload, token }) => {
  return ApiCalls.getResponse("stocksimulator/watchlist", payload, token);
};

// stock apis
const getStocks = ({ payload, token }) => {
  return ApiCalls.getResponse(
    `stocksimulator/stocks?from=${payload.from}&to=${payload.to}`,
    null,
    token
  );
};

export default {
  getWatchlist,
  getStocks,
};
