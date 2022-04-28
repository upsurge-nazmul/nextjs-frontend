import { useRouter } from "next/dist/client/router";
import React, { useContext, useState } from "react";
import LoginApis from "../../actions/apis/LoginApis";
import { eraseCookie } from "../../actions/cookieUtils";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Dashboard/dashboardheader.module.scss";
import BackArrow from "../SVGcomponents/BackArrow";
import BigBackArrow from "../SVGcomponents/BigBackArrow";
import NotificationBell from "../SVGcomponents/NotificationBell";
import SettingsSvg from "../SVGcomponents/SettingsSvg";
import Menu from "./Menu";
import NotificationMenu from "./NotificationMenu";
import UniCoinSvg from "../SVGcomponents/UniCoinSvg";
import { UniCoinValue } from "../../../config";

function DashboardHeader({ mode, showback, gobackto, settoastdata }) {
  const router = useRouter();
  const [bell, setbell] = useState(false);
  const [notifications, setnotifications] = useState(["s"]);
  const [shownotifications, setshownotifications] = useState(false);
  const { setuser, userdata, theme, showmenu, setshowmenu } =
    useContext(MainContext);

  return (
    <div className={`${styles.dashboardHeader} ${styles.darkdashboardheader}`}>
      {shownotifications && (
        <NotificationMenu
          setshownotifications={setshownotifications}
          settoastdata={settoastdata}
        />
      )}
      <h1 className={styles.dashboardHeading}>
        {mode === "home" ? (
          <>
            Welcome,{" "}
            <span>{userdata?.first_name || userdata?.email || ""}</span>
          </>
        ) : (
          <span className={showback ? styles.addflex : ""}>
            {showback ? (
              <BigBackArrow onClick={() => router.push("/" + gobackto)} />
            ) : null}
            {mode}
          </span>
        )}
      </h1>
      <div className={styles.rightWrapper}>
        <div className={styles.rewardBlock}>
          <UniCoinSvg className={styles.svg} />
          <p className={styles.number}>
            {userdata?.num_unicoins
              ? userdata?.num_unicoins > UniCoinValue
                ? (userdata.num_unicoins / UniCoinValue).toFixed(2) + "K"
                : userdata.num_unicoins
              : 0}
          </p>
        </div>
        {
          <div
            id="notification-btn"
            className={`${styles.notification} ${styles.icon} ${
              bell ? styles.bell : ""
            }`}
            onClick={() => setshownotifications(!shownotifications)}
            onMouseEnter={() => setbell(true)}
            onMouseLeave={() => setbell(false)}
          >
            {notifications.length > 0 ? (
              <div className={styles.dot}></div>
            ) : null}
            <NotificationBell />
          </div>
        }
        <div className={styles.avatar} onClick={() => setshowmenu(!showmenu)}>
          {showmenu && (
            <Menu
              settoastdata={settoastdata}
              waitilistmenu={userdata?.is_waiting_active}
              menuType={userdata?.user_type}
            />
          )}
          <img
            id="avatar-button"
            src={
              userdata?.user_img_url ||
              "https://i.ibb.co/v3vVV8r/default-avatar.png"
            }
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
