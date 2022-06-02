import { Game_Data } from "../static_data/Game_Data";

export function getGameTitleandDescription(gameid) {
  let titles = {
    MoneyMath: "transaction games for kids and teen",
    MoneyManager: "Practical Money skills games for kids and teens in india",
    MoneySlide: "Coin games for kids and teen in india",
    BalanceBuilder: "investment games online for kids and teen",
  };
  return {
    title: titles[gameid] || "Investing and compounding games for indian kids",
    description:
      Game_Data[gameid]?.description ||
      "Investing and compounding games for indian kids",
  };
}
