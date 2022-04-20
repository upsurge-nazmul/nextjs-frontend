import { useState } from "react";
import LoginApis from "../../../actions/apis/LoginApis";
import KidDashboardHeader from "../../../components/KidDashboard/KidDashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import SimulatorDash from "../../../components/StockSimulator/Dash";
import Watchlist from "../../../components/StockSimulator/Watchlist";
import Toast from "../../../components/Toast";
import styles from "../../../styles/kidDashboard/stocksimulator.module.scss";
import Logo from "../../../components/SVGcomponents/Logo";
import SimulatorProfile from "../../../components/StockSimulator/SimulatorProfile";
import Portfolio from "../../../components/StockSimulator/Portfolio";
import SimulatorMonthlyData from "./monthly.json";
import SimulatorDailyData from "./daily.json";
import CompanyData from "./companies.json";
import UserData from "./userData.json";

const MODES = ["dash", "portfolio"];

export default function StockSimulator({ userdatafromserver }) {
  const [mode, setMode] = useState(MODES[0]);
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
          {/* <div className={styles.topSection}>
            <Logo className={styles.stocksimulatorlogo} onClick={() => {}} />
            <SimulatorProfile
              avatarUrl={userdatafromserver.user_img_url}
              actionMethod={() => setMode(MODES[1])}
            />
          </div> */}
          <div className={styles.bottomSection}>
            {mode === MODES[0] && (
              <div>
                <Watchlist companyData={CompanyData} />
                <SimulatorDash
                  simulatorDailyData={SimulatorDailyData}
                  simulatorMonthlyData={SimulatorMonthlyData}
                  companyData={CompanyData}
                />
              </div>
            )}
            {mode === MODES[1] && (
              <Portfolio
                actionMethod={() => setMode(MODES[0])}
                userData={UserData[0]}
              />
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
