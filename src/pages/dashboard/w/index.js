import { getMessaging, getToken } from "@firebase/messaging";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import LoginApis from "../../../actions/apis/LoginApis";
import BlogApis from "../../../actions/apis/BlogApis";
import NotificationApis from "../../../actions/apis/NotificationApis";
import QuizApis from "../../../actions/apis/QuizApis";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import UnicoinsSummary from "../../../components/Dashboard/UnicoinsSummary";
import WaitlistComponent from "../../../components/Dashboard/WaitlistComponent";
import Loading from "../../../components/Loading";
import Toast from "../../../components/Toast";
import Leaderboards from "../../../components/WaitlistDashboard/Leaderboards";
import TodaysQuestion from "../../../components/WaitlistDashboard/TodaysQuestion";
import { MainContext } from "../../../context/Main";
import styles from "../../../styles/WaitlistDashboard/waitlistdashboard.module.scss";
import WaitlistBlogs from "../../../components/WaitlistDashboard/WaitlistBlogs";
import Refer from "../../../components/WaitlistDashboard/Refer";
export default function WaitlistDashboard({
  userdatafromserver,
  todaysquestion,
  blogdata,
  leaderboard,
}) {
  const { setuserdata } = useContext(MainContext);
  const [mode, setmode] = useState("home");
  const [blogs, setblogs] = useState(blogdata || []);
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
              <Leaderboards data={leaderboard} />
            </div>
            <div className={styles.flexRight} id="rightpanel">
              <UnicoinsSummary
                unicoins={userdatafromserver.num_unicoins || 0}
              />
              {todaysquestion && <TodaysQuestion data={todaysquestion} />}
              <Refer settoastdata={settoastdata} />
              <WaitlistBlogs blogs={blogs} />
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
      let tq = await QuizApis.todaysquestion(null, token);
      let blogs = await BlogApis.gethomeblogs();
      let leaderboard = await QuizApis.leaderboard();
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          todaysquestion: tq.data.success ? tq.data.data : null,
          blogdata: blogs.data.data || [],
          leaderboard: leaderboard.data.data || [],
          msg: "",
        },
      };
    }
  } else {
    return { props: { isLogged: false, msg: "cannot get token" } };
  }
}
