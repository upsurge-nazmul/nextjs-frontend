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
}) {
  const [currenttab, setcurrenttab] = useState("tasks");
  const [currenttask, setcurrenttask] = useState("");
  const [showdaily, setshowdaily] = useState(false);
  const [dailydata, setdailydata] = useState(null);
  const [taskmodal, settaskmodal] = useState(false);
  const [quiz, setquiz] = useState(false);
  const [investmentcurrentmode, setinvestmentcurrentmode] = useState("main");
  const { them, widthHeight } = useContext(MainContext);
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
  const links = [
    { name: "Bank", link: "Bank", img: "https://i.ibb.co/MsY3sDZ/Bank.png" },
    {
      name: "Invest",
      link: "investmenthub",
      img: "https://i.ibb.co/vP38sSj/Invest.png",
    },
    { name: "UPI", link: "upi", img: "https://i.ibb.co/xMpR0zL/UPI.png" },
    { name: "Shop", link: "store", img: "https://i.ibb.co/qpX0bqS/Shop.png" },
    { name: "Games", link: "Games", img: "https://i.ibb.co/7XbdHV8/Games.png" },
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
      />
      <div className={styles.main}>
        {showdaily && (
          <DailyReward
            setshowdaily={setshowdaily}
            data={dailydata}
            setmoneyacedata={setmoneyacedata}
          />
        )}
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
            <p onClick={handlereset}>Reset All</p>
            <p onClick={handlenextday}>Next Day</p>
            <p onClick={handleallowinvesting}>Allow investing</p>
          </div>
          {currenttab === "dashboard" ? (
            <div className={styles.wrapper}>
              <div className={`${styles.link} ${styles.link1}`}>
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
                onClick={() => setcurrenttab("Bank")}
              >
                <p className={styles.title}>Bank</p>
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
                className={`${styles.link} ${styles.link3}`}
                onClick={() => setcurrenttab("investmenthub")}
              >
                <p className={styles.title}>Investment</p>
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
                className={`${styles.link} ${styles.link4}`}
                onClick={() => setcurrenttab("store")}
              >
                <p className={styles.title}>Shop</p>
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
                className={`${styles.link} ${styles.link5}`}
                onClick={() => setcurrenttab("store")}
              >
                <p className={styles.title}>Jobs</p>
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
              {/*  */}
              {/* <div className={styles.top}>
                <div className={styles.right}>
                  <div className={styles.heading}>
                    <div className={styles.namewrapper}>
                      <img
                        src="https://i.ibb.co/yXFLZCQ/Green-Header-Small-BG.png"
                        alt=""
                      />
                      <p>TASKS</p>
                    </div>
                  </div>
                  <div className={styles.taskwrapper}>
                    {tasks?.map((item, index) => {
                      return (
                        <MoneyAceTask
                          key={item.id}
                          data={item}
                          index={index}
                          settaskmodal={settaskmodal}
                          setstage={setstage}
                          setgamedata={setgamedata}
                          setcurrenttab={setcurrenttab}
                          moneyacedata={moneyacedata}
                          settasks={settasks}
                          setquiz={setquiz}
                          setcurrenttask={setcurrenttask}
                          settoastdata={settoastdata}
                          currenttask={currenttask}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.heading}>
                  <div className={styles.namewrapper}>
                    <img
                      src="https://i.ibb.co/yXFLZCQ/Green-Header-Small-BG.png"
                      alt=""
                    />
                    <p>LINKS</p>
                  </div>
                </div>
                <div className={styles.middle}>
                  {links.map((link) => (
                    <div
                      key={"link" + link}
                      className={styles.item}
                      onClick={() => {
                        if (
                          link.link === "investmenthub" &&
                          !moneyacedata.investing_course
                        ) {
                          settoastdata({
                            show: true,
                            type: "error",
                            msg: "Investing course is required",
                          });
                          return;
                        }
                        setcurrenttab(link.link);
                      }}
                    >
                      <img src={link.img} alt="" />
                      <p className={styles.linkname}>{link.name}</p>
                    </div>
                  ))}
                </div>
              </div> */}
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
          ) : currenttab === "passbook" ? (
            <PassBook setcurrenttab={setcurrenttab} />
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
            />
          ) : currenttab === "Games" ? (
            <MoneyAceGamesPage
              setcurrenttab={setcurrenttab}
              canvassize={canvassize}
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
