import React, { useEffect, useRef } from "react";
import styles from "../../styles/MoneyAce/welcome.module.scss";
import MoneyAceHeader from "./MoneyAceHeader";
import PlaySvg from "../SVGcomponents/MoneyAce/ui/PlaySvg";
import { useRouter } from "next/dist/client/router";
import ExitSvg from "../SVGcomponents/MoneyAce/ui/ExitSvg";
import InfoSvg from "../SVGcomponents/MoneyAce/ui/InfoSvg";

export default function Welcome({
  avatarUrl,
  username,
  fullName,
  setstage,
  muted,
  setmuted,
  volume,
  setvolume,
  moneyacedata,
}) {
  const ref = useRef();
  const router = useRouter();
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
    <div className={styles.welcome}>
      <audio ref={ref} src="/audio/moneyAce.wav" autoPlay loop />
      <MoneyAceHeader
        avatarUrl={avatarUrl}
        username={username}
        fullName={fullName}
        moneyacedata={moneyacedata}
        muted={muted}
        setmuted={setmuted}
        volume={volume}
        setvolume={setvolume}
        hidelogo
        hidebackground
        inWelcomeScreen={true}
      />
      <img
        className={styles.logo}
        src="https://imgcdn.upsurge.in/images/MA2.png"
        alt=""
      />
      <div className={styles.start} onClick={() => setstage("dashboard")}>
        <PlaySvg className={styles.icon} />
      </div>
      <div className={styles.info} onClick={() => setstage("dashboard")}>
        <InfoSvg className={styles.icon} />
      </div>
      <div className={styles.back} onClick={() => router.push("/dashboard/p")}>
        <ExitSvg className={styles.icon} />
      </div>
      <img
        className={styles.banner}
        src="https://imgcdn.upsurge.in/images/bg-02.png"
        alt=""
      />
    </div>
  );
}
