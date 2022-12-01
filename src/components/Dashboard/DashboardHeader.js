import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import KidApis from "../../actions/apis/KidApis";
import { getCookie } from "../../actions/cookieUtils";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Dashboard/dashboardheader.module.scss";
import BigBackArrow from "../SVGcomponents/BigBackArrow";
import NotificationBell from "../SVGcomponents/NotificationBell";
import Menu from "./Menu";
import NotificationMenu from "./NotificationMenu";
import UniCoinSvg from "../SVGcomponents/UniCoinSvg";
import { UniCoinValue } from "../../../config";
import AuthComponent from "../Auth/AuthComponent";
import LevelComponent from "../Dashboard/LevelComponent";
import Onboarding from "../Onboarding";

function DashboardHeader({
  mode,
  showback,
  gobackto,
  settoastdata,
  disableClicks,
  setStoryIndex,
}) {
  const router = useRouter();
  const [bell, setbell] = useState(false);
  const [notifications, setnotifications] = useState(["s"]);
  const [showauth, setshowauth] = useState(false);
  const [shownotifications, setshownotifications] = useState(false);
  const [kidLevel, setKidLevel] = useState();
  const [showlevels, setshowlevels] = useState(false);
  const [savedUser, setSavedUser] = useState();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { setuser, userdata, theme, showmenu, setshowmenu } =
    useContext(MainContext);

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
      className={`${styles.dashboardHeader} ${
        theme === "dark" && styles.darkdashboardheader
      }`}
      style={disableClicks ? { pointerEvents: "none" } : {}}
    >
      {shownotifications && (
        <NotificationMenu
          setshownotifications={setshownotifications}
          settoastdata={settoastdata}
        />
      )}
      <AuthComponent
        showauth={showauth}
        setshowauth={setshowauth}
        onlyLogin={true}
        prefilled={savedUser}
        type={userdata?.user_type}
      />
      {showlevels && <LevelComponent setshow={setshowlevels} />}
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
        {/* {userdata?.user_type === "child" && kidLevel && (
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
        )} */}
        {userdata?.user_type !== "parent" && (
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
        )}
        {
          <div
            id="notification-btn"
            className={`${styles.notification} ${styles.icon} ${
              bell ? styles.bell : ""
            }`}
            onClick={() => setshownotifications(!shownotifications)}
            onMouseEnter={() => {
              if (router.query.showTour) {
                return;
              }
              setbell(true);
            }}
            onMouseLeave={() => {
              if (router.query.showTour) {
                return;
              }
              setbell(false);
            }}
          >
            {notifications.length > 0 ? (
              <div className={styles.dot}></div>
            ) : null}
            <NotificationBell />
          </div>
        }
        <div className={styles.avatar} id="header-settings">
          {showmenu && (
            <Menu
              showauth={showauth}
              setshowauth={setshowauth}
              settoastdata={settoastdata}
              waitilistmenu={userdata?.is_waiting_active}
              menuType={userdata?.user_type}
              setSavedUser={setSavedUser}
              setShowOnboarding={setShowOnboarding}
              setshowlevels={setshowlevels}
              kidLevel={kidLevel}
            />
          )}
          <img
            onClick={() => {
              if (router.query.showTour) {
                setStoryIndex((prev) => prev + 1);
              }
              setshowmenu(!showmenu);
            }}
            id="avatar-button"
            src={
              userdata?.user_img_url ||
              "https://imgcdn.upsurge.in/images/default-avatar.png"
            }
            alt=""
          />
        </div>
      </div>
      {showOnboarding ? (
        <Onboarding
          setOpen={setShowOnboarding}
          actionHandler={() => setShowOnboarding(false)}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default DashboardHeader;
