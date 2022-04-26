import * as ApiCalls from "../ApiCalls";

// watchlist apis
const getWatchlist = ({ payload, token }) => {
  return ApiCalls.getResponse("stocksimulator/watchlist", payload, token);
};

// stock apis
const getStocks = ({ payload, token }) => {
  return ApiCalls.getResponse(
    `stocksimulator/stocks?from=${payload.from}&to=${payload.to}&symbol=${payload.symbol}`,
    null,
    token
  );
};

export default {
  getWatchlist,
  getStocks,
};
