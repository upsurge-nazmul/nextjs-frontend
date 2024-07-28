import React, { useContext, useEffect, useState } from "react";
import DashboardApis from "../../../actions/apis/DashboardApis";
import LoginApis from "../../../actions/apis/LoginApis";
import XoxoApis from "../../../actions/apis/XoxoApis";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import RedeemSection from "../../../components/Dashboard/RedeemSection";
import Toast from "../../../components/Toast";
import Reward from "../../../components/WaitlistDashboard/Reward";
import { MainContext } from "../../../context/Main";
import styles from "../../../styles/WaitlistDashboard/rewardspage.module.scss";
export default function Rewards({ userdatafromserver, vouchers }) {
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const { setuserdata } = useContext(MainContext);
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, []);
  const [mode, setmode] = useState("Rewards");
  const [user_unicoin, setuser_unicoin] = useState(
    Number(userdatafromserver.num_unicoins) || 0
  );
  const [user_balance, setuser_balance] = useState(
    Number(userdatafromserver.num_balance) || 0
  );
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
          <RedeemSection
            user_balance={user_balance}
            setuser_balance={setuser_balance}
            user_unicoin={user_unicoin}
            setuser_unicoin={setuser_unicoin}
            settoastdata={settoastdata}
          />
          <div className={styles.wrapper}>
            {vouchers.map((item) => {
              return (
                <Reward
                  data={item.data}
                  key={item.id}
                  email={userdatafromserver.email}
                  phone={userdatafromserver.phone}
                  balance={user_balance}
                  unicoin={user_unicoin}
                  setuser_balance={setuser_balance}
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
      let res = await DashboardApis.getallvouchers(null, token);
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          vouchers:
            fixVoucherArray(
              res.data.data,
              Number(response.data.data.num_balance)
            ) || [],
          msg: "",
        },
      };
    }
  } else {
    return { props: { isLogged: false, msg: "cannot get token" } };
  }
}

function fixVoucherArray(array, balance) {
  let newarray = [];
  let available = [];
  for (let i = 0; i < array.length; i++) {
    if (Number(array[i].data.valueDenominations.split(",")[0]) > balance) {
      newarray.push(array[i]);
    } else {
      available.push(array[i]);
    }
  }
  return [...available, ...newarray];
}
