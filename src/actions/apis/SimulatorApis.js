import * as ApiCalls from "../ApiCalls";

// watchlist apis
const getWatchlist = ({ payload, token }) => {
  return ApiCalls.getResponse(`stocksimulator/watchlist`, payload, token);
};

const addToWatchlist = ({ payload, token }) => {
  return ApiCalls.postResponse("stocksimulator/watchlist/add", payload, token);
};

const removeFromWatchlist = ({ payload, token }) => {
  return ApiCalls.deleteResponse(
    `stocksimulator/watchlist/delete`,
    payload,
    token
  );
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

// buy and sell apis
const buyStock = ({ payload, token }) => {
  return ApiCalls.postResponse("stocksimulator/buy", payload, token);
};

const sellStock = ({ payload, token }) => {
  return ApiCalls.postResponse("stocksimulator/sell", payload, token);
};

export default {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  getStocks,
  buyStock,
  sellStock,
};
