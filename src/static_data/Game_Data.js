import { assetsVideo } from "../utils/utils";

export const Game_Data = {
  MoneyDash: {
    name: "Money Dash",
    description: "Learn to manage expenses on the fly.",
    img: "/images/games/money-dash.png",
    //img: assetsVideo('images/MoneyDash.png'),
    premium_plan: 0,
    webgl_key: "MoneyDash_WebGL",
  },
  PriceIsRight: {
    name: "Price Is Right",
    description:
    "Learn about money management with our budget simulator.",
    img: "/images/games/price-is-right.png",
    //img: assetsVideo('images/Snake%26Ladders.png'),
    premium_plan: 0,
    webgl_key: "PriceIsRight_WebGL",
  },
  BalanceBuilder: {
    name: "Balance builder",
    //img: assetsVideo('images/BalanceBuilder.png'),
    img: "/images/games/balance-builder.png",
    description: "How does your bank balance change with different events?",
    premium_plan: 0,
    webgl_key: "BalanceBuilder_WebGL",
  },
  MoneySlide: {
    name: "Money slide",
    //img: assetsVideo('images/MoneySlide.png'),
    img: "/images/games/money-slide.png",
    description: "Fill each piggy-bank with the right amount of money.",
    premium_plan: 0,
    webgl_key: "MoneySlide_WebGL",
  },
  MoneyMath: {
    name: "Money maths",
    description:
    "Let’s earn some money to buy what you want! Make sure you have enough before checking out.",
    //img: "https://upsurge.in/images/games/MoneyMath.png",
    img: "/images/games/money-math.png",
    premium_plan: 0,
    webgl_key: "MoneyMaths_WebGL",
  },
  HighAndLow: {
    name: "High and low",
    changedId: "HighAndLow",
    description:
    "Check how much money each column has, and arrange it in ascending or descending order.",
    img: "/images/games/high-and-low.png",
    //img: assetsVideo('images/HighandLow.png",
    premium_plan: 0,
    webgl_key: "HignAndLow_WebGL",
  },
  SnakeAndLadders: {
    name: "Snake And Ladders",
    description:
    "Learn about money management with our 3D adaptation of this classic.",
    img: "/images/games/snake-and-ladders.png",
    //img: assetsVideo('images/Snake%26Ladders.png'),
    premium_plan: 0,
    webgl_key: "SnakesAndLadder_WebGL",
  },
  Ludo: {
    name: "Ludo",
    description:
      "Our adaptation of the age-old classic! Answer financial questions & get bonus moves. Let’s see how fast you can finish this 2-pawn version.",
    img: "/images/games/ludo-game.png",
    premium_plan: 0,
    webgl_key: "Ludo_WebGL",
  },
  WorldBank: {
    name: "World Bank",
    description:
    "Get behind a bank counter and learn about banking and credit economy.",
    img: "/images/games/world-bank.png",
    //img: assetsVideo('images/Snake%26Ladders.png'),
    premium_plan: 0,
    webgl_key: "WorldBank_WebGL",
  },
  DontOverspend: {
    name: "Shopping budget",
    description: "Can stay within your budget at the mall?",
    //img: assetsVideo('images/SB.png'),
    img: "/images/games/dont-overspend.png",
    pushto: "/games/DontOverspend",
    changedId: "DontOverspend",
    premium_plan: 0,
    webgl_key: "ShoppingBudget_WebGL",
  },
  NeedOrWant: {
    name: "Need and want",
    description:
    "What is the difference between a need & a want? Let’s play to find out.",
    img: "/images/games/need-and-want.png",
    //img: assetsVideo('images/NeedorWant.png'),
    premium_plan: 0,
    webgl_key: "NeedsAndWants_WebGL",
  },
  MoneyManager: {
    name: "Money manager",
    //img: assetsVideo('images/MoneyManager.png'),
    img: "/images/games/money-manager.png",
    description: "Earn money, & divide it between Saving, Expenses & Charity.",
    premium_plan: 0,
    webgl_key: "MoneyManager_WebGL",
  },

  MiniMiner: {
    name: "Mini Miner",
    description:
    "Get behind a mine and earn as much as you can.",
    img: "/images/games/mini-miner.png",
    //img: assetsVideo('images/Snake%26Ladders.png'),
    premium_plan: 0,
    webgl_key: "MiniMiner_WebGL",
  },
};

export const Simulator_Data = {
  Stock: {
    name: "Stock Simulator",
    description: "Go in a virtual simulator to learn about stock trading.",
    img: "https://imgcdn.upsurge.in/images/Pngtree-cartoon-hand-drawn-dollar-trading-3692475.png",
    pushto: "/dashboard/k/stocksimulator/home",
  },
  Crypto: {
    name: "Crypto Simulator",
    description: "Go in a virtual simulator to learn about crypto trading.",
    img: "https://imgcdn.upsurge.in/images/free-bitcoin-icon-2207-thumb.png",
    pushto: "/dashboard/k/cryptosimulator/home",
  },
};

export const Download_Games_Data = {
  MoneyAce: {
    name: "Money Ace",
    description: "Our flagship game, Money Ace is India’s first game to give children the chance to understand life, personal finance & investing in an age-relevant manner. Do your chores, take-up side gigs, save money, upskill & invest across FDs, Stock Markets, Gold, Real Estate & Crypto! The users who create the most wealth every week get great rewards!",
    logo: "/images/DownloadGames/money_ace_logo.png",
    images: [
      "/images/DownloadGames/money_ace/Money_ace_1.png",
      "/images/DownloadGames/money_ace/Money_ace_2.png",
      "/images/DownloadGames/money_ace/Money_ace_3.png",
    ],
    android_link: "",
    windows_link: "",
    playstore: "https://play.google.com/store/apps/details?id=com.upsurgefi.moneyace",
    apple: "https://apps.apple.com/us/app/upsurge-money-ace/id6450540932",
    microsoft: "",
  },

  GamesHub: {
    name: "upsurge Games Hub",
    description: "Download to get access to our games that focus on promoting Financial literacy and education.",
    logo: "/images/DownloadGames/games_hub.png",
    images: [
      "/images/DownloadGames/superapp/Image_1.png",
      "/images/DownloadGames/superapp/Image_2.png",
      "/images/DownloadGames/superapp/Image_3.png",
    ],
    android_link: "",
    windows_link: "",
    playstore: "https://play.google.com/store/apps/details?id=com.upsurgefi.gamehub",
    apple: "https://apps.apple.com/us/app/upsurge-games-hub/id6462859836",
    microsoft: "",
  },

  GourmetEmpire: {
    name: "Gourmet Empire",
    description: "Welcome to Gourmet Empire! In this thrilling tycoon game, you'll embark on a culinary journey to build and manage your very own restaurant empire. Build restaurants, hire talented chefs, and serve from a diverse range of cuisines to satisfy the taste buds of your discerning customers. Can you handle the heat of the kitchen and rise to culinary stardom?",
    logo: "/images/DownloadGames/gourmet_empire.png",
    images: [
      "/images/DownloadGames/gourmet_empire/Image_1.png",
      "/images/DownloadGames/gourmet_empire/Image_2.png",
      "/images/DownloadGames/gourmet_empire/Image_3.png",
    ],
    android_link: "",
    windows_link: "",
    playstore: "https://play.google.com/store/apps/details?id=com.upsurgefi.gourmetempire",
    apple: "",
    microsoft: "",
  },

  LemonadeStand: {
    name: "Lemonade Stand",
    description: "Experience the thrills and challenges on being an Entrepreneur. Follow Kim's journey as she starts a lemonade business and works her way to success. Meet interesting characters on the way and follow their quests. Grow your business and learn to market your product to attract more customers. Can you help Kim become a successful entrepreneur?",
    logo: "https://lh3.googleusercontent.com/OPWJICdOmxzdWJwuGcVhzF5HBOqg86pg6IwmXyIr1qzkEeEzr10IITNrIVe4X6dVhvNY",
    images: [
      "/images/DownloadGames/gourmet_empire/Image_1.png",
      "/images/DownloadGames/gourmet_empire/Image_2.png",
      "/images/DownloadGames/gourmet_empire/Image_3.png",
    ],
    android_link: "",
    windows_link: "",
    playstore: "https://play.google.com/store/apps/details?id=com.upsurgefi.lemonadeStand",
    apple: "https://apps.apple.com/us/app/lemonade-stand/id6450923108",
    microsoft: "",
  },
};
