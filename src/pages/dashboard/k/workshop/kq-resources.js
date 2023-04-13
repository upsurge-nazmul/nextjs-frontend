import React, { useState, useEffect, useContext } from "react";
import styles from "../../../styles/WaitlistDashboard/parentlogin.module.scss";
import Toast from "../../../components/Toast";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import { MainContext } from "../../../context/Main";
import PageTitle from "../../../components/PageTitle";
import LoginApis from "../../../actions/apis/LoginApis";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";

export default function ParentLogin({ userdatafromserver }) {
  console.log(userdatafromserver);
  const { userdata, setuserdata } = useContext(MainContext);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, [userdatafromserver]);
  
  return (
    <div className={styles.parentlogin}>
      <DashboardLeftPanel type="kid" />
      <PageTitle title={`upsurge | Workshop Resources`} />
      <Toast data={toastdata} />
      <div className={styles.content}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <p>Content Coming Soon</p>
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
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
        },
      };
    } else {
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
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
