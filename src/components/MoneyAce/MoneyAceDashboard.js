import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styles from "../../styles/MoneyAce/dashboard.module.scss";
import Logo from "../SVGcomponents/Logo";
import CityMap from "./CityMap";
import MoneyAceHeader from "./MoneyAceHeader";
import MoneyAceLeftPanel from "./MoneyAceLeftPanel";
import GaugeChart from "react-gauge-chart";
import PassBook from "./PassBook";

export default function MoneyAceDashboard({
  avatarUrl,
  username,
  fullName,
  setstage,
  muted,
  setmuted,
  volume,
  setvolume,
}) {
  const [currenttab, setcurrenttab] = useState("dashboard");
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
  return (
    <div className={styles.dashboard}>
      <audio ref={ref} src="/audio/dashboard.wav" autoPlay loop />
      <MoneyAceHeader
        avatarUrl={avatarUrl}
        username={username}
        fullName={fullName}
        muted={muted}
        setmuted={setmuted}
        setvolume={setvolume}
        volume={volume}
      />
      <div className={styles.main}>
        <MoneyAceLeftPanel
          currenttab={currenttab}
          newtasks
          setstage={setstage}
          setcurrenttab={setcurrenttab}
        />
        <div className={styles.container}>
          {currenttab === "dashboard" ? (
            <div className={styles.wrapper}>
              <div className={styles.card}>
                <div className={styles.logo}>
                  <div></div>
                  <div></div>
                </div>
                <div className={styles.head}>Balance</div>
                <div className={styles.balance}>₹12,899</div>
                <div className={styles.number}>**** **** **** 1234</div>
                <div className={styles.valids}>
                  <div className={styles.valid}>
                    <p className={styles.heading}>VALID THRU</p>
                    <p className={styles.value}>09/24</p>
                  </div>
                  <div className={styles.valid}>
                    <p className={styles.heading}>CARD HOLDER</p>
                    <p className={styles.value}>{username}</p>
                  </div>
                </div>
              </div>
              <div className={styles.bankinfo}>
                <div className={styles.row}>
                  <p>Level</p>
                  <p>1</p>
                </div>
                <div className={styles.row}>
                  <p>UPI Id</p>
                  <p>test@hfibank</p>
                </div>
                <div className={styles.row}>
                  <p>Cash in Hand</p>
                  <p>₹24000</p>
                </div>
                <div className={styles.row}>
                  <p>Total Wealth</p>
                  <p>₹24000</p>
                </div>
              </div>
              <div className={styles.gauge}>
                <p className={styles.heading}>Morale Meter</p>
                <GaugeChart
                  id="gauge-chart1"
                  className={styles.meter}
                  colors={["#FF5F6D", "#FFC371"]}
                  needleColor={"#000000"}
                  needleBaseColor={"#000000"}
                  percent={0.2}
                />
              </div>
              <div
                className={styles.passbook}
                onClick={() => setcurrenttab("passbook")}
              >
                <p className={styles.heading}>Passbook</p>
              </div>
            </div>
          ) : currenttab === "citymap" ? (
            <CityMap />
          ) : currenttab === "passbook" ? (
            <PassBook />
          ) : null}
        </div>
      </div>
    </div>
  );
}
