import * as ApiCalls from "../ApiCalls";

// watchlist apis
const getWatchlist = ({ payload, token, type = "stocksimulator" }) => {
  return ApiCalls.getResponse(`${type}/watchlist`, payload, token);
};

const addToWatchlist = ({ payload, token, type = "stocksimulator" }) => {
  return ApiCalls.postResponse(`${type}/watchlist/add`, payload, token);
};

const removeFromWatchlist = ({ payload, token, type = "stocksimulator" }) => {
  return ApiCalls.deleteResponse(`${type}/watchlist/delete`, payload, token);
};

// stock apis
const getStocks = ({ payload, token, type = "stocksimulator" }) => {
  if (payload.symbol) {
    return ApiCalls.getResponse(
      `${type}/${type === "cryptosimulator" ? "cryptos" : "stocks"}?from=${
        payload.from
      }&to=${payload.to}&symbol=${payload.symbol}`,
      null,
      token
    );
  } else if (payload.from && payload.to) {
    return ApiCalls.getResponse(
      `${type}/${type === "cryptosimulator" ? "cryptos" : "stocks"}?from=${
        payload.from
      }&to=${payload.to}`,
      null,
      token
    );
  } else
    return ApiCalls.getResponse(
      `${type}/${type === "cryptosimulator" ? "cryptos" : "stocks"}`,
      null,
      token
    );
};

// user apis
const getUserStocks = ({ payload, token, type = "stocksimulator" }) => {
  return ApiCalls.getResponse(
    `${type}/${type === "cryptosimulator" ? "userCryptos" : "userStocks"}`,
    payload,
    token
  );
};

const getUserTrades = ({ payload, token, type = "stocksimulator" }) => {
  return ApiCalls.getResponse(`${type}/userTrades`, payload, token);
};

const getUserRecords = ({ payload, token, type = "stocksimulator" }) => {
  return ApiCalls.getResponse(`${type}/records`, payload, token);
};

const getUserHoldings = ({ payload, token, type = "stocksimulator" }) => {
  return ApiCalls.getResponse(`${type}/holdings`, payload, token);
};

// buy and sell apis
const buyStock = ({ payload, token, type = "stocksimulator" }) => {
  return ApiCalls.postResponse(`${type}/buy`, payload, token);
};

const sellStock = ({ payload, token, type = "stocksimulator" }) => {
  return ApiCalls.postResponse(`${type}/sell`, payload, token);
};

// leaderboard apis
const getLeaderboard = ({ payload, token, type = "stocksimulator" }) => {
  return ApiCalls.getResponse(`${type}/leaderboard`, payload, token);
};

const getDailyCompetition = ({
  payload,
  token,
  type = "stocksimulator",
  duration = "daily",
}) => {
  return ApiCalls.getResponse(
    `${type}/leaderboard/${duration}`,
    payload,
    token
  );
};

// financial record apis
const getBalanceSheet = ({ payload, token, type = "stocksimulator" }) => {
  return ApiCalls.getResponse(`${type}/balanceSheet`, payload, token);
};

const getAlphaBetaReturns = ({ payload, token, type = "stocksimulator" }) => {
  return ApiCalls.getResponse(`${type}/abReturns`, payload, token);
};

const getFinancialRatios = ({ payload, token, type = "stocksimulator" }) => {
  return ApiCalls.getResponse(`${type}/financialRatios`, payload, token);
};

// companies apis
const getTopCompanies = ({
  payload,
  token,
  type = "stocksimulator",
  duration = "daily",
}) => {
  return ApiCalls.getResponse(`${type}/companies/${duration}`, payload, token);
};

const getTopUserCompanies = ({
  payload,
  token,
  type = "stocksimulator",
  duration = "daily",
}) => {
  return ApiCalls.getResponse(
    `${type}/companies/user/${duration}`,
    payload,
    token
  );
};

// challenges apis
const getStockXY = ({ payload, token, type = "stocksimulator" }) => {
  return ApiCalls.getResponse(
    `${type}/challenges/stockXstockY`,
    payload,
    token
  );
};

const getStockXYAnswer = ({ payload, token, type = "stocksimulator" }) => {
  return ApiCalls.getResponse(
    `${type}/challenges/stockXstockY/answer`,
    payload,
    token
  );
};

export default {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  getStocks,
  getUserStocks,
  getUserRecords,
  getUserHoldings,
  getUserTrades,
  buyStock,
  sellStock,
  getLeaderboard,
  getDailyCompetition,
  getBalanceSheet,
  getAlphaBetaReturns,
  getFinancialRatios,
  getTopCompanies,
  getTopUserCompanies,
  getStockXY,
  getStockXYAnswer,
};
