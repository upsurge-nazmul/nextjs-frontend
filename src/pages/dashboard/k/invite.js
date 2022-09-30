import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import DashboardApis from "../../../actions/apis/DashboardApis";
import LoginApis from "../../../actions/apis/LoginApis";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import LeftPanel from "../../../components/LeftPanel";
import styles from "../../../styles/Dashboard/invitepage.module.scss";
import Toast from "../../../components/Toast";
import Refer from "../../../components/WaitlistDashboard/Refer";
import PartnerSection from "../../../components/Home/PartnerSection";

export default function Invite({ kidsdata, userdatafromserver }) {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const router = useRouter();
  const [mode, setmode] = useState("Invite and earn");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  return (
    <div className={styles.invitepage}>
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <Toast data={toastdata} />
      <DashboardLeftPanel type="kid" />
      <div className={styles.contentWrapper}>
        <DashboardHeader mode={mode} setmode={setmode} />
        <div className={styles.mainContent}>
          <div className={styles.flexTop}>
            <Refer settoastdata={settoastdata} nomargin={true} />
          </div>
          <div className={styles.flexBottom}>
            <PartnerSection dashboard={true} nomargin={true} />
          </div>
          <br />
          <br />
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
        props: { isLogged: false, msg: msg || "Error" },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      let kidsdata = await getkidsdata(token);

      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          kidsdata,
        },
      };
    }
  } else {
    return {
      props: { isLogged: false, msg: "cannot get token", choresdata: [] },
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
}
