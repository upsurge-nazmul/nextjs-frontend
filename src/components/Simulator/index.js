import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { MainContext } from "../../context/Main";
import SimulatorApis from "../../actions/apis/SimulatorApis";
import KidDashboardHeader from "../KidDashboard/KidDashboardHeader";
import DashboardLeftPanel from "../Dashboard/DashboardLeftPanel";
import SimulatorDash from "./Dash";
import Watchlist from "./Watchlist";
import Toast from "../Toast";
import Portfolio from "./Portfolio";
import Navigation from "./Navigation";
import Leaderboard from "./Leaderboard";
import styles from "../../styles/StockSimulator/simulator.module.scss";
import { getTodaysDateRange } from "../../helpers/timehelpers";

export default function Simulator({
  userData,
  token,
  modes = [],
  simulatorType = "stocksimulator",
}) {
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
  const { setuserdata } = useContext(MainContext);

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
        type: simulatorType,
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
          type: simulatorType,
        });
        if (allCompanies.data.success) {
          setCompanyData(allCompanies.data.data.rows);
          if (allCompanies.data.data.rows.length) {
            setSelectedSymbol(allCompanies.data.data.rows[0].symbol);
          }
        }
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
        type: simulatorType,
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
          type: simulatorType,
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
        payload: { user_id: userData.user_id },
        token,
        type: simulatorType,
      });
      if (watchlist.data.success) {
        setWatchlistData(watchlist.data.data.rows);
      }
    }
    fetchWatchlist();
  }, [token]);

  useEffect(() => {
    setuserdata(userData);
  }, []);

  const handleWatchlistClick = (value) => {
    setSelectedSymbol(value);
    if (mode !== modes[0].value) {
      router.push(`/dashboard/w/${simulatorType}/${modes[0].value}`);
    }
  };

  return (
    <div className={styles.stockSimulator}>
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <KidDashboardHeader
          mode={
            simulatorType === "cryptosimulator"
              ? "Crypto Simulator"
              : "Stock Simulator"
          }
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <div className={styles.topSection}>
            {/* This navigation is visible in mobile only and hidden in tabs and laptops */}
            <div className={styles.phoneNavigation}>
              <Navigation options={modes} action={setMode} active={mode} />
            </div>
            {selectedSymbol && (
              <Watchlist
                watchlistData={watchlistData}
                setWatchlistData={setWatchlistData}
                companyData={companyData}
                action={handleWatchlistClick}
                active={selectedSymbol}
                token={token}
                settoastdata={settoastdata}
                simulatorType={simulatorType}
              />
            )}
            {/* This navigation is hidden in mobile and visible in tabs and laptops */}
            <div className={styles.normalNavigation}>
              <Navigation
                options={modes}
                action={setMode}
                active={mode}
                simulatorType={simulatorType}
              />
            </div>
          </div>
          <div className={styles.bottomSection}>
            {mode === modes[0].value && (
              <>
                {simulatorDailyData && (
                  <SimulatorDash
                    token={token}
                    simulatorDailyData={simulatorDailyData}
                    companyData={companyData}
                    selectedSymbol={selectedSymbol}
                    setSelectedSymbol={setSelectedSymbol}
                    userData={userData}
                    watchlistData={watchlistData}
                    setWatchlistData={setWatchlistData}
                    simulatorType={simulatorType}
                  />
                )}
              </>
            )}
            {mode === modes[1].value && (
              <Portfolio
                userData={userData}
                token={token}
                simulatorType={simulatorType}
              />
            )}
            {mode === modes[2].value && (
              <Leaderboard
                token={token}
                userData={userData}
                simulatorType={simulatorType}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
