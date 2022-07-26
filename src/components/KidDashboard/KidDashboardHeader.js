import { useRouter } from "next/dist/client/router";
import React, { useContext, useState, useEffect } from "react";
import { eraseCookie } from "../../actions/cookieUtils";
import KidApis from "../../actions/apis/KidApis";
import styles from "../../styles/kidDashboard/kidDashboardHeader.module.scss";
import gems from "../../assets/rewards/gem.png";
import points from "../../assets/rewards/points.png";
import BigBackArrow from "../SVGcomponents/BigBackArrow";
import NotificationBell from "../SVGcomponents/NotificationBell";
import SettingsSvg from "../SVGcomponents/SettingsSvg";
import { MainContext } from "../../context/Main";
import Menu from "../Dashboard/Menu";
import NotificationMenu from "../Dashboard/NotificationMenu";
import UniCoinSvg from "../SVGcomponents/UniCoinSvg";
import { UniCoinValue } from "../../../config";
import LevelComponent from "../Dashboard/LevelComponent";
import { getCookie } from "../../actions/cookieUtils";

function KidDashboardHeader({
  mode,
  showback,
  gobackto,
  settoastdata,
  additionalNavigation = null,
}) {
  const router = useRouter();
  const { setuser, userdata, theme, showmenu, setshowmenu } =
    useContext(MainContext);
  const [username, setusername] = useState("Tushar");
  const [showauth, setshowauth] = useState(false);
  const [rotatesetting, setrotatesetting] = useState(false);
  const [bell, setbell] = useState(false);
  const [shownotifications, setshownotifications] = useState(false);
  const [notifications, setnotifications] = useState(["s"]);
  const [kidLevel, setKidLevel] = useState();
  const [showlevels, setshowlevels] = useState(false);

  useEffect(() => {
    async function fetchKidLevel() {
      let res = await KidApis.getlevel(
        {
          id: userdata.user_id,
        },
        getCookie("accesstoken")
      );
      if (res && res.data && res.data.success) {
        setKidLevel(res.data.data);
      } else setKidLevel(1);
    }
    if (userdata) {
      if (userdata.user_id) {
        fetchKidLevel();
      } else {
        setKidLevel(userdata.level);
      }
    }
  }, [userdata]);

  return (
    <div
      className={`${styles.kiddashboardHeader} ${
        theme === "dark" && styles.darkstyles
      }`}
    >
      <div className={styles.content}>
        {shownotifications && (
          <NotificationMenu setshownotifications={setshownotifications} />
        )}
        {showlevels && <LevelComponent setshow={setshowlevels} />}

        <h1 className={styles.dashboardHeading}>
          {mode === "home" ? (
            <>
              Welcome, <span>{userdata?.first_name}</span>
            </>
          ) : (
            <span className={showback ? styles.addflex : ""}>
              {showback ? (
                <BigBackArrow
                  onClick={() =>
                    router.push("/" + (gobackto ? gobackto : "/dashboard/k"))
                  }
                />
              ) : null}
              {mode}
            </span>
          )}
        </h1>
        {/* Additional Navigation Component if necessary, not visible in mobile portrait */}
        {additionalNavigation && (
          <div className={styles.additionalNavigation}>
            {additionalNavigation}
          </div>
        )}
        <div className={styles.rightWrapper}>
          {userdata?.user_type === "child" && kidLevel && (
            <div
              className={styles.levelSection}
              onClick={() => setshowlevels(true)}
            >
              <img
                src={"/images/badges/badge_" + kidLevel + ".svg"}
                alt="KidLevel"
                className={styles.levelBadge}
              />
              <p className={styles.level}>
                <span>Level</span> <span>{kidLevel}</span>
              </p>
            </div>
          )}
          <div className={styles.rewardBlock}>
            <UniCoinSvg className={styles.svg} />
            <p className={styles.number}>
              {userdata?.num_unicoins
                ? userdata?.num_unicoins > UniCoinValue
                  ? userdata.num_unicoins / UniCoinValue + "K"
                  : userdata.num_unicoins
                : 0}
            </p>
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
            {notifications.length > 0 ? (
              <div className={styles.dot}></div>
            ) : null}
            <NotificationBell />
          </div>
          <div className={styles.avatar}>
            {showmenu && (
              <Menu
                setshowauth={setshowauth}
                settoastdata={settoastdata}
                menuType={"child"}
              />
            )}
            <img
              id="avatar-button"
              onClick={() => setshowmenu(!showmenu)}
              src={
                userdata?.user_img_url ||
                "https://i.ibb.co/v3vVV8r/default-avatar.png"
              }
              alt=""
            />
          </div>
        </div>
      </div>
      <div className={styles.phoneAdditionalNav}>{additionalNavigation}</div>
    </div>
  );
}

export default KidDashboardHeader;
