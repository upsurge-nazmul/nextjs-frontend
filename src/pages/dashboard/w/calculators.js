import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import Toast from "../../../components/Toast";
import { MainContext } from "../../../context/Main";
import { Calc_Data } from "../../../static_data/Calc_Data";
import styles from "../../../styles/WaitlistDashboard/calcs.module.scss";
import Image from "next/image";
import LoginApis from "../../../actions/apis/LoginApis";
import Curve1 from "../../../components/SVGcomponents/Curve1";
import Curve2 from "../../../components/SVGcomponents/Curve2";
import DashboardFooter from "../../../components/Dashboard/DashboardFooter";

export default function Calculators({ userdatafromserver }) {
  const { setuserdata } = useContext(MainContext);
  const [mode, setmode] = useState("Calculators");
  const [recent_games, setrecent_games] = useState([]);
  const router = useRouter();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, []);
  return (
    <div className={styles.calcs}>
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />
      <Curve1 className={styles.curve1} />
      <Curve2 className={styles.curve2} />
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
                  </div>
                );
              }
            })}
            <DashboardFooter />
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
        props: { msg },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      return {
        props: {
          userdatafromserver: response.data.data,
        },
      };
    }
  } else {
    return {
      props: { msg: "cannot get token" },
      redirect: {
        permanent: false,
        destination: "/?err=01",
      },
    };
  }
}
