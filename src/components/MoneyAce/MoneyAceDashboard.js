import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styles from "../../styles/MoneyAce/dashboard.module.scss";
import Logo from "../SVGcomponents/Logo";
import CityMap from "./CityMap";
import MoneyAceHeader from "./MoneyAceHeader";
import MoneyAceLeftPanel from "./MoneyAceLeftPanel";
import PassBook from "./PassBook";
import InvestmentHub from "./InvestmentHub";
import Bank from "./Bank";
import BankDashboard from "./BankDashboard";
import MoneyAceTask from "./MoneyAceTask";
import MoneyAceGamesPage from "./MoneyAceGamesPage";
import MoneyAceInvestment from "./MoneyAceInvestment";
import VirtualStore from "./VirtualStore";
import Upi from "./Upi";
import MoneyAceApis from "../../actions/apis/MoneyAceApis";
import { getCookie } from "../../actions/cookieUtils";
import DailyReward from "./DailyReward";
import { toIndianFormat } from "../../helpers/currency";
import { MainContext } from "../../context/Main";
import { useRouter } from "next/router";
import TaskModal from "./TaskModal";
import MAQuiz from "./MoneyAceQuiz";
import NineSlice from "../NineSlice";
import Tasks from "./Tasks";
import EducationHub from "./EducationHub";
import JobHub from "./JobHub";
import Tour from "../Tour/Tour";
import Jasper from "../SVGcomponents/Jasper";
export default function MoneyAceDashboard({
  avatarUrl,
  username,
  fullName,
  setstage,
  setgamedata,
  tasks,
  muted,
  setmuted,
  volume,
  setvolume,
  canvassize,
  moneyacedata,
  setmoneyacedata,
  settoastdata,
  settasks,
  stage,
}) {
  const [currenttab, setcurrenttab] = useState("dashboard");
  const [currenttask, setcurrenttask] = useState("");
  const [showdaily, setshowdaily] = useState(false);
  const [dailydata, setdailydata] = useState(null);
  const [taskmodal, settaskmodal] = useState(false);
  const [quiz, setquiz] = useState(false);
  const [investmentcurrentmode, setinvestmentcurrentmode] = useState("main");
  const { them, widthHeight, userdata } = useContext(MainContext);
  const router = useRouter();
  const ref = useRef();
  useEffect(() => {
    if (muted) {
      ref.current.pause();
    } else {
      ref.current.play();
    }
  }, [muted]);
  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);
  useEffect(() => {
    if (currenttab !== "dashboard") return;
    x();
    async function x() {
      let res = await MoneyAceApis.getMoneyAceData(
        null,
        getCookie("accesstoken")
      );
      gettasks();
      async function gettasks() {
        let res = await MoneyAceApis.getTasks();
        if (res && res.data && res.data.success) {
          settasks(res.data.data);
        }
      }
      if (res && res.data && res.data.success) {
        if (setmoneyacedata) setmoneyacedata(res.data.data);
      }
    }
  }, [currenttab]);
  const jobhubtasks = ["task-22", "task-25", "task-30"];
  const educationhubtasks = ["task-20", "task-31", "task-28", "task-24"];
  const banktasks = ["task-03", "task-04", "task-08", "task-14", "task-15"];
  const investmenttasks = [
    "task-34",
    "task-35",
    "task-36",
    "task-37",
    "task-38",
  ];
  const shoptasks = [
    "task-05",
    "task-12",
    "task-13",
    "task-17",
    "task-23",
    "task-27",
    "task-29",
  ];
  useEffect(() => {
    loaddailyreward();
    async function loaddailyreward() {
      let res = await MoneyAceApis.getdailyreward();
      if (res && res.data && res.data.data) {
        setshowdaily(true);
        setdailydata(res.data.data);
      }
    }
  }, []);

  async function handlenextday() {
    let res = await MoneyAceApis.nextday();
    if (res && res.data && res.data.success) {
      alert("done");
      router.reload();
    } else {
      alert("something went wrong");
    }
  }
  async function handleallowinvesting() {
    let res = await MoneyAceApis.allowinvesting();
    if (res && res.data && res.data.success) {
      alert("done");
      router.reload();
    } else {
      alert("something went wrong");
    }
  }

  async function handlereset() {
    let res = await MoneyAceApis.resetdata();
    if (res && res.data && res.data.success) {
      alert("done");
      router.reload();
    } else {
      alert("something went wrong");
    }
  }
  const story = [
    {
      ref: "#demo",
      text: "Welcome to upsurge!",
      intro: true,
      content: (
        <div className={styles.introdiv}>
          <p className={styles.heading}>
            Welcome to Surge City ,{userdata.first_name}
          </p>
          <p className={styles.text}>
            {`You just turned 14 & your parents have given you monthly pocket
            money of ₹3,000 to spend (or invest) as you deem fit. They have also
            allowed you to take some side-gigs (part-time jobs) to earn money.`}
          </p>
          <p className={styles.text}>
            {`Our aim here is to help you understand money management, and how to
            grow your money by investing it across various options. It’s going
            to be a great journey, and every Sunday, we will have competitions
            to see who made the most money!!`}
          </p>
          <Jasper className={styles.jasper} />
        </div>
      ),
    },
    {
      ref: "#stamina",
      position: "bottom",
      text: "Welcome to upsurge!",
      content: `You can start doing 5 activities every month to earn. This is your Energy Meter and will tell you how many tasks you can do this month. Here in Surge City, 1 month is equal to 24 hours in your world. So your energy refreshes every 24 hours, and increases as you gain experience.`,
    },
    {
      intro: true,
      content: (
        <div className={styles.introdiv}>
          <p className={styles.heading}>
            Managing money at a young age will make you a financially smart
            adult.
          </p>
          <p className={styles.text}>
            {`To earn your pocket money, you have to complete some chores that your parents give you every month. Remember, you have to stay up to date with your grades on your homework & quizzes to continue enjoying your working privileges.`}
          </p>
          <p className={styles.text}>
            {`Let’s start you off with your first pocket money. As you can see it’s in cash, with you at the moment. Why don’t we deposit some of it in the bank? `}
          </p>
          <Jasper className={styles.jasper} />
        </div>
      ),
    },
    {
      ref: "#bank",
      position: "bottom",
      text: "Welcome to upsurge!",
      content: `First, we will need a bank account.`,
    },
  ];

  return (
    <div className={styles.dashboard}>
      <audio ref={ref} src="/audio/dashboard.wav" autoPlay loop />
      <MoneyAceHeader
        avatarUrl={avatarUrl}
        username={username}
        fullName={fullName}
        muted={muted}
        setmuted={setmuted}
        moneyacedata={moneyacedata}
        setvolume={setvolume}
        volume={volume}
        inWelcomeScreen={stage === "welcome"}
      />
      <div className={styles.main}>
        {showdaily && (
          <DailyReward
            setshowdaily={setshowdaily}
            data={dailydata}
            setmoneyacedata={setmoneyacedata}
          />
        )}
        {!showdaily && <Tour story={story} />}
        <div
          className={`${styles.container} ${
            currenttab !== "dashboard" && styles.notdashboardcontainer
          }`}
        >
          {taskmodal && (
            <TaskModal
              data={taskmodal}
              settaskmodal={settaskmodal}
              currenttask={currenttask}
              settasks={settasks}
              setcurrenttab={setcurrenttab}
            />
          )}
          {quiz && (
            <MAQuiz
              quiz={quiz}
              setquiz={setquiz}
              currenttask={currenttask}
              setcurrenttab={setcurrenttab}
              settasks={settasks}
            />
          )}
          <div className={styles.devoptions}>
            <p id="demo" onClick={handlereset}>
              Reset All
            </p>
            <p onClick={handlenextday}>Next Day</p>
            <p onClick={handleallowinvesting}>Allow investing</p>
          </div>
          {currenttab === "dashboard" ? (
            <div className={styles.wrapper}>
              <div className={`${styles.link} ${styles.link0}`}>
                <p className={styles.title}>Home</p>
                <bg className={styles.bg}>
                  <img
                    className={styles.bgimg}
                    src="https://i.ibb.co/3FT8Zw1/panel-shield-inside-blue-1-1.png"
                    alt=""
                  />
                  <img
                    className={styles.bgicon}
                    src="https://i.ibb.co/NY9GYFc/home-beveled.png"
                    alt=""
                  />
                </bg>
              </div>
              <div
                className={`${styles.link} ${styles.link1}`}
                onClick={() => setcurrenttab("educationhub")}
              >
                {tasks.findIndex((item) =>
                  educationhubtasks.includes(item.id)
                ) !== -1 && <div className={styles.alert} />}
                <p className={styles.title}>EDUCATION HUB</p>
                <bg className={styles.bg}>
                  <img
                    className={styles.bgimg}
                    src="https://i.ibb.co/3FT8Zw1/panel-shield-inside-blue-1-1.png"
                    alt=""
                  />
                  <img
                    className={styles.bgicon}
                    src="https://i.ibb.co/TK5YZqy/school-beveled.png"
                    alt=""
                  />
                </bg>
              </div>
              <div
                className={`${styles.link} ${styles.link2}`}
                id="bank"
                onClick={() => setcurrenttab("Bank")}
              >
                {tasks.findIndex((item) => banktasks.includes(item.id)) !==
                  -1 && <div className={styles.alert} />}
                <p className={styles.title}>Bank</p>
                <bg className={styles.bg}>
                  <img
                    className={styles.bgimg}
                    src="https://i.ibb.co/3FT8Zw1/panel-shield-inside-blue-1-1.png"
                    alt=""
                  />
                  <img
                    className={styles.bgicon}
                    src="https://i.ibb.co/GHWwgnp/bank-beveled.png"
                    alt=""
                  />
                </bg>
              </div>
              <div
                className={`${styles.link} ${styles.link3}`}
                onClick={() => {
                  if (!moneyacedata.investing_course) {
                    settoastdata({
                      show: true,
                      type: "error",
                      msg: "Investing course is required",
                    });
                    return;
                  }
                  setcurrenttab("investmenthub");
                }}
              >
                {tasks.findIndex((item) =>
                  investmenttasks.includes(item.id)
                ) !== -1 && <div className={styles.alert} />}
                <p className={styles.title}>Investment</p>
                <bg className={styles.bg}>
                  <img
                    className={styles.bgimg}
                    src="https://i.ibb.co/3FT8Zw1/panel-shield-inside-blue-1-1.png"
                    alt=""
                  />
                  <img
                    className={styles.bgicon}
                    src="https://i.ibb.co/qm57QYQ/invest-beveled.png"
                    alt=""
                  />
                </bg>
              </div>
              <div
                className={`${styles.link} ${styles.link4}`}
                onClick={() => setcurrenttab("store")}
              >
                {tasks.findIndex((item) => shoptasks.includes(item.id)) !==
                  -1 && <div className={styles.alert} />}
                <p className={styles.title}>Shop</p>
                <bg className={styles.bg}>
                  <img
                    className={styles.bgimg}
                    src="https://i.ibb.co/3FT8Zw1/panel-shield-inside-blue-1-1.png"
                    alt=""
                  />
                  <img
                    className={styles.bgicon}
                    src="https://i.ibb.co/QnD63s0/online-shopping-beveled.png"
                    alt=""
                  />
                </bg>
              </div>
              <div
                className={`${styles.link} ${styles.link5}`}
                onClick={() => setcurrenttab("Games")}
              >
                {tasks.findIndex((item) => jobhubtasks.includes(item.id)) !==
                  -1 && <div className={styles.alert} />}
                <p className={styles.title}>Jobs</p>
                <bg className={styles.bg}>
                  <img
                    className={styles.bgimg}
                    src="https://i.ibb.co/3FT8Zw1/panel-shield-inside-blue-1-1.png"
                    alt=""
                  />
                  <img
                    className={styles.bgicon}
                    src="https://i.ibb.co/VCjSFcp/jobs-beveled.png"
                    alt=""
                  />
                </bg>
              </div>
              <div
                className={`${styles.taskbtn} `}
                onClick={() => setcurrenttab("tasks")}
              >
                <p className={styles.title}>TASKS</p>
                <bg className={styles.bg}>
                  <img
                    className={styles.bgimg}
                    src="https://i.ibb.co/tYSFRWk/Task-Panel-1.png"
                    alt=""
                  />
                  <img
                    className={styles.bgicon}
                    src="https://i.ibb.co/Wk1xwTs/tasks-1.png"
                    alt=""
                  />
                </bg>
              </div>
            </div>
          ) : currenttab === "tasks" ? (
            <Tasks
              setcurrenttab={setcurrenttab}
              canvassize={canvassize}
              settoastdata={settoastdata}
              settasks={settasks}
              tasks={tasks}
              settaskmodal={settaskmodal}
              setstage={setstage}
              setgamedata={setgamedata}
              moneyacedata={moneyacedata}
              setquiz={setquiz}
              setcurrenttask={setcurrenttask}
              currenttask={currenttask}
            />
          ) : currenttab === "educationhub" ? (
            <EducationHub
              setcurrenttab={setcurrenttab}
              canvassize={canvassize}
              moneyacedata={moneyacedata}
              setmoneyacedata={setmoneyacedata}
              settoastdata={settoastdata}
              settasks={settasks}
              tasks={tasks}
            />
          ) : currenttab === "investmenthub" ? (
            <MoneyAceInvestment
              setcurrenttab={setcurrenttab}
              canvassize={canvassize}
              moneyacedata={moneyacedata}
              setmoneyacedata={setmoneyacedata}
              settoastdata={settoastdata}
              setcurrentmode={setinvestmentcurrentmode}
              currentmode={investmentcurrentmode}
            />
          ) : currenttab === "Bank" ? (
            <Bank
              setcurrenttab={setcurrenttab}
              canvassize={canvassize}
              moneyacedata={moneyacedata}
              setmoneyacedata={setmoneyacedata}
              settoastdata={settoastdata}
            />
          ) : currenttab === "Games" ? (
            <JobHub
              setcurrenttab={setcurrenttab}
              canvassize={canvassize}
              moneyacedata={moneyacedata}
              setmoneyacedata={setmoneyacedata}
              settoastdata={settoastdata}
              settasks={settasks}
              tasks={tasks}
            />
          ) : currenttab === "store" ? (
            <VirtualStore
              setcurrenttab={setcurrenttab}
              canvassize={canvassize}
              settoastdata={settoastdata}
              settasks={settasks}
            />
          ) : currenttab === "upi" ? (
            <Upi
              setcurrenttab={setcurrenttab}
              moneyacedata={moneyacedata}
              canvassize={canvassize}
              settoastdata={settoastdata}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
