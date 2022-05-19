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
import DataComponent from "./DataComponent";
import { toIndianFormat } from "../../helpers/currency";

//
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
  inWelcomeScreen,
}) {
  const { setuser, userdata, setuserdata, widthHeight, setshowmenu } =
    useContext(MainContext);
  const [showsettings, setshowsettings] = useState(false);
  const [showprofile, setshowprofile] = useState(false);

  return (
    <div
      className={styles.header}
      id="moneyace-header"
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
        {!inWelcomeScreen && (
          <div className={styles.leveldiv}>
            <p className={styles.levelheadtext}>LEVEL</p>
            <div className={styles.button}>
              <img src="https://i.ibb.co/hR4kT8R/slider-handle-1.png" alt="" />
              <p className={styles.leveltext}>{moneyacedata?.level || 0}</p>
            </div>
            {/* <NineSlice
            width={widthHeight.width * 0.022}
            height={widthHeight.width * 0.022}
            border={1}
            image="https://i.ibb.co/hR4kT8R/slider-handle-1.png"
            imageSize={{ x: 210, y: 233 }}
          ></NineSlice> */}
          </div>
        )}
        {/* 


 */}
        {!inWelcomeScreen && (
          <div className={styles.moralandstamina}>
            <DataComponent
              title="MORAL"
              value={moneyacedata?.moral || 0}
              icon="https://i.ibb.co/P60SqYw/morale.png"
              isRange
            />
            <DataComponent
              id="stamina"
              title="STAMINA"
              value={
                (moneyacedata?.battery * 20 > 100
                  ? 100
                  : moneyacedata?.battery * 20) || 0
              }
              icon="https://i.ibb.co/GJXYBmN/energy-3d.png"
              isRange
            />
          </div>
        )}
      </div>
      {/*
       */}
      {!inWelcomeScreen && (
        <div className={styles.right}>
          <DataComponent
            title="CASH IN HAND"
            value={"₹" + toIndianFormat(moneyacedata?.inhand_money || 0)}
            icon="https://i.ibb.co/N6bmJbS/Money.png"
          />
          <DataComponent
            title="BANK BALANCE"
            value={"₹" + toIndianFormat(moneyacedata?.account_balance || 0)}
            icon="https://i.ibb.co/sg6CDCK/icon-envelope-1-1.png"
          />
          <DataComponent
            title="INVESTMENTS"
            value={"₹" + toIndianFormat(moneyacedata?.total_investment || 0)}
            icon="https://i.ibb.co/g9PY4nz/Group-4948.png"
          />
        </div>
      )}
      <SettingsSvg
        className={styles.settings}
        onClick={() => setshowsettings(true)}
      />
    </div>
  );
}
