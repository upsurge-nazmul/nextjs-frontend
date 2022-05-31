import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { MainContext } from "../../context/Main";
import { MODES } from "./constants";
import SimulatorApis from "../../actions/apis/SimulatorApis";
import KidDashboardHeader from "../KidDashboard/KidDashboardHeader";
import DashboardLeftPanel from "../Dashboard/DashboardLeftPanel";
import Home from "./Home";
import Companies from "./Dash";
import Toast from "../Toast";
import Portfolio from "./Portfolio";
import Navigation from "./Navigation";
import Competition from "./Competition";
import Challenges from "./Challenges";
import styles from "../../styles/StockSimulator/simulator.module.scss";

export default function Simulator({
  userData,
  token,
  simulatorType = "stocksimulator",
  type = "waitlist",
}) {
  const router = useRouter();
  const [mode, setMode] = useState(router.query.page);
  const [companyData, setCompanyData] = useState();
  const [selectedSymbol, setSelectedSymbol] = useState();
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
        payload: {},
        token,
        type: simulatorType,
      });
      if (allCompanies.data && allCompanies.data.data.rows.length) {
        setCompanyData(allCompanies.data.data.rows);
        setSelectedSymbol(allCompanies.data.data.rows[0].symbol);
      }
    }
    fetchCompanies();
  }, [token]);

  useEffect(() => {
    setuserdata(userData);
  }, []);

  return (
    <div className={styles.stockSimulator}>
      <DashboardLeftPanel type={type} />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <KidDashboardHeader
          mode={
            simulatorType === "cryptosimulator"
              ? "Crypto Simulator"
              : "Stock Simulator"
          }
          settoastdata={settoastdata}
          additionalNavigation={
            <Navigation
              options={MODES}
              action={setMode}
              active={mode}
              simulatorType={simulatorType}
            />
          }
        />
        <div className={styles.mainContent}>
          <div className={styles.bottomSection}>
            {mode === MODES[0].value && (
              <Home
                userData={userData}
                token={token}
                simulatorType={simulatorType}
                setSelectedSymbol={setSelectedSymbol}
              />
            )}
            {mode === MODES[1].value && (
              <Companies
                token={token}
                companyData={companyData}
                selectedSymbol={selectedSymbol}
                setSelectedSymbol={setSelectedSymbol}
                userData={userData}
                simulatorType={simulatorType}
                settoastdata={settoastdata}
              />
            )}
            {mode === MODES[2].value && (
              <Portfolio
                userData={userData}
                token={token}
                simulatorType={simulatorType}
              />
            )}
            {mode === MODES[3].value && (
              <Challenges
                token={token}
                userData={userData}
                simulatorType={simulatorType}
              />
            )}
            {mode === MODES[4].value && (
              <Competition
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
