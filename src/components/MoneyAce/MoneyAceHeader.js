import React, { useContext, useState } from "react";
import styles from "../../styles/MoneyAce/header.module.scss";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsSvg from "../../components/SVGcomponents/MoneyAce/ui/SettingsSvg";
import CloseSvg from "../../components/SVGcomponents/MoneyAce/ui/CloseSvg";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Checkbox, Slider } from "@mui/material";
import Profile from "./Profile";
import MoneyAceSettings from "./MoneyAceSettings";
import { getfullname } from "../../helpers/generalfunctions";
import { MainContext } from "../../context/Main";
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
  moneyacedata,
}) {
  const { setuser, userdata, setuserdata, widthHeight, setshowmenu } =
    useContext(MainContext);
  const [showsettings, setshowsettings] = useState(false);
  const [showprofile, setshowprofile] = useState(false);
  return (
    <div
      className={styles.header}
      // style={{ backgroundColor: hidebackground ? "transparent" : "#5ec796" }}
    >
      {showsettings && (
        <MoneyAceSettings
          volume={volume}
          setvolume={setvolume}
          muted={muted}
          setmuted={setmuted}
          setshowsettings={setshowsettings}
        />
      )}
      {showprofile && (
        <Profile setshow={setshowprofile} moneyacedata={moneyacedata} />
      )}
      <div className={styles.left}>
        <div
          className={styles.avatarblock}
          onClick={() => setshowprofile(true)}
        >
          <img src={avatarUrl} alt="" className={styles.avatar} />
          <p className={styles.username}>{userdata?.first_name}</p>

          {/* <EmailRoundedIcon
            className={styles.icon}
            // style={{
            //   backgroundColor: hidebackground ? "transparent" : "#9DDA9F",
            // }}
          />
          <div className={styles.notificationbox}>2</div> */}
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
