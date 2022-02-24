import React, { useState } from "react";
import styles from "../../styles/MoneyAce/header.module.scss";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsSvg from "../../components/SVGcomponents/MoneyAce/ui/SettingsSvg";
import CloseSvg from "../../components/SVGcomponents/MoneyAce/ui/CloseSvg";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Checkbox, Slider } from "@mui/material";
export default function MoneyAceHeader({
  avatarUrl,
  fullName,
  username,
  hidelogo,
  hidebackground,
  muted,
  setmuted,
  setvolume,
  volume,
}) {
  const [showsettings, setshowsettings] = useState(false);
  return (
    <div
      className={styles.header}
      // style={{ backgroundColor: hidebackground ? "transparent" : "#5ec796" }}
    >
      {showsettings && (
        <div className={styles.settingsmodal}>
          <div className={styles.bg} onClick={() => setshowsettings(false)} />
          <div className={styles.main}>
            <div
              className={styles.closebtn}
              onClick={() => setshowsettings(false)}
            >
              <CloseSvg className={styles.closeicon} />
            </div>
            <p className={styles.heading}> Settings</p>
            <p className={styles.subheading}>Audio</p>
            <div className={styles.container}>
              Music
              <Slider
                className={styles.slider}
                onChange={(e) => setvolume(e.target.value / 100)}
                value={volume * 100}
              />
              <Checkbox
                className={styles.checkbox}
                checked={!muted}
                onChange={() => setmuted(!muted)}
              />
            </div>
          </div>
          <div className={styles.bgborder}>
            <div className={styles.closeborder} />
          </div>
        </div>
      )}
      <div className={styles.left}>
        <div className={styles.avatarblock}>
          <img src={avatarUrl} alt="" className={styles.avatar} />
          <EmailRoundedIcon
            className={styles.icon}
            // style={{
            //   backgroundColor: hidebackground ? "transparent" : "#9DDA9F",
            // }}
          />
          <div className={styles.notificationbox}>2</div>
        </div>
        <div className={styles.right}>
          <p className={styles.fullname}>{fullName}</p>
          <p className={styles.username}>@{username}</p>
        </div>
      </div>
      {!hidelogo && (
        <img
          className={styles.gamelogo}
          src="/images/games/MoneyAceH.png"
          alt=""
        />
      )}
      <SettingsSvg
        className={styles.settings}
        onClick={() => setshowsettings(true)}
      />
    </div>
  );
}
