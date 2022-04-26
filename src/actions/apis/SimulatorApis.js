import * as ApiCalls from "../ApiCalls";

// watchlist apis
const getWatchlist = ({ payload, token }) => {
  return ApiCalls.getResponse(
    `stocksimulator/watchlist?userId=${payload.userId}`,
    payload,
    token
  );
};

const addToWatchlist = ({ payload, token }) => {
  return ApiCalls.postResponse("stocksimulator/watchlist/add", payload, token);
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
  addToWatchlist,
  getStocks,
};
