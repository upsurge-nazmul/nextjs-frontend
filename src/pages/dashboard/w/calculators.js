import { useRouter } from "next/dist/client/router";
import React, { useContext, useState } from "react";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import Toast from "../../../components/Toast";
import { MainContext } from "../../../context/Main";
import { Calc_Data } from "../../../static_data/Calc_Data";
import styles from "../../../styles/WaitlistDashboard/calcs.module.scss";
import Image from "next/image";

export default function Calculators() {
  const { setuserdata } = useContext(MainContext);
  const [mode, setmode] = useState("Calculators");
  const [recent_games, setrecent_games] = useState([]);
  const router = useRouter();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  return (
    <div className={styles.calcs}>
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />

      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <div className={styles.calculatorsList}>
            {Object.keys(Calc_Data).map((item, index) => {
              if (item === "main") {
                return null;
              } else {
                return (
                  <div
                    key={"calccalrd" + index}
                    className={styles.calcCard}
                    onClick={() =>
                      router.push(`/dashboard/w/calculator/${item}`)
                    }
                  >
                    <div className={styles.cardimg}>
                      <Image
                        src={Calc_Data[item].icon}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <p className={styles.calccardtitle}>
                      {Calc_Data[item].heading}
                    </p>
                    <p className={styles.calccardsubtitle}>
                      {Calc_Data[item].subheading}
                    </p>
                    <p className={styles.date}>
                      By Upsurge Team, 5th Aug, 2021
                    </p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
