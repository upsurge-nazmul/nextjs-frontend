import { getMessaging, getToken } from "@firebase/messaging";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import LoginApis from "../../../actions/apis/LoginApis";
import BlogApis from "../../../actions/apis/BlogApis";
import NotificationApis from "../../../actions/apis/NotificationApis";
import QuizApis from "../../../actions/apis/QuizApis";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import Loading from "../../../components/Loading";
import Toast from "../../../components/Toast";
import TodaysQuestion from "../../../components/WaitlistDashboard/TodaysQuestion";
import { MainContext } from "../../../context/Main";
import styles from "../../../styles/WaitlistDashboard/waitlistdashboard.module.scss";
import WaitlistBlogs from "../../../components/WaitlistDashboard/WaitlistBlogs";
import Refer from "../../../components/WaitlistDashboard/Refer";
import RewardSvg from "../../../components/SVGcomponents/RewardSvg";
import QuizIconSvg from "../../../components/SVGcomponents/QuizIconSvg";
import GameSvg from "../../../components/SVGcomponents/GameSvg";
import DetailsPopUp from "../../../components/WaitlistDashboard/DetailsPopUp";
export default function WaitlistDashboard({
  userdatafromserver,
  todaysquestion,
  blogdata,
  leaderboard,
  highestquizscore,
}) {
  const { setuserdata } = useContext(MainContext);
  const [mode, setmode] = useState("home");
  const [showdetails, setshowdetails] = useState(false);
  const [blogs, setblogs] = useState(blogdata || []);
  const router = useRouter();
  const [current, setcurrent] = useState("earlyaccess");
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
          {showdetails && (
            <DetailsPopUp
              setshowdetails={setshowdetails}
              current={current}
              earlyaccessno={userdatafromserver.waiting_number}
            />
          )}
          <div className={styles.mainContent}>
            <div className={styles.flexTop} id="leftside">
              <div className={styles.flipcard}>
                <div className={styles.inner}>
                  <div className={styles.front}>
                    <div className={`${styles.waitlistblock} `}>
                      <p className={styles.heading}>
                        {`#${userdatafromserver.waiting_number}`}
                      </p>
                      <p className={styles.subheading}>Waitlist Number</p>
                    </div>
                  </div>
                  <div
                    className={`${styles.back} ${styles.waitlistback}`}
                    onClick={() => {
                      setcurrent("earlyaccess");
                      setshowdetails(true);
                    }}
                  >
                    <RewardSvg className={styles.reward} />
                    <p className={styles.text}>Check currect rewards</p>
                  </div>
                </div>
              </div>
              <div className={styles.flipcard}>
                <div className={styles.inner}>
                  <div className={styles.front}>
                    <div className={styles.uniblock}>
                      <div className={styles.blocks}>
                        <div className={styles.block}>
                          <div className={styles.border}></div>
                          <p className={styles.heading}>Earned Unicoins</p>
                          <p className={styles.subheading}>
                            {userdatafromserver.num_unicoins || 0}
                          </p>
                        </div>
                        <div className={styles.block}>
                          <p className={styles.heading}>INR</p>
                          <p className={styles.subheading}>
                            {Math.round(
                              Number(userdatafromserver.num_unicoins) / 5
                            ) || 0}
                          </p>
                        </div>
                      </div>
                      <p className={styles.subheading}>Rewards</p>
                    </div>
                  </div>
                  <div
                    className={`${styles.back} ${styles.rewardback}`}
                    onClick={() => router.push("/dashboard/w/rewards")}
                  >
                    <RewardSvg className={styles.reward} />
                    <p className={styles.text}>Redeem rewards</p>
                  </div>
                </div>
              </div>
              <div className={styles.flipcard}>
                <div className={styles.inner}>
                  <div className={styles.front}>
                    <div className={styles.quizblock}>
                      <p className={styles.heading}>{highestquizscore}%</p>
                      <p className={styles.subheading2}>
                        {highestquizscore < 50
                          ? "Money Rookie"
                          : highestquizscore < 80
                          ? "Money Ninja"
                          : "Money Master"}
                      </p>
                      <p className={styles.subheading}>Quiz Score</p>
                    </div>
                  </div>
                  <div
                    className={`${styles.back} ${styles.quizback}`}
                    onClick={() => router.push("/dashboard/w/quiz")}
                  >
                    <QuizIconSvg className={styles.icon} />
                    <p className={styles.text}>Play quiz</p>
                  </div>
                </div>
              </div>
              <div className={styles.flipcard}>
                <div className={styles.inner}>
                  <div className={styles.front}>
                    <div className={styles.gameblock}>
                      <div className={styles.block}>
                        <p className={styles.heading}>
                          {userdatafromserver.num_refers || 0}
                        </p>
                        <p className={styles.subheading}>Completed referrals</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.back} ${styles.gameback}`}
                    onClick={() => {
                      setcurrent("refferal");
                      setshowdetails(true);
                    }}
                  >
                    <GameSvg className={styles.gameicon} />
                    <p className={styles.text}>Know more</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.flexMid}>
              {todaysquestion && <TodaysQuestion data={todaysquestion} />}
              <Refer settoastdata={settoastdata} />
            </div>
            <div className={styles.flexBottom} id="rightpanel">
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
      if (!response.data.data.is_waiting_active) {
        if (response.data.data.user_type === "parent") {
          return {
            props: { isLogged: false, msg: msg || "Error" },
            redirect: {
              permanent: false,
              destination: "/dashboard/p",
            },
          };
        } else
          return {
            props: { isLogged: false, msg: msg || "Error" },
            redirect: {
              permanent: false,
              destination: "/dashboard/k",
            },
          };
      }
      let tq = await QuizApis.todaysquestion(null, token);
      let blogs = await BlogApis.gethomeblogs();
      let leaderboard = await QuizApis.leaderboard();
      let highestquizscore = await QuizApis.highestscore({
        email: response.data.data.email,
      });
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          todaysquestion: tq?.data?.success ? tq.data.data : null,
          blogdata: blogs?.data.data || [],
          leaderboard: leaderboard?.data.data || [],
          highestquizscore: highestquizscore?.data?.data?.score
            ? Math.round(highestquizscore.data.data.score / 0.72)
            : 0,
          msg: "",
        },
      };
    }
  } else {
    return { props: { isLogged: false, msg: "cannot get token" } };
  }
}
