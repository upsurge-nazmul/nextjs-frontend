import * as ApiCalls from "../ApiCalls";
import { getCookie } from "../cookieUtils";

// bank apis
const investmentrecords = (payload) => {
  return ApiCalls.getResponse(
    "games/moneyace/investmentrecords",
    payload,
    getCookie("accesstoken")
  );
};
const getassetvalues = (payload) => {
  return ApiCalls.getResponse(
    "games/moneyace/getassetvalues",
    payload,
    getCookie("accesstoken")
  );
};
const completetask = (payload) => {
  return ApiCalls.putResponse(
    "games/moneyace/completetask",
    payload,
    getCookie("accesstoken")
  );
};
const getMoneyAceData = (payload, token) => {
  return ApiCalls.getResponse(`games/moneyace/getmoneyacedata`, payload, token);
};
const getTasks = (payload) => {
  return ApiCalls.getResponse(
    "games/moneyace/tasks",
    payload,
    getCookie("accesstoken")
  );
};
const getBankingDetails = (payload) => {
  return ApiCalls.getResponse(`games/moneyace/bankingdetails`, payload);
};
const getBankPassbook = (payload) => {
  return ApiCalls.getResponse(
    `games/moneyace/passbook`,
    payload,
    getCookie("accesstoken")
  );
};
const openBankAccount = (payload) => {
  return ApiCalls.postResponse(
    `games/moneyace/openbankaccount`,
    payload,
    getCookie("accesstoken")
  );
};
const depositMoney = (payload) => {
  return ApiCalls.postResponse(
    `games/moneyace/depositmoney`,
    payload,
    getCookie("accesstoken")
  );
};
const withdrawMoney = (payload) => {
  return ApiCalls.postResponse(
    `games/moneyace/withdrawmoney`,
    payload,
    getCookie("accesstoken")
  );
};
const activateAtm = (payload) => {
  return ApiCalls.postResponse(
    `games/moneyace/activateatm`,
    payload,
    getCookie("accesstoken")
  );
};
const activateUpi = (payload) => {
  return ApiCalls.postResponse(
    `games/moneyace/activateupi`,
    payload,
    getCookie("accesstoken")
  );
};
const openDematAccount = (payload) => {
  return ApiCalls.postResponse(
    `games/moneyace/activatedemat`,
    payload,
    getCookie("accesstoken")
  );
};

// fd

const getFdRates = (payload) => {
  return ApiCalls.getResponse(
    `games/moneyace/fdrate`,
    payload,
    getCookie("accesstoken")
  );
};
const getFdHoldings = (payload) => {
  return ApiCalls.getResponse(
    `games/moneyace/fdholding`,
    payload,
    getCookie("accesstoken")
  );
};
const buyFd = (payload) => {
  return ApiCalls.postResponse(
    `games/moneyace/newfd`,
    payload,
    getCookie("accesstoken")
  );
};

// gold apis

const getGoldRates = (payload) => {
  return ApiCalls.getResponse(
    `games/moneyace/goldrates`,
    payload,
    getCookie("accesstoken")
  );
};
const getGoldHoldings = (payload) => {
  return ApiCalls.getResponse(
    `games/moneyace/goldholding`,
    payload,
    getCookie("accesstoken")
  );
};
const buyGold = (payload) => {
  return ApiCalls.postResponse(
    `games/moneyace/buygold`,
    payload,
    getCookie("accesstoken")
  );
};
const sellGold = (payload) => {
  return ApiCalls.postResponse(
    `games/moneyace/sellgold`,
    payload,
    getCookie("accesstoken")
  );
};

// gold apis
const getRealestateRates = (payload) => {
  return ApiCalls.getResponse(
    `games/moneyace/realestaterates`,
    payload,
    getCookie("accesstoken")
  );
};
const getRealestateHoldings = (payload) => {
  return ApiCalls.getResponse(
    `games/moneyace/realestateholdings`,
    payload,
    getCookie("accesstoken")
  );
};
const buyRealestate = (payload) => {
  return ApiCalls.postResponse(
    `games/moneyace/buyrealestates`,
    payload,
    getCookie("accesstoken")
  );
};
const sellRealestate = (payload) => {
  return ApiCalls.postResponse(
    `games/moneyace/sellrealestates`,
    payload,
    getCookie("accesstoken")
  );
};

// retirement fund

const getRetirementFundRates = (payload) => {
  return ApiCalls.getResponse(
    `games/moneyace/retirementfundrates`,
    payload,
    getCookie("accesstoken")
  );
};
const getRetirementFundHoldings = (payload) => {
  return ApiCalls.getResponse(
    `games/moneyace/retirementfundholdings`,
    payload,
    getCookie("accesstoken")
  );
};
const buyRetirementFund = (payload) => {
  return ApiCalls.postResponse(
    `games/moneyace/buyretirementfund`,
    payload,
    getCookie("accesstoken")
  );
};
// stocks

const getStockRates = (payload) => {
  return ApiCalls.getResponse(
    `games/moneyace/stockrates`,
    payload,
    getCookie("accesstoken")
  );
};
const getStockHoldings = (payload) => {
  return ApiCalls.getResponse(
    `games/moneyace/stockholdings`,
    payload,
    getCookie("accesstoken")
  );
};
const buyStock = (payload) => {
  return ApiCalls.postResponse(
    `games/moneyace/buystock`,
    payload,
    getCookie("accesstoken")
  );
};
const sellStock = (payload) => {
  return ApiCalls.postResponse(
    `games/moneyace/sellstock`,
    payload,
    getCookie("accesstoken")
  );
};
// store

const getstoreitems = (payload) => {
  return ApiCalls.getResponse(
    `games/moneyace/storeitems`,
    payload,
    getCookie("accesstoken")
  );
};
const buystoreitems = (payload) => {
  return ApiCalls.postResponse(
    "games/moneyace/buystoreitems",
    payload,
    getCookie("accesstoken")
  );
};
const updateupi = (payload) => {
  return ApiCalls.putResponse(
    "games/moneyace/updateupi",
    payload,
    getCookie("accesstoken")
  );
};
const getpurchases = (payload) => {
  return ApiCalls.getResponse(
    "games/moneyace/getpurchases",
    payload,
    getCookie("accesstoken")
  );
};
const getdailyreward = (payload) => {
  return ApiCalls.getResponse(
    "games/moneyace/dailyreward",
    payload,
    getCookie("accesstoken")
  );
};

const updatescore = (payload) => {
  return ApiCalls.putResponse(
    "games/moneyace/updategamescore",
    payload,
    getCookie("accesstoken")
  );
};

// temp dev apis

const resetdata = (payload) => {
  return ApiCalls.getResponse("games/moneyace/reset?pass=noaccess", payload);
};

const nextday = (payload) => {
  return ApiCalls.getResponse("games/moneyace/gonext?pass=noaccess", payload);
};

const MoneyAceApis = {
  getMoneyAceData,
  getBankingDetails,
  getBankPassbook,
  openBankAccount,
  depositMoney,
  buystoreitems,
  withdrawMoney,
  activateAtm,
  activateUpi,
  getFdHoldings,
  getFdRates,
  buyFd,
  getGoldRates,
  getGoldHoldings,
  buyGold,
  sellGold,
  getRealestateRates,
  getRealestateHoldings,
  buyRealestate,
  sellRealestate,
  getRetirementFundRates,
  getRetirementFundHoldings,
  buyRetirementFund,
  getStockRates,
  getStockHoldings,
  buyStock,
  sellStock,
  getTasks,
  openDematAccount,
  getassetvalues,
  getstoreitems,
  updateupi,
  getpurchases,
  getdailyreward,
  updatescore,
  investmentrecords,
  resetdata,
  nextday,
  completetask,
};

export default MoneyAceApis;
