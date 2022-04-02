import { Checkbox, Slider } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MoneyAceApis from "../../actions/apis/MoneyAceApis";
import { MainContext } from "../../context/Main";
import { getfullname } from "../../helpers/generalfunctions";
import { getIndianTime } from "../../helpers/timehelpers";
import styles from "../../styles/MoneyAce/moneyacesettings.module.scss";
import StoreItem from "./store/StoreItem";
export default function MoneyAceSettings({
  setshowsettings,
  setvolume,
  setmuted,
  muted,
  volume,
}) {
  return (
    <div className={styles.settingsmodal}>
      <div className={styles.bg} onClick={() => setshowsettings(false)} />
      <div className={styles.main}>
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
      <img
        className={styles.homebtn}
        onClick={() => setshowsettings(false)}
        src="https://i.ibb.co/kmfyw9t/homepng.png"
        alt=""
      />
    </div>
  );
}
