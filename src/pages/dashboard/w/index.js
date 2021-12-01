import { getMessaging, getToken } from "@firebase/messaging";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import LoginApis from "../../../actions/apis/LoginApis";
import NotificationApis from "../../../actions/apis/NotificationApis";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import WaitlistComponent from "../../../components/Dashboard/WaitlistComponent";
import Loading from "../../../components/Loading";
import Toast from "../../../components/Toast";
import { MainContext } from "../../../context/Main";
import styles from "../../../styles/WaitlistDashboard/waitlistdashboard.module.scss";
export default function WaitlistDashboard({ userdatafromserver }) {
  const { setuserdata } = useContext(MainContext);
  const [mode, setmode] = useState("home");
  const router = useRouter();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  useEffect(() => {
    const scrollContainer = document.querySelector("#gamecardwrapper");
    if (!scrollContainer) return;
    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
    });
  });
  useEffect(() => {
    if (!userdatafromserver) {
      router.push("/?err=01");
    } else {
      setuserdata(userdatafromserver);
    }
  }, [userdatafromserver]);

  useEffect(() => {
    if (userdatafromserver?.user_type === "child") {
      router.push("/kiddashboard");
    }
  }, [userdatafromserver]);

  useEffect(() => {
    let rightpanel = document.getElementById("rightpanel");
    let leftside = document.getElementById("leftside");
    if (rightpanel) {
      leftside.style.setProperty(
        "--height",
        rightpanel.scrollHeight - 100 + "px"
      );
    }
  }, []);

  useEffect(() => {
    saveNotificationToken();
    async function saveNotificationToken() {
      let messaging = getMessaging();
      let token = "";
      try {
        token = await getToken(messaging);
      } catch (err) {
        settoastdata({
          show: true,
          msg: "Notifications Blocked",
          type: "error",
        });
      }
      let response = await NotificationApis.addToken({ type: "web", token });
    }
  }, []);
  useEffect(() => {
    if (router.query.err) {
      if (router.query.err === "03") {
        settoastdata({
          show: true,
          type: "error",
          msg: "Please add a child first",
        });
        router.push("/dashboard");
      }
    }
  }, [router.query]);

  if (!userdatafromserver) {
    return <Loading />;
  } else
    return (
      <div className={styles.waitlistdashboard}>
        <DashboardLeftPanel type="waitlist" />
        <Toast data={toastdata} />
        <div className={styles.contentWrapper}>
          <DashboardHeader
            mode={mode}
            setmode={setmode}
            settoastdata={settoastdata}
          />
          <div className={styles.mainContent}>
            <div className={styles.flexLeft} id="leftside">
              <div className={styles.kidsSection}>
                <WaitlistComponent
                  email={userdatafromserver.email}
                  waitNum={userdatafromserver.waiting_number}
                />
              </div>
            </div>
            <div className={styles.flexRight} id="rightpanel"></div>
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
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          msg: "",
        },
      };
    }
  } else {
    return { props: { isLogged: false, msg: "cannot get token" } };
  }
}
