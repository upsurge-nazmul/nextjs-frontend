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
function KidDashboardHeader({ mode, showback, gobackto }) {
  const router = useRouter();
  const { userdata } = useContext(MainContext);
  console.log(userdata);
  const [username, setusername] = useState("Tushar");
  const [rotatesetting, setrotatesetting] = useState(false);
  const [bell, setbell] = useState(false);
  const [notifications, setnotifications] = useState(["s"]);
  return (
    <div className={styles.kiddashboardHeader}>
      <h1 className={styles.dashboardHeading}>
        {mode === "home" ? (
          <>
            Welcome, <span>{username}</span>
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
          className={`${styles.settings} ${styles.icon} ${
            rotatesetting ? styles.rotate : ""
          }`}
          onMouseEnter={() => setrotatesetting(true)}
          onMouseLeave={() => setrotatesetting(false)}
          onClick={() => {
            eraseCookie("accesstoken");
            router.push("/");
          }}
        >
          <SettingsSvg />
        </div>
        <div
          className={`${styles.notification} ${styles.icon} ${
            bell ? styles.bell : ""
          }`}
          onClick={() =>
            router.push({
              asPath: "/notifications",
              pathname: "/notifications",
              query: { type: "request" },
            })
          }
          onMouseEnter={() => setbell(true)}
          onMouseLeave={() => setbell(false)}
        >
          {notifications.length > 0 ? <div className={styles.dot}></div> : null}
          <NotificationBell />
        </div>
        <div className={styles.avatar}>
          <img
            src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default KidDashboardHeader;
