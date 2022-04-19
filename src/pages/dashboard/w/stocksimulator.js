import { useState } from "react";
import LoginApis from "../../../actions/apis/LoginApis";
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

export default function StockSimulator({ userdatafromserver }) {
  const [mode, setMode] = useState("portfolio");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  console.log(mode);

  return (
    <div className={styles.stockSimulator}>
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <div className={styles.topSection}>
          <Logo className={styles.stocksimulatorlogo} onClick={() => {}} />
          <Watchlist companyData={CompanyData} />
          <SimulatorProfile
            avatarUrl={userdatafromserver.user_img_url}
            actionMethod={() => setMode("portfolio")}
          />
        </div>
        {mode === "dash" && (
          <div className={styles.bottomSection}>
            <SimulatorDash
              simulatorDailyData={SimulatorDailyData}
              simulatorMonthlyData={SimulatorMonthlyData}
              companyData={CompanyData}
            />
          </div>
        )}
        {mode === "portfolio" && (
          <Portfolio actionMethod={() => setMode("dash")} />
        )}
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
