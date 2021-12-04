import React, { useState } from "react";
import XoxoApis from "../../../actions/apis/XoxoApis";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import DropDown from "../../../components/DropDown";
import Toast from "../../../components/Toast";
import Reward from "../../../components/WaitlistDashboard/Reward";
import styles from "../../../styles/WaitlistDashboard/rewardspage.module.scss";
export default function Rewards({ vouchers }) {
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
          <div className={styles.wrapper}>
            {vouchers.map((item) => {
              return <Reward data={item} key={item.productId} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params, req }) {
  let res = await XoxoApis.getvouchers();
  return {
    props: {
      vouchers: res.data.data.getVouchers.data || [],
    },
  };
}
