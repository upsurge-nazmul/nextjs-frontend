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
import RedeemSection from "../../../components/Dashboard/RedeemSection";
import AvatarsModal from "../../../components/KidStore/AvatarsModal";
import PageTitle from "../../../components/PageTitle";

export default function KidStore({
  isLogged,
  msg,
  choresdata,
  gamesdata,
  kidsdata,
  liveclassdata,
  userdatafromserver,
  avatars,
  vouchers,
}) {
  // modes are different pages like home,kids,store,payments,notifications
  const [mode, setmode] = useState("Rewards Store");
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
  const [openAvatars, setOpenAvatars] = useState(true);

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
      <PageTitle title={`upsurge | Rewards`} />
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />
      {/* <RequestModal
        data={data}
        showmodal={showmodal}
        setshowmodal={setshowmodal}
        availableUnicoins={userdatafromserver?.num_unicoins || 0}
      /> */}
      <div className={styles.contentWrapper}>
      <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <p className={styles.subheader}>
            Rewards make learning even more fun - here are all the rewards you
            can earn!
          </p>
          <div className={styles.redeem}>
            <RedeemSection />
          </div>
          {/* <div className={styles.avatars}>
            <AvailableAvatarSection
              avatars={avatars}
              setshowmodal={setshowmodal}
              setdata={setdata}
            />
          </div> */}
          {openAvatars && (
            <AvatarsModal
              avatars={avatars}
              showModal={openAvatars}
              setShowModal={setOpenAvatars}
              availableUnicoins={userdatafromserver?.num_unicoins || 0}
            />
          )}
          <div className={styles.vouchers}>
            <VoucherSection
              vouchers={vouchers}
              kid={true}
              unicoins={userdatafromserver.num_unicoins}
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
      let avatars = await getavatars(token);
      let vouchers = await getvouchers(token);
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          choresdata,
          gamesdata,
          kidsdata,
          liveclassdata,
          avatars,
          vouchers,
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
// getallvouchers
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
async function getavatars(token) {
  let response = await DashboardApis.getallavatars(null, token);
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
