import { useRouter } from "next/dist/client/router";
import React, { useContext, useState } from "react";
import { eraseCookie } from "../../actions/cookieUtils";
import styles from "../../styles/kidDashboard/kidDashboardHeader.module.scss";
import gems from "../../assets/rewards/gem.png";
import points from "../../assets/rewards/points.png";
import BigBackArrow from "../SVGcomponents/BigBackArrow";
import NotificationBell from "../SVGcomponents/NotificationBell";
import SettingsSvg from "../SVGcomponents/SettingsSvg";
import { MainContext } from "../../context/Main";
import Menu from "../Dashboard/Menu";
import NotificationMenu from "../Dashboard/NotificationMenu";
function KidDashboardHeader({ mode, showback, gobackto, settoastdata }) {
  const router = useRouter();
  const { setuser, userdata, setuserdata, showmenu, setshowmenu } =
    useContext(MainContext);
  const [username, setusername] = useState("Tushar");
  const [rotatesetting, setrotatesetting] = useState(false);
  const [bell, setbell] = useState(false);
  const [shownotifications, setshownotifications] = useState(false);
  const [notifications, setnotifications] = useState(["s"]);
  return (
    <div className={styles.kiddashboardHeader}>
      {shownotifications && (
        <NotificationMenu setshownotifications={setshownotifications} />
      )}
      <h1 className={styles.dashboardHeading}>
        {mode === "home" ? (
          <>
            Welcome, <span>{userdata?.first_name}</span>
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
          <img className={styles.rewardimage} src={points.src} alt="" />
          <p className={styles.number}>{userdata?.points || 0}</p>
        </div>
        <div className={styles.rewardBlock}>
          <img className={styles.rewardimage} src={gems.src} alt="" />
          <p className={styles.number}>{userdata?.gems || 0}</p>
        </div>
        <div
          id="notification-btn"
          className={`${styles.notification} ${styles.icon} ${
            bell ? styles.bell : ""
          }`}
          onClick={() => setshownotifications(!shownotifications)}
          onMouseEnter={() => setbell(true)}
          onMouseLeave={() => setbell(false)}
        >
          {notifications.length > 0 ? <div className={styles.dot}></div> : null}
          <NotificationBell />
        </div>
        <div className={styles.avatar} onClick={() => setshowmenu(!showmenu)}>
          {showmenu && <Menu settoastdata={settoastdata} menuType={"kid"} />}
          <img
            src={
              userdata?.img_url || "https://i.ibb.co/v3vVV8r/default-avatar.png"
            }
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default KidDashboardHeader;
