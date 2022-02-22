import React, { useEffect, useRef } from "react";
import styles from "../../styles/MoneyAce/welcome.module.scss";
import MoneyAceHeader from "./MoneyAceHeader";
import PlaySvg from "../SVGcomponents/MoneyAce/ui/PlaySvg";

export default function Welcome({
  avatarUrl,
  username,
  fullName,
  setstage,
  muted,
  setmuted,
  volume,
  setvolume,
}) {
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
    <div className={styles.welcome}>
      <audio ref={ref} src="/audio/moneyAce.wav" autoPlay loop />
      <MoneyAceHeader
        avatarUrl={avatarUrl}
        username={username}
        fullName={fullName}
        muted={muted}
        setmuted={setmuted}
        volume={volume}
        setvolume={setvolume}
        hidelogo
        hidebackground
      />
      <div className={styles.start} onClick={() => setstage("dashboard")}>
        <PlaySvg className={styles.playicon} />
      </div>
      <img
        className={styles.banner}
        src={"/images/games/MoneyAce.png"}
        alt=""
      />
    </div>
  );
}
