import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { MainContext } from "../../../../context/Main";
import LoginApis from "../../../../actions/apis/LoginApis";
import SimulatorApis from "../../../../actions/apis/SimulatorApis";
import KidDashboardHeader from "../../../../components/KidDashboard/KidDashboardHeader";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import Toast from "../../../../components/Toast";
import { getTodaysDateRange } from "../../../../helpers/timehelpers";

import DashboardSvg from "../../../../components/SVGcomponents/StockSimulator/DashboardSvg";
import PortfolioSvg from "../../../../components/SVGcomponents/StockSimulator/PortfolioSvg";
import LeaderboardSvg from "../../../../components/SVGcomponents/StockSimulator/LeaderboardSvg";

import Simulator from "../../../../components/Simulator";

const MODES = [
  { name: "Home", value: "home", icon: <DashboardSvg /> },
  { name: "Portfolio", value: "portfolio", icon: <PortfolioSvg /> },
  { name: "Leaderboard", value: "leaderboard", icon: <LeaderboardSvg /> },
];

export default function CryptoSimulator({ userdatafromserver, token }) {
  return (
    <Simulator
      {...{
        userData: userdatafromserver,
        token,
        modes: MODES,
        simulatorType: "cryptosimulator",
      }}
    />
  );
}

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg;
      return {
        props: {
          isLogged: false,
          msg,
        },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      return {
        props: {
          userdatafromserver:
            response && response.data && response.data.data
              ? response.data.data
              : [],
          token,
        },
      };
    }
  } else {
    return {
      props: { isLogged: false, msg: "cannot get token" },
      redirect: {
        permanent: false,
        destination: "/?err=01",
      },
    };
  }
}
