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

function DashboardHeader({ mode, showback, gobackto, settoastdata }) {
  const router = useRouter();
  const [username, setusername] = useState("Tushar");
  const [rotatesetting, setrotatesetting] = useState(false);
  const [bell, setbell] = useState(false);
  const [notifications, setnotifications] = useState(["s"]);
  const { setuser, setuserdata, showmenu, setshowmenu } =
    useContext(MainContext);

  return (
    <div className={styles.dashboardHeader}>
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
        <div
          className={`${styles.settings} ${styles.icon} ${
            rotatesetting ? styles.rotate : ""
          }`}
          onMouseEnter={() => setrotatesetting(true)}
          onMouseLeave={() => setrotatesetting(false)}
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
        <div className={styles.avatar} onClick={() => setshowmenu(!showmenu)}>
          {showmenu && <Menu settoastdata={settoastdata} />}
          <img
            id="avatar-button"
            src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
