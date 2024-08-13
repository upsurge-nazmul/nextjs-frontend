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
import AuthComponent from "../Auth/AuthComponent";
import LevelComponent from "../Dashboard/LevelComponent";
import Onboarding from "../Onboarding";
import tooltipStyle from "../../styles/GeneralComponents/tooltip.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import ChosePremiumPopUp from "../ChosePremiumPopUp";
import SubscriptionDetails from "./SubscriptionDetails";
import TransactionHistory from "../Unicoin/TransactionHistory";
import UnicoinsEarned from "./UnicoinsEarned";
import unicoinsStyle from "../../styles/Dashboard/increaseUnicoins.module.scss";
import Animation from "../Buttons/Animation";
import DashboardApis from "../../actions/apis/DashboardApis";
import RedeemNowPopUp from "../../components/RedeemNowPopUp";
import AchievementPopUp from "../AchievementPopUp";
import Modal from "../Modal";
import AccountSwitcher from "./Menu/AccountSwitcher";
import AvatarSelector from "./AvatarSelector";

function DashboardHeader({
  mode,
  showback,
  gobackto,
  settoastdata,
  disableClicks,
  setStoryIndex,
  setShowToolTip,
  showToolTip = {
    show: false,
    msg: "",
  },
}) {
  const router = useRouter();
  const { pathname } = router;
  const [bell, setbell] = useState(false);
  const [notifications, setnotifications] = useState(["s"]);
  const [showauth, setshowauth] = useState(false);
  const [shownotifications, setshownotifications] = useState(false);
  const [kidLevel, setKidLevel] = useState();
  const [showlevels, setshowlevels] = useState(false);
  const [savedUser, setSavedUser] = useState();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [openUnicoinHistory, setOpenUnicoinHistory] = useState(false);
  const [updateUnicoinsAnimation, setUpdateUnicoinsAnimation] = useState(false);
  const {
    setuser,
    userdata,
    setuserdata,
    theme,
    showmenu,
    setshowmenu,
    unicoins,
    setUnicoins,
    setUnicoinsEarnedPopUp,
    unicoinsEarnedPopUp,
    savedUsers,
  } = useContext(MainContext);
  const [displayingUnicoins, setDisplayingUnicoins] = useState(
    userdata?.num_unicoins
  );
  const [activeAnimation, setActiveAnimation] = useState(false);
  const [unicoinsTransactionData, setUnicoinsTransactionData] = useState("");
  const [unAwardedTransaction, setUnAwardedTransaction] = useState(false);
  const [closingBalance, setClosingBalance] = useState(0);
  const [achievementPopUp, setAchievementPopUp] = useState(false);
  const [showRedeemNow, setShowRedeemNow] = useState(false);
  const [shownRedeemNow, setShownRedeemNow] = useState(false);
  const [showAchievement, setShowAchievement] = useState("");
  const [updateUnicoins, setUpdateUnicoins] = useState(false);
  const [showLoggedInUsers, setShowLoggedInUsers] = useState(false);
  const boy_avatars = ["1", "2", "3", "4", "5"];
  const girl_avatars = ["6", "7", "8", "9", "10", "11", "12", "13", "14"];
  const [avatars, setavatars] = useState([...boy_avatars, ...girl_avatars]);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const colors = [
    { front: "#a864fd", back: "#345dd1" },
    { front: "#29cdff", back: "#a864fd" },
    { front: "#78ff44", back: "#ff718d" },
    { front: "#5c86ff", back: "#78ff44" },
    { front: "#ff718d", back: "#fdff6a" },
    { front: "#fdff6a", back: "#fdff6a" },
  ];
  const confettiCount = 50;
  const sequinCount = 20;

  useEffect(async () => {
    if (updateUnicoinsAnimation === true) {
      setTimeout(() => {
        setUpdateUnicoinsAnimation(false);
      }, 3000);
      setTimeout(() => {
        setUpdateUnicoins(!updateUnicoins);
      }, 3500);
      setTimeout(() => {
        setActiveAnimation(true);
      }, 4000);
      let response = await DashboardApis.unicoinsTransactionShown();
    }
  }, [updateUnicoinsAnimation]);

  useEffect(() => {
    setDisplayingUnicoins(closingBalance - unicoins);
  }, [unAwardedTransaction, unicoins]);

  useEffect(async () => {
    setDisplayingUnicoins(parseInt(userdata?.num_unicoins));
    let unAwardedUnicoins = 0;
    if (userdata) {
      let response = await DashboardApis.getUnicoinsTransactionHistory();
      setUnicoinsTransactionData(response?.data?.data);
      const sortedResponse = await response?.data?.data.sort(
        (a, b) => a.timestamp - b.timestamp
      );
      const updatedResponse = await sortedResponse?.map((item, key) => {
        if (item.animation_shown === false) {
          if (item.status === "credit") {
            unAwardedUnicoins =
              parseInt(unAwardedUnicoins) + parseInt(item.unicoins);
          } else if (item.status === "debit") {
            unAwardedUnicoins =
              parseInt(unAwardedUnicoins) - parseInt(item.unicoins);
          }
        }
        if (response.data.data.length === key + 1) {
          if (item.animation_shown === false) {
            setClosingBalance(parseInt(item.closing_balance));
            setUnicoins(unAwardedUnicoins);
            setUnAwardedTransaction(true);
            setUnicoinsEarnedPopUp(true);
            return { ...item, animation_shown: true };
          }
        }
      });
    }
  }, [userdata]);

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
      if (userdata.child_first_login === true) {
        setShowOnboarding(false);
      }
      if (userdata.user_id) {
        fetchKidLevel();
      } else {
        setKidLevel(userdata.level);
      }
    }
  }, [userdata]);

  useEffect(() => {
    let shouldShowRedeemNow = false;
    if (userdata) {
      if (
        displayingUnicoins >= 5000 &&
        userdata.reached_5k === false &&
        pathname !== "/dashboard/k/store" &&
        shownRedeemNow === false
      ) {
        setShowAchievement({
          achievementTitle: "Rookie Earner",
          percentage: 10,
          achievementDescription: "Collect 5000 unicoins",
        });
        setAchievementPopUp(true);
        shouldShowRedeemNow = true;
        if (displayingUnicoins >= 10000) {
          setTimeout(() => {
            if (shownRedeemNow === false) {
              setShowAchievement((prevState) => ({
                ...prevState,
                achievementTitle: "Junior Earner",
                percentage: 5,
                achievementDescription: "Collect 10000 unicoins",
              }));
              setAchievementPopUp(true);
            }
          }, 6000);
        }
      } else if (
        displayingUnicoins >= 10000 &&
        userdata.reached_5k === true &&
        userdata.reached_10k === false &&
        pathname !== "/dashboard/k/store" &&
        shownRedeemNow === false
      ) {
        shouldShowRedeemNow = true;
        setShowAchievement({
          achievementTitle: "Junior Earner",
          percentage: 5,
          achievementDescription: "Collect 10000 unicoins",
        });
      }
    }
    setShowRedeemNow(shouldShowRedeemNow);
    setShownRedeemNow(shouldShowRedeemNow);
    setAchievementPopUp(shouldShowRedeemNow);
  }, [displayingUnicoins, userdata]);

  useEffect(() => {
    if (!showToolTip.show) return;
    let timer = setTimeout(
      () => setShowToolTip((prev) => ({ ...prev, show: false })),
      2500
    );
    return () => {
      clearTimeout(timer);
    };
  }, [showToolTip.show]);
  useEffect(() => {
    if (unAwardedTransaction) {
      const interval = setInterval(() => {
        setDisplayingUnicoins((prevNumber) => {
          if (prevNumber + 1 >= closingBalance) {
            clearInterval(interval);
            setUnicoins(0);
            return closingBalance;
          } else {
            return prevNumber + 1;
          }
        });
      }, 1);

      return () => {
        clearInterval(interval);
      };
    }
  }, [updateUnicoins]);

  console.log("Unicoin value: ", process.env.NEXT_PUBLIC_UNICOIN_VALUE);

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
        {userdata?.user_type !== "parent" &&
          updateUnicoinsAnimation === false && (
            <div
              className={styles.rewardBlock}
              onClick={() => setOpenUnicoinHistory((prev) => !prev)}
            >
              <UniCoinSvg className={styles.svg} />
              <p className={styles.number}>
                <span className={styles.confettiContainer}>
                  <Animation
                    activate={activeAnimation}
                    setActivate={setActiveAnimation}
                    colors={colors}
                    classActive={true}
                    confettiCount={confettiCount}
                    sequinCount={sequinCount}
                  />
                </span>
                {/* {displayingUnicoins  || 0} */}
                {Math.round(displayingUnicoins).toLocaleString("en-IN", {
                  currency: "INR",
                })}
              </p>
            </div>
          )}
        {userdata && updateUnicoinsAnimation === true && (
          <div className={unicoinsStyle.animationBlock}>
            <div
              className={unicoinsStyle.rewardBlock}
              onClick={() => setOpenUnicoinHistory((prev) => !prev)}
            >
              <UniCoinSvg className={unicoinsStyle.svg} />
              <p className={unicoinsStyle.number}>
                {displayingUnicoins
                  ? displayingUnicoins > process.env.NEXT_PUBLIC_UNICOIN_VALUE
                    ? (
                        displayingUnicoins /
                        process.env.NEXT_PUBLIC_UNICOIN_VALUE
                      ).toFixed(2) + "K"
                    : displayingUnicoins
                  : 0}
              </p>
            </div>
            <div className={unicoinsStyle.awardedRewardBlock}>
              +
              <UniCoinSvg className={unicoinsStyle.svg} />
              <p className={unicoinsStyle.number}>
                {unicoins
                  ? Math.round(unicoins).toLocaleString("en-IN", {
                      currency: "INR",
                    })
                  : 0}
              </p>
            </div>
          </div>
        )}
        {userdata?.plan_name == "Premium3m" && (
          <div className={styles.premiumBadge}>
            <span className={styles.text}>Premium</span>
          </div>
        )}
        {
          <div className={tooltipStyle.tooltip}>
            <AnimatePresence>
              {showToolTip.show && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1, y: 35 }}
                  exit={{ opacity: 0, y: 20, x: 30, scale: 0.3 }}
                  transition={{ duration: 0.2 }}
                  className={`${tooltipStyle.tooltip__content} ${tooltipStyle.tooltip__content_bottom}`}
                >
                  {showToolTip.msg}
                </motion.span>
              )}
            </AnimatePresence>
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
              showPremiumPopup={showSubscription}
              setShowPremiumPopup={setShowSubscription}
              setShowLoggedInUsers={setShowLoggedInUsers}
              setShowAvatarModal={setShowAvatarModal}
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
            className={styles.avatarImg}
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
      {showSubscription ? (
        <>
          {userdata && userdata.premium_plan ? (
            <SubscriptionDetails
              setShowSubscription={setShowSubscription}
              userdata={userdata}
            />
          ) : (
            <ChosePremiumPopUp setChoseToPremium={setShowSubscription} />
          )}
        </>
      ) : (
        ""
      )}
      {openUnicoinHistory ? (
        <TransactionHistory
          open={openUnicoinHistory}
          setOpen={setOpenUnicoinHistory}
          data={unicoinsTransactionData}
        />
      ) : (
        ""
      )}
      {unicoinsEarnedPopUp ? (
        <UnicoinsEarned
          setUnicoinsEarnedPopUp={setUnicoinsEarnedPopUp}
          setUpdateUnicoinsAnimation={setUpdateUnicoinsAnimation}
          unicoins={unicoins}
          setUnicoins={setUnicoins}
        />
      ) : (
        ""
      )}
      {showRedeemNow ? (
        <RedeemNowPopUp
          unicoins={displayingUnicoins}
          setShowRedeemNow={setShowRedeemNow}
          reached_5k={userdata.reached_5k}
          reached_10k={userdata.reached_10k}
        />
      ) : null}
      {achievementPopUp ? (
        <AchievementPopUp
          setAchievementPopUp={setAchievementPopUp}
          showAchievement={showAchievement}
        />
      ) : null}
      {showLoggedInUsers && (
        <Modal
          title="Logged In Accounts"
          actions={{
            isCancel: true,
            isProceed: true,
            cancelText: "Close",
            proceedText: "Add New Account",
            handleCancel: () => {
              setShowLoggedInUsers(false);
            },
            handleProceed: () => {
              setshowauth(true);
              setShowLoggedInUsers(false);
            },
          }}
          onOutsideClick={() => setShowLoggedInUsers(false)}
        >
          <AccountSwitcher
            {...{
              savedUsers,
              setshowauth,
              setSavedUser,
              userdata,
              setShowLoggedInUsers,
            }}
          />
        </Modal>
      )}
      {showAvatarModal && <AvatarSelector setshow={setShowAvatarModal} />}
    </div>
  );
}

export default DashboardHeader;
