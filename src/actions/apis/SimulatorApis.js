import * as ApiCalls from "../ApiCalls";

// watchlist apis
const getWatchlist = ({ payload, token }) => {
  return ApiCalls.getResponse("stocksimulator/watchlist", payload, token);
};

// stock apis
const getStocks = ({ payload, token }) => {
  if (payload.symbol) {
    return ApiCalls.getResponse(
      `stocksimulator/stocks?from=${payload.from}&to=${payload.to}&symbol=${payload.symbol}`,
      null,
      token
    );
  } else {
    return ApiCalls.getResponse(
      `stocksimulator/stocks?from=${payload.from}&to=${payload.to}`,
      null,
      token
    );
  }
};

export default {
  getWatchlist,
  getStocks,
};
