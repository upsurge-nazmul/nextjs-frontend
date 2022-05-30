import React, { useEffect, useState } from "react";
import DashboardApis from "../../../actions/apis/DashboardApis";
import LoginApis from "../../../actions/apis/LoginApis";
import Toast from "../../../components/Toast";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import { useRouter } from "next/dist/client/router";
import styles from "../../../styles/ParentStore/parentstore.module.scss";
import RequestsAndHistorySection from "../../../components/ParentStore/RequestsAndHistorySection";
import LiveClassSection from "../../../components/ParentStore/LiveClassSection";
import AvailablePointsSection from "../../../components/ParentStore/AvailablePointsSection";
import VoucherSection from "../../../components/ParentStore/VoucherSection";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import ApproveModal from "../../../components/ParentStore/ApproveModal";
import ChoreApis from "../../../actions/apis/ChoreApis";
import VoucherApis from "../../../actions/apis/VoucherApis";

export default function ParentStore({
  isLogged,
  msg,
  choresdata,
  gamesdata,
  kidsdata,
  liveclassdata,
  vouchers,
  userdatafromserver,
  requests,
}) {
  // modes are different pages like home,kids,store,payments,notifications
  const [mode, setmode] = useState("Store");
  const router = useRouter();
  const [searchresult, setsearchresult] = useState([]);
  const [childRequests, setChildRequests] = useState(requests || []);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [showmodal, setshowmodal] = useState(false);

  const [buydata, setbuydata] = useState({
    price: 10,
    type: "rs",
    name: "",
    description: "",
  });

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

  async function SearchVoucher() {
    let res = await VoucherApis.searchvoucher({ query });
    if (res && res.data.success) {
      setsearchresult(res.data.data);
    }
  }

  return (
    <div className={styles.parentStore}>
      <DashboardLeftPanel type="parent" />
      <Toast data={toastdata} />
      <ApproveModal
        showmodal={showmodal}
        setshowmodal={setshowmodal}
        buydata={buydata}
      />
      <div className={styles.contentWrapper}>
        <DashboardHeader mode={mode} setmode={setmode} />
        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
            <RequestsAndHistorySection
              childRequests={childRequests}
              setChildRequests={setChildRequests}
              setbuydata={setbuydata}
              setshowmodal={setshowmodal}
            />
            <AvailablePointsSection kidsdata={kidsdata} />
          </div>
          <div className={styles.flexRight}>
            <VoucherSection
              vouchers={vouchers}
              unicoins={userdatafromserver.num_unicoins}
              email={userdatafromserver.email}
              phone={userdatafromserver.phone}
              kidsdata={kidsdata}
            />
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
        props: { isLogged: false, msg },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      let kidsdata = await getkidsdata(token);
      let gamesdata = await getgames(token);
      let liveclassdata = await getliveclasses(token);
      let choresdata = await getchores(token);
      let vouchers = await getvouchers(token);
      let requests = await getrequests(token);
      const props = {
        isLogged: true,
        choresdata,
        gamesdata,
        kidsdata,
        liveclassdata,
        vouchers,
        userdatafromserver: response.data.data,
        requests,
      };
      return {
        props,
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
async function getkidsdata(token) {
  let response = await DashboardApis.getkids(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
  else return null;
}
async function getchores(token) {
  let response = await ChoreApis.getpendingchores(null, token);
  if (response && response.data && response.data.data) {
    return response.data.data;
  } else return null;
}
async function getgames(token) {
  let response = await DashboardApis.getgames(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
  else return null;
}
async function getliveclasses(token) {
  let response = await DashboardApis.getliveclasses(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
  else return null;
}
async function getvouchers(token) {
  let response = await DashboardApis.getallvouchers({}, token);
  if (response && response.data && response.data.data)
    return response.data.data;
  else return null;
}

async function getrequests(token) {
  let response = await DashboardApis.getchildrequests(null, token);
  if (response && response.data && response.data.data)
    return response.data.data;
  else return null;
}
