import React, { useContext, useEffect, useState } from "react";
import DashboardApis from "../../../actions/apis/DashboardApis";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import LoginApis from "../../../actions/apis/LoginApis";
import styles from "../../../styles/Dashboard/transactions.module.scss";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import Toast from "../../../components/Toast";
import { MainContext } from "../../../context/Main";
import TransactionVoucher from "../../../components/Dashboard/TransactionVoucher";
export default function Transactions({ userdatafromserver, vouchers }) {
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [mode, setmode] = useState("Transactions");
  const { setuserdata } = useContext(MainContext);
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, []);
  return (
    <div className={styles.transactionspage}>
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <div className={styles.voucherWrapper}>
            {vouchers.map((item) => {
              return (
                <TransactionVoucher
                  data={item}
                  key={item.id}
                  settoastdata={settoastdata}
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
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      return {
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      let data = await DashboardApis.getuservouchers(null, token);
      return {
        props: {
          userdatafromserver: response.data.data,
          vouchers: data.data.data || [],
          msg: "",
        },
      };
    }
  } else
    return {
      redirect: {
        permanent: false,
        destination: "/?err=01",
      },
    };
}
