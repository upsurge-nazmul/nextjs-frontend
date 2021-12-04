import React, { useState } from "react";
import LoginApis from "../../../actions/apis/LoginApis";
import XoxoApis from "../../../actions/apis/XoxoApis";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import DropDown from "../../../components/DropDown";
import Toast from "../../../components/Toast";
import Reward from "../../../components/WaitlistDashboard/Reward";
import styles from "../../../styles/WaitlistDashboard/rewardspage.module.scss";
export default function Rewards({ userdatafromserver, vouchers }) {
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [mode, setmode] = useState("Rewards");
  return (
    <div className={styles.leaderboard}>
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />

      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <div className={styles.head}>
            You currently have {userdatafromserver.num_unicoins} Unicoins.
          </div>
          <div className={styles.wrapper}>
            {vouchers.map((item) => {
              return (
                <Reward
                  data={item}
                  key={item.productId}
                  unicoin={userdatafromserver.num_unicoins}
                />
              );
            })}
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
      return { props: { isLogged: false, msg: msg || "Error" } };
    } else {
      let res = await XoxoApis.getvouchers();
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          vouchers: res.data.data.getVouchers.data || [],
          msg: "",
        },
      };
    }
  } else {
    return { props: { isLogged: false, msg: "cannot get token" } };
  }
}
