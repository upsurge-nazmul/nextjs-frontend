import { useState } from "react";
import LoginApis from "../../../../actions/apis/LoginApis";
import KidDashboardHeader from "../../../../components/KidDashboard/KidDashboardHeader";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import SimulatorDash from "../../../../components/StockSimulator/Dash";
import Watchlist from "../../../../components/StockSimulator/Watchlist";
import Toast from "../../../../components/Toast";
import Portfolio from "../../../../components/StockSimulator/Portfolio";
import Navigation from "../../../../components/StockSimulator/Navigation";
import styles from "../../../../styles/StockSimulator/stocksimulator.module.scss";

import DashboardSvg from "../../../../components/SVGcomponents/StockSimulator/DashboardSvg";
import PortfolioSvg from "../../../../components/SVGcomponents/StockSimulator/PortfolioSvg";
import LeaderboardSvg from "../../../../components/SVGcomponents/StockSimulator/LeaderboardSvg";

import SimulatorMonthlyData from "./monthly.json";
import SimulatorDailyData from "./daily.json";
import CompanyData from "./companies.json";
import UserData from "./userData.json";
import Leaderboard from "../../../../components/StockSimulator/Leaderboard";

const MODES = [
  { name: "Dashboard", value: "dashboard", icon: <DashboardSvg /> },
  { name: "Portfolio", value: "portfolio", icon: <PortfolioSvg /> },
  { name: "Leaderboard", value: "leaderboard", icon: <LeaderboardSvg /> },
];

export default function StockSimulator() {
  const [mode, setMode] = useState(MODES[1].value);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  return (
    <div className={styles.stockSimulator}>
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <KidDashboardHeader
          mode={"Stock Simulator"}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <div className={styles.topSection}>
            <Watchlist companyData={CompanyData} />
            <Navigation options={MODES} action={setMode} active={mode} />
          </div>
          <div className={styles.bottomSection}>
            {mode === MODES[0].value && (
              <div>
                <SimulatorDash
                  simulatorDailyData={SimulatorDailyData}
                  simulatorMonthlyData={SimulatorMonthlyData}
                  companyData={CompanyData}
                />
              </div>
            )}
            {mode === MODES[1].value && <Portfolio userData={UserData[0]} />}
            {mode === MODES[2].value && <Leaderboard />}
          </div>
        </div>
      </div>
    </div>
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
        props: { isLogged: false, msg },
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
