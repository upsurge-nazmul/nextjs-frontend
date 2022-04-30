import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoginApis from "../../../../actions/apis/LoginApis";
import SimulatorApis from "../../../../actions/apis/SimulatorApis";
import KidDashboardHeader from "../../../../components/KidDashboard/KidDashboardHeader";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import SimulatorDash from "../../../../components/StockSimulator/Dash";
import Watchlist from "../../../../components/StockSimulator/Watchlist";
import Toast from "../../../../components/Toast";
import Portfolio from "../../../../components/StockSimulator/Portfolio";
import Navigation from "../../../../components/StockSimulator/Navigation";
import styles from "../../../../styles/StockSimulator/stocksimulator.module.scss";
import { getTodaysDateRange } from "../../../../helpers/timehelpers";

import DashboardSvg from "../../../../components/SVGcomponents/StockSimulator/DashboardSvg";
import PortfolioSvg from "../../../../components/SVGcomponents/StockSimulator/PortfolioSvg";
import LeaderboardSvg from "../../../../components/SVGcomponents/StockSimulator/LeaderboardSvg";

import Leaderboard from "../../../../components/StockSimulator/Leaderboard";

const MODES = [
  { name: "Home", value: "home", icon: <DashboardSvg /> },
  { name: "Portfolio", value: "portfolio", icon: <PortfolioSvg /> },
  { name: "Leaderboard", value: "leaderboard", icon: <LeaderboardSvg /> },
];

export default function StockSimulator({ userdatafromserver, token }) {
  const router = useRouter();
  const [mode, setMode] = useState(router.query.page);
  const [companyData, setCompanyData] = useState();
  const [selectedSymbol, setSelectedSymbol] = useState();
  const [simulatorDailyData, setSimulatorDailyData] = useState();
  const [watchlistData, setWatchlistData] = useState();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  useEffect(() => {
    setMode(router.query.page);
  }, [router.query.page]);

  useEffect(() => {
    async function fetchCompanies() {
      let allCompanies = await SimulatorApis.getStocks({
        payload: {
          from: getTodaysDateRange().from,
          to: getTodaysDateRange().to,
        },
        token,
      });
      if (allCompanies.data.data.rows.length) {
        setCompanyData(allCompanies.data.data.rows);
        setSelectedSymbol(allCompanies.data.data.rows[0].symbol);
      } else {
        let allCompanies = await SimulatorApis.getStocks({
          payload: {
            from: getTodaysDateRange(true).from,
            to: getTodaysDateRange(true).to,
          },
          token,
        });
        setCompanyData(allCompanies.data.data.rows);
        setSelectedSymbol(allCompanies.data.data.rows[0].symbol);
      }
    }
    fetchCompanies();
  }, [token]);

  useEffect(() => {
    async function fetchStocks() {
      let dailyStocks = await SimulatorApis.getStocks({
        payload: {
          from: getTodaysDateRange().from,
          to: getTodaysDateRange().to,
          symbol: selectedSymbol,
        },
        token,
      });
      if (dailyStocks.data.data.rows.length) {
        setSimulatorDailyData(dailyStocks.data.data.rows);
      } else {
        let dailyStocks = await SimulatorApis.getStocks({
          payload: {
            from: getTodaysDateRange(true).from,
            to: getTodaysDateRange(true).to,
            symbol: selectedSymbol,
          },
          token,
        });
        setSimulatorDailyData(dailyStocks.data.data.rows);
      }
    }
    if (selectedSymbol) {
      fetchStocks();
    }
  }, [token, selectedSymbol]);

  useEffect(() => {
    async function fetchWatchlist() {
      let watchlist = await SimulatorApis.getWatchlist({
        payload: { user_id: userdatafromserver.user_id },
        token,
      });
      setWatchlistData(watchlist.data.data.rows);
    }
    fetchWatchlist();
  }, [token]);

  const handleWatchlistClick = (value) => {
    setSelectedSymbol(value);
    if (mode !== MODES[0].value) {
      router.push(`/dashboard/w/stocksimulator/${MODES[0].value}`);
    }
  };

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
            {selectedSymbol && (
              <Watchlist
                watchlistData={watchlistData}
                setWatchlistData={setWatchlistData}
                companyData={companyData}
                action={handleWatchlistClick}
                active={selectedSymbol}
                token={token}
                settoastdata={settoastdata}
              />
            )}
            <Navigation options={MODES} action={setMode} active={mode} />
          </div>
          <div className={styles.bottomSection}>
            {mode === MODES[0].value && (
              <>
                {simulatorDailyData && (
                  <SimulatorDash
                    token={token}
                    simulatorDailyData={simulatorDailyData}
                    companyData={companyData}
                    selectedSymbol={selectedSymbol}
                    setSelectedSymbol={setSelectedSymbol}
                    userData={userdatafromserver}
                    watchlistData={watchlistData}
                    setWatchlistData={setWatchlistData}
                  />
                )}
              </>
            )}
            {mode === MODES[1].value && (
              <Portfolio userData={userdatafromserver} token={token} />
            )}
            {mode === MODES[2].value && (
              <Leaderboard token={token} userData={userdatafromserver} />
            )}
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
