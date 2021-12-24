import React, { useContext, useEffect, useState } from "react";
import DashboardApis from "../../../actions/apis/DashboardApis";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import LoginApis from "../../../actions/apis/LoginApis";
import Image from "next/image";
import styles from "../../../styles/Dashboard/transactions.module.scss";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import Toast from "../../../components/Toast";
import { MainContext } from "../../../context/Main";
export default function transactions({ userdatafromserver, vouchers }) {
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
                <div key={item.id} className={styles.voucher}>
                  <div className={styles.imgwrapper}>
                    <Image
                      src={item?.img_url}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <div className={styles.data}>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.vendor}>Vendor : {item.vendor}</p>
                    <p className={styles.time}>
                      Date :{" "}
                      {new Date(Number(item.timestamp)).getDate() +
                        "-" +
                        new Date(Number(item.timestamp)).getMonth() +
                        "-" +
                        new Date(Number(item.timestamp)).getFullYear() +
                        " " +
                        new Date(Number(item.timestamp)).getHours() +
                        ":" +
                        new Date(Number(item.timestamp)).getMinutes()}
                    </p>
                  </div>
                  <div className={styles.details}>View Code</div>
                </div>
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
