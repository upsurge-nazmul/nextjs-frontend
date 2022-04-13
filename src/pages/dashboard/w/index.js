import { getMessaging, getToken } from "@firebase/messaging";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import LoginApis from "../../../actions/apis/LoginApis";
import BlogApis from "../../../actions/apis/BlogApis";
import NotificationApis from "../../../actions/apis/NotificationApis";
import QuizApis from "../../../actions/apis/QuizApis";
import FreeGameApis from "../../../actions/apis/FreeGameApis";
import DashboardApis from "../../../actions/apis/DashboardApis";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import Loading from "../../../components/Loading";
import Toast from "../../../components/Toast";
import TodaysQuestion from "../../../components/WaitlistDashboard/TodaysQuestion";
import { MainContext } from "../../../context/Main";
import styles from "../../../styles/WaitlistDashboard/waitlistdashboard.module.scss";
import WaitlistBlogs from "../../../components/WaitlistDashboard/WaitlistBlogs";
import Refer from "../../../components/WaitlistDashboard/Refer";
import RewardSvg from "../../../components/SVGcomponents/RewardSvg";
import InfoIcon from "@mui/icons-material/Info";
import QuizIconSvg from "../../../components/SVGcomponents/QuizIconSvg";
import GameSvg from "../../../components/SVGcomponents/GameSvg";
import DetailsPopUp from "../../../components/WaitlistDashboard/DetailsPopUp";
import DashboardFooter from "../../../components/Dashboard/DashboardFooter";
import LeaderboardSvg from "../../../components/SVGcomponents/LeaderboardSvg";
import UniCoinSvg from "../../../components/SVGcomponents/UniCoinSvg";
import WelcomeUser from "../../../components/WelcomeUser";
import TodoList from "../../../components/WaitlistDashboard/TodoList";
export default function WaitlistDashboard({
  userdatafromserver,
  todaysquestion,
  blogdata,
  leaderboard,
  highestquizscore,
  highestludoscore,
  tododatafromserver,
}) {
  const { setuserdata } = useContext(MainContext);
  const [mode, setmode] = useState("home");
  const [tododata, settododata] = useState(tododatafromserver);
  const [showdetails, setshowdetails] = useState(false);
  const [showtodo, setshowtodo] = useState(false);
  const [blogs, setblogs] = useState(blogdata || []);
  const [showjasper, setshowjasper] = useState(
    userdatafromserver && !userdatafromserver.welcome_shown
  );
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
        console.log("Notification blocked");
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
        {showjasper && (
          <WelcomeUser
            name={userdatafromserver.first_name}
            setshow={setshowjasper}
          />
        )}
        {showtodo && (
          <TodoList
            data={tododata.list}
            total={tododata.total}
            completed={tododata.completed}
            hide={() => setshowtodo(!showtodo)}
          />
        )}
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
              earlyaccessno={
                userdatafromserver.waitlist_rank ||
                userdatafromserver.waiting_number
              }
            />
          )}
          {/* Main body */}
          <div className={styles.mainContent}>
            {/* Top Section */}
            <div className={styles.flexTop} id="leftside">
              {/* Waitlist card */}
              <div className={styles.flipcard}>
                <div className={styles.inner}>
                  <div className={styles.front}>
                    <div className={`${styles.waitlistblock} `}>
                      <p className={styles.heading}>
                        {`#${
                          userdatafromserver.waitlist_rank ||
                          userdatafromserver.waiting_number
                        }`}
                      </p>
                      <p className={styles.subheading}>Waitlist Number</p>
                    </div>
                  </div>
                  <div
                    className={`${styles.back} ${styles.waitlistback}`}
                    onClick={() => {
                      router.push("/dashboard/w/rewards");
                    }}
                  >
                    <RewardSvg className={styles.reward} />
                    <p className={styles.text}>Check current rewards</p>
                  </div>
                </div>
              </div>
              {/* Unicoins card */}
              <div className={styles.flipcard}>
                <div className={styles.inner}>
                  <div className={styles.front}>
                    <div className={styles.uniblock}>
                      <div className={styles.top}>
                        <UniCoinSvg className={styles.icon} />
                        <p className={styles.heading}>
                          {userdatafromserver.num_unicoins || 0}
                        </p>
                      </div>

                      <p className={styles.subheading}>Earned Unicoins</p>
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
              {/* Milestone card */}
              <div className={styles.flipcard}>
                <div className={styles.inner}>
                  <div className={styles.front}>
                    <div className={styles.quizblock}>
                      <p className={styles.heading}>
                        {tododata
                          ? tododata.completed + "/" + tododata.total
                          : "All clear"}
                      </p>
                      <p className={styles.subheading}>Complete Milestones</p>
                    </div>
                  </div>
                  <div
                    className={`${styles.back} ${styles.quizback}`}
                    onClick={() => setshowtodo(true)}
                  >
                    <FormatListBulletedRoundedIcon
                      className={styles.fonticon}
                    />
                    <p className={styles.text}>Open Milestones</p>
                  </div>
                </div>
              </div>
              {/* Ludo score card */}
              <div className={styles.flipcard}>
                <div className={styles.inner}>
                  <div className={styles.front}>
                    <div className={styles.gameblock}>
                      <div className={styles.block}>
                        <p className={styles.heading}>
                          {highestludoscore || 0}
                        </p>
                        <p className={styles.subheading}>Ludo Score</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.back} ${styles.gameback}`}
                    onClick={() => {
                      router.push("/dashboard/w/leaderboards?ludo=true");
                    }}
                  >
                    <LeaderboardSvg className={styles.leaderboard} />
                    <p className={styles.text}>Ludo Leaderboard</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Mid section */}
            <div className={styles.flexMid}>
              {todaysquestion && <TodaysQuestion data={todaysquestion} />}
              <Refer settoastdata={settoastdata} />
            </div>
            {/* Bottom section */}
            <div className={styles.flexBottom} id="rightpanel">
              <WaitlistBlogs blogs={blogs} />
              <DashboardFooter />
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
      msg = response.data.message;
      return { props: { isLogged: false, msg: msg || "Error" } };
    } else {
      if (!response) {
        return { props: { isLogged: false, msg: "Error" } };
      }
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
      let tododata = await DashboardApis.getTodo(null, token);
      let highestquizscore = await QuizApis.highestscore({
        email: response.data.data.email,
      });
      let ludoscore = await FreeGameApis.getludohighscore(null, token);
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          tododatafromserver: tododata?.data?.data || null,
          todaysquestion: tq?.data?.success ? tq.data.data : null,
          blogdata: blogs?.data.data || [],
          leaderboard: leaderboard?.data.data || [],
          highestquizscore: highestquizscore?.data?.data?.score
            ? Math.round(highestquizscore.data.data.score / 0.72)
            : 0,
          highestludoscore: ludoscore?.data?.data || 0,
          msg: "",
        },
      };
    }
  } else {
    return { props: { isLogged: false, msg: "cannot get token" } };
  }
}
