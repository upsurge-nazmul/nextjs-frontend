import React, { useEffect, useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import LoginApis from "../../actions/apis/LoginApis";
import Toast from "../../components/Toast";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/ParentStore/parentstore.module.scss";
import RequestsAndHistorySection from "../../components/ParentStore/RequestsAndHistorySection";
import LiveClassSection from "../../components/ParentStore/LiveClassSection";
import AvailablePointsSection from "../../components/ParentStore/AvailablePointsSection";
import VoucherSection from "../../components/ParentStore/VoucherSection";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import ApproveModal from "../../components/ParentStore/ApproveModal";

export default function ParentStore({
  isLogged,
  msg,
  choresdata,
  gamesdata,
  kidsdata,
  liveclassdata,
}) {
  // modes are different pages like home,kids,store,payments,notifications
  const [mode, setmode] = useState("Store");
  const router = useRouter();
  const [showmodal, setshowmodal] = useState(false);
  const [kids, setkids] = useState(kidsdata || []);
  const [familyfun, setfamilyfun] = useState(gamesdata || []);
  const [chores, setchores] = useState(choresdata || []);
  const [liveclasses, setliveclasses] = useState(liveclassdata || []);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const badges = ["", "", ""];
  const tribes = ["", "", ""];
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
    <div className={styles.parentStore}>
      <DashboardLeftPanel type="parent" />
      <Toast data={toastdata} />
      <ApproveModal showmodal={showmodal} setshowmodal={setshowmodal} />
      <div className={styles.contentWrapper}>
        <DashboardHeader mode={mode} setmode={setmode} />
        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
            <RequestsAndHistorySection setshowmodal={setshowmodal} />
            <LiveClassSection />
          </div>
          <div className={styles.flexRight}>
            <AvailablePointsSection />
            <VoucherSection />
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
      return { props: { isLogged: false, msg } };
    } else {
      let kidsdata = await getkidsdata(token);
      let gamesdata = await getgames(token);
      let liveclassdata = await getliveclasses(token);
      let choresdata = await getchores(token);

      return {
        props: {
          isLogged: true,
          choresdata,
          gamesdata,
          kidsdata,
          liveclassdata,
        },
      };
    }
  } else {
    return { props: { isLogged: false, msg: "cannot get token" } };
  }
}
async function getkidsdata(token) {
  let response = await DashboardApis.getkids(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}
async function getchores(token) {
  let response = await DashboardApis.getpendingchores(null, token);
  if (response && response.data && response.data.data) {
    return response.data.data;
  }
}
async function getgames(token) {
  let response = await DashboardApis.getgames(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}
async function getliveclasses(token) {
  let response = await DashboardApis.getliveclasses(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
}
