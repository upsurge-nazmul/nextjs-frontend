import React, { useEffect, useState } from "react";
import DashboardApis from "../../../actions/apis/DashboardApis";
import LoginApis from "../../../actions/apis/LoginApis";
import Toast from "../../../components/Toast";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import { useRouter } from "next/dist/client/router";
import styles from "../../../styles/KidStore/kidstore.module.scss";
import RequestsAndHistorySection from "../../../components/ParentStore/RequestsAndHistorySection";
import LiveClassSection from "../../../components/ParentStore/LiveClassSection";
import AvailablePointsSection from "../../../components/ParentStore/AvailablePointsSection";
import VoucherSection from "../../../components/ParentStore/VoucherSection";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import ApproveModal from "../../../components/ParentStore/ApproveModal";
import AvailableAvatarSection from "../../../components/KidStore/AvailableAvatarSection";
import RequestModal from "../../../components/KidStore/RequestModal";
import ChoreApis from "../../../actions/apis/ChoreApis";
import { useContext } from "react";
import { MainContext } from "../../../context/Main";
import KidDashboardHeader from "../../../components/KidDashboard/KidDashboardHeader";

export default function KidStore({ isLogged, msg, userdatafromserver }) {
  // modes are different pages like home,kids,store,payments,notifications
  const [mode, setmode] = useState("Knowledge Quest");
  const { userdata, setuserdata } = useContext(MainContext);
  const router = useRouter();
  const [showmodal, setshowmodal] = useState(false);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [data, setdata] = useState({
    name: "",
    price: "",
  });
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, [userdatafromserver]);
  useEffect(() => {
    if (isLogged === false) {
      console.log(isLogged);
      settoastdata({
        show: true,
        type: "error",
        msg: msg,
      });
      router.push("/");
    }
  }, [isLogged]);

  return (
    <div className={styles.kidStore}>
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />
      <RequestModal
        data={data}
        showmodal={showmodal}
        setshowmodal={setshowmodal}
        availableUnicoins={userdatafromserver?.num_unicoins || 0}
      />
      <div className={styles.contentWrapper}>
        <KidDashboardHeader mode={mode} setmode={setmode} />
        <div className={styles.mainContent}>
          <div className={styles.flexLeft}></div>
          <div className={styles.flexRight}></div>
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
