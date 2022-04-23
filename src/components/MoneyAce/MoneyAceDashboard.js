import React, { useState } from "react";
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
}) {
  const [currenttab, setcurrenttab] = useState("dashboard");
  const [showdaily, setshowdaily] = useState(false);
  const [dailydata, setdailydata] = useState(null);
  const [investmentcurrentmode, setinvestmentcurrentmode] = useState("main");
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
          {currenttab === "dashboard" ? (
            <div className={styles.wrapper}>
              <div className={styles.top}>
                <div className={styles.left}>
                  <div className={styles.heading}>
                    <div className={styles.namewrapper}>
                      <img
                        src="https://i.ibb.co/yXFLZCQ/Green-Header-Small-BG.png"
                        alt=""
                      />
                      <p>STATS</p>
                    </div>
                  </div>
                  <div className={styles.col_wrapper}>
                    <div className={styles.col}>
                      <p className={styles.head}>INHAND CASH</p>
                      <p className={styles.val}>
                        ₹{toIndianFormat(moneyacedata?.inhand_money || 0)}
                      </p>
                    </div>{" "}
                    <div className={styles.col}>
                      <p className={styles.head}>BANK BALANCE</p>
                      <p className={styles.val}>
                        ₹{toIndianFormat(moneyacedata?.account_balance || 0)}
                      </p>
                    </div>{" "}
                    <div className={styles.col}>
                      <p className={styles.head}>INVESTMENTS</p>
                      <p className={styles.val}>
                        ₹{toIndianFormat(moneyacedata?.total_investment || 0)}
                      </p>
                    </div>
                  </div>
                  {/* <div className={styles.col_wrapper}>
                    <div className={styles.col}>
                      <p className={styles.head}>BAD EXPENSES</p>
                      <p className={styles.val}>₹0</p>
                    </div>{" "}
                    <div className={styles.col}>
                      <p className={styles.head}>GOOD EXPENSES</p>
                      <p className={styles.val}>₹0</p>
                    </div>{" "}
                    <div className={styles.col}>
                      <p className={styles.head}>GOLD</p>
                      <p className={styles.val}>₹{moneyacedata?.inhand_money}</p>
                    </div>
                  </div> */}
                </div>
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
                          setstage={setstage}
                          setgamedata={setgamedata}
                          setcurrenttab={setcurrenttab}
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
                      onClick={() => setcurrenttab(link.link)}
                    >
                      <img src={link.img} alt="" />
                      <p className={styles.linkname}>{link.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : currenttab === "citymap" ? (
            <CityMap setcurrenttab={setcurrenttab} />
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
