import React, { useContext, useEffect, useState } from "react";
import Toast from "../../../components/Toast";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import ChoreComponent from "../../../components/Dashboard/ChoreComponent";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import GameCard from "../../../components/Dashboard/GameCard";
import { useRouter } from "next/dist/client/router";
import styles from "../../../styles/ChildActivity/childDashboard.module.scss";
import HeadingArrow from "../../../components/SVGcomponents/HeadingArrow";
import { MainContext } from "../../../context/Main";
import LoginApis from "../../../actions/apis/LoginApis";
import KidApis from "../../../actions/apis/KidApis";
import ChoreApis from "../../../actions/apis/ChoreApis";
import KnowledgeQuestApi from "../../../actions/apis/KnowledgeQuestApi";
import FreeGameApis from "../../../actions/apis/FreeGameApis";
import TribeApis from "../../../actions/apis/TribeApis";
import { getCookie } from "../../../actions/cookieUtils";
import DashboardApis from "../../../actions/apis/DashboardApis";
import UniCoinSvg from "../../../components/SVGcomponents/UniCoinSvg";
import FillSpace from "../../../components/Dashboard/FillSpace";
import QuizApis from "../../../actions/apis/QuizApis";
import { Game_Data } from "../../../static_data/Game_Data";
import { UniCoinValue } from "../../../../config";
import KidDashboardHeader from "../../../components/KidDashboard/KidDashboardHeader";
import LevelComponent from "../../../components/Dashboard/LevelComponent";
import KidChore from "../../../components/KidDashboard/KidChore";
import TodoList from "../../../components/WaitlistDashboard/TodoList";
import Tour from "../../../components/Tour/Tour";
import Jasper from "../../../components/SVGcomponents/Jasper";
import IntroDiv from "../../../components/Tour/IntroDiv";
import MoneyAceApis from "../../../actions/apis/MoneyAceApis";
import SimulatorApis from "../../../actions/apis/SimulatorApis";
import KidQuest from "../../../components/KidDashboard/KidQuest";
import TodaysQuestion from "../../../components/WaitlistDashboard/TodaysQuestion";
import PageTitle from "../../../components/PageTitle";
import Journey from "../../../components/Journey";
import EmailVerificationPending from "../../../components/EmailVerificationPending";
import EditProfilePending from "../../../components/EditProfilePending";
import PhoneVerificationPending from "../../../components/PhoneVerificationPending";
import FlashSaleOffer from "../../../components/FlashSaleOffer";
import FlashSaleOfferPremium from "../../../components/FlashSaleOfferPremium";
import TrendingGamesPopUp from "../../../components/TrendingGamesPopUp";
import KqPopUpPostSignUp from "../../../components/KqPopUpPostSignUp";

export default function ChildActivity({
  pendingchores,
  childdetail,
  highestquizscore,
  childTribes,
  recentgames,
  currentLevel,
  userdatafromserver,
  tododatafromserver,
  moneyacedata,
  activeQuests,
  stockHoldings,
  todaysquestion,
}) {
  const { userdata, setuserdata } = useContext(MainContext);
  const [mode, setmode] = useState("Welcome, " + childdetail.first_name);
  const [showtour, setshowtour] = useState(
    !userdatafromserver?.intro_guide_completed
  );
  const [tododata, settododata] = useState(tododatafromserver);
  const [choremode, setchoremode] = useState("inprogress");
  const [chorearray, setchorearray] = useState(pendingchores);
  const [showtodo, setshowtodo] = useState(false);
  const [currentTourIndex, setcurrentTourIndex] = useState(0);
  const [quests, setquests] = useState([]);
  const [showlevels, setshowlevels] = useState(false);
  const router = useRouter();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [showToolTip, setShowToolTip] = useState({
    show: false,
    msg: "",
  });
  const [showTrendingGames, setShowTrendingGames] = useState(false);
  const [trendingGamesShown, setTrendingGamesShown] = useState(
    parseInt(userdatafromserver.gamePopUpShown)
  );
  const [showBecomeFinanciallySmart, setShowBecomeFinanciallySmart] =
    useState(false);
  const [shownBecomeFinanciallySmart, setShownShowBecomeFinanciallySmart] =
    useState(parseInt(userdatafromserver.kqPopUpShown));
  const [openGame, setOpenGame] = useState("");
  const [currentChapter, setCurrentChapter] = useState("");
  const [lastActivity, setLastActivity] = useState(Date.now());
  useEffect(() => {
    setLastActivity(Date.now());
  }, []);
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (Date.now() - lastActivity >= 20000) {
        if (trendingGamesShown < 1) {
          if (userdatafromserver.gamePopUpShown == 0) {
            let response = await DashboardApis.updateDashboardPopup({
              games_shown: parseInt(userdatafromserver.gamePopUpShown) + 1,
              kq_shown: parseInt(userdatafromserver.kqPopUpShown),
            });
            if (response && response.data && response.data.success) {
              setShowTrendingGames(true);
              setTrendingGamesShown(
                parseInt(userdatafromserver.gamePopUpShown) + 1
              );
            }
          }
        } else if (
          shownBecomeFinanciallySmart < 1 &&
          trendingGamesShown > 0 &&
          showTrendingGames === false
        ) {
          if (userdatafromserver.kqPopUpShown == 0) {
            let response = await DashboardApis.updateDashboardPopup({
              games_shown: parseInt(userdatafromserver.gamePopUpShown),
              kq_shown: parseInt(userdatafromserver.kqPopUpShown) + 1,
            });
            if (response && response.data && response.data.success) {
              setShowBecomeFinanciallySmart(true);
              setShownShowBecomeFinanciallySmart(
                parseInt(userdatafromserver.kqPopUpShown) + 1
              );
            }
          }
        }
      }
    }, 20000);
    return () => clearTimeout(timeoutId);
  }, [lastActivity]);
  useEffect(() => {
    function handleActivity() {
      setLastActivity(Date.now());
    }
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, []);
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, [userdatafromserver]);
  useEffect(() => {
    if (choremode === "inprogress") {
      if (pendingchores) {
        setchorearray(pendingchores);
      }
    } else {
      x();
    }
    async function x() {
      let res = await ChoreApis.getchildchores(
        {
          id: router.query.childid,
          type: "completed",
        },
        getCookie("accesstoken")
      );
      if (res && res.data && res.data.success) {
        setchorearray(res.data.data);
      } else {
        setchorearray([]);
      }
    }
  }, [choremode]);
  useEffect(() => {
    const scrollContainer = document.querySelector("#tribewrapper");
    if (!scrollContainer) return;

    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY * 5;
    });
  }, []);
  useEffect(() => {
    if (router.query.storyIndex) {
      setcurrentTourIndex(Number(router.query.storyIndex));
    }
  }, [router.query]);
  useEffect(() => {
    async function fetchQuestData() {
      let questRes = await KnowledgeQuestApi.getQuestData(
        null,
        getCookie("accesstoken")
      );
      if (questRes && questRes.data && questRes.data.success) {
        let questList = questRes.data.data;
        for (let quest of questList) {
          let levelRes = await KnowledgeQuestApi.initiate(
            { quest_id: quest.questId },
            getCookie("accesstoken")
          );
          if (levelRes && levelRes.data && levelRes.data.success) {
            let questLevel = levelRes.data.data.level;
            quest.level = questLevel;
          }
        }
        setquests(questList);
      }
    }
    fetchQuestData();
  }, []);

  function handleGameClick(pushto = null, gameName = null) {
    pushto = pushto ? pushto.split("/")[pushto.split("/").length - 1] : "";
    router.push("/dashboard/k/game/" + (pushto ? pushto : gameName));
  }

  const story = [
    {
      intro: true,
      content: (
        <IntroDiv
          name={userdata?.first_name}
          text={`I am Jasper and i i'll help you get started.`}
        />
      ),
    },
    {
      ref: "#upsurge-logo",
      isolate: true,
      required: true,
      highlightBg: true,
      position: "bottom",
      content: `You can go back to home page, by clicking upsurge logo.`,
    },
  ];
  return (
    <div className={styles.childactivity}>
      <PageTitle title={`upsurge | Dashboard`} />
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />
      {/* {showtour && (
        <Tour
          story={story}
          current={currentTourIndex}
          setcurrent={setcurrentTourIndex}
          showtour={showtour}
          setshowtour={setshowtour}
          introComplete={true}
        />
      )} */}
      {showlevels && <LevelComponent setshow={setshowlevels} />}
      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
          setShowToolTip={setShowToolTip}
          showToolTip={showToolTip}
        />

        {showtodo && (
          <TodoList
            data={tododata.list}
            total={tododata.total}
            completed={tododata.completed}
            hide={() => {
              if (currentTourIndex === 3) {
                setcurrentTourIndex((prev) => prev + 1);
              }
              setshowtodo(!showtodo);
            }}
          />
        )}
        <div className={styles.mainContent}>
          {/* {userdatafromserver && userdatafromserver.premium_plan >= 1001 && userdatafromserver.premium_flash_sale === true && (
            <FlashSaleOfferPremium />
            )} */}
          {userdatafromserver && userdatafromserver.premium_plan == 0 && (
            <FlashSaleOffer />
          )}
          {userdatafromserver && !userdatafromserver.email_verified && (
            <EmailVerificationPending settoastdata={setShowToolTip} />
          )}
          {userdatafromserver && !userdatafromserver.profile_completed && (
            <EditProfilePending />
          )}
          {userdatafromserver && !userdatafromserver.phone_verified && (
            <PhoneVerificationPending />
          )}
          <Journey />
          <div className={styles.contentArea}>
            <div className={styles.flexLeft}>
              {todaysquestion && <TodaysQuestion data={todaysquestion} />}
            </div>
            <div className={styles.flexRight}>
              {userdata && userdata.chores_opted ? (
                <div className={styles.choreSection} id="chores">
                  <h2
                    className={styles.mainheading}
                    onClick={() => router.push("/dashboard/k/chores")}
                  >
                    Chores
                    <HeadingArrow />
                  </h2>
                  <div className={styles.wrapper}>
                    {chorearray.map((data, index) => {
                      return (
                        <KidChore
                          data={data}
                          settoastdata={setShowToolTip}
                          key={"chorecomponent" + index}
                        />
                      );
                    })}
                    {chorearray.length === 0 && (
                      <FillSpace
                        text={"No chores in progress"}
                        extrastyle={{ margin: 0, minHeight: "220px" }}
                      />
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <></>
          <div className={styles.gamessection} id="recent_games">
            <h2 className={styles.heading}>Recently played games</h2>
            <div className={styles.wrapper}>
              {recentgames.map((game, i) => {
                return (
                  <GameCard
                    data={Game_Data[game]}
                    key={i}
                    onCLick={() =>
                      handleGameClick(Game_Data[game].pushto, game)
                    }
                  />
                );
              })}
              {recentgames.length === 0 && (
                <FillSpace
                  text={"No recent games"}
                  extrastyle={{ margin: 0, minHeight: "220px" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {showTrendingGames ? (
        <TrendingGamesPopUp
          setShowTrendingGames={setShowTrendingGames}
          setOpenGame={setOpenGame}
          userdata={userdata}
        />
      ) : null}
      {showBecomeFinanciallySmart ? (
        <KqPopUpPostSignUp
          setShowBecomeFinanciallySmart={setShowBecomeFinanciallySmart}
          userdata={userdata}
        />
      ) : null}
    </div>
  );
}

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    let tq = await QuizApis.todaysquestion(null, token);
    if (response && !response.data.success) {
      msg = response.data.msg;
      return {
        props: { isLogged: false, msg },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      if (response.data.data.is_waiting_active) {
        return {
          props: { isLogged: false, msg: msg || "Error" },
          redirect: {
            permanent: false,
            destination: "/dashboard/w",
          },
        };
      }
      if (response.data.data.user_type !== "child")
        return {
          props: { isLogged: false, msg: msg || "Error" },
          redirect: {
            permanent: false,
            destination: "/dashboard/p",
          },
        };
      let pendinchores = await ChoreApis.getchildchores(
        {
          id: response.data.data.user_id,
          type: "pending",
        },
        token
      );
      let moneyacedata = await MoneyAceApis.getMoneyAceData(null, token);
      let tododata = await DashboardApis.getTodo(null, token);
      let highestquizscore = await QuizApis.highestscore({
        email: response.data.data.email,
      });

      let userTribes = await TribeApis.userTribes(
        {
          userId: response.data.data.user_id,
        },
        token
      );

      let recentgames = await FreeGameApis.getrecentGames(
        { id: response.data.data.user_id },
        token
      );
      let currentLevel = await KidApis.getlevel(
        {
          id: response.data.data.user_id,
        },
        token
      );
      let activeQuests = await KnowledgeQuestApi.getActiveQuests(
        { userId: response.data.data.user_id },
        token
      );
      let stockHoldings = await SimulatorApis.getUserHoldings({
        payload: { userId: response.data.data.user_id },
        token,
      });
      return {
        props: {
          isLogged: true,
          pendingchores:
            pendinchores && pendinchores.data && pendinchores.data.success
              ? pendinchores.data.data
              : [],
          currentLevel:
            currentLevel && currentLevel.data && currentLevel.data.success
              ? currentLevel.data.data
              : 1,
          tododatafromserver: tododata?.data?.data || null,
          childdetail:
            response && response.data && response.data.data
              ? response.data.data
              : [],
          highestquizscore: highestquizscore?.data.success
            ? highestquizscore.data.data.score
            : 0,
          childTribes:
            userTribes && userTribes.data && userTribes.data.success
              ? userTribes.data.data
              : [],
          recentgames:
            recentgames && recentgames.data && recentgames.data.success
              ? recentgames.data.data
              : [],
          userdatafromserver: response.data.data,
          moneyacedata:
            moneyacedata && moneyacedata.data && moneyacedata.data.success
              ? moneyacedata.data.data
              : null,
          activeQuests:
            activeQuests && activeQuests.data && activeQuests.data.success
              ? activeQuests.data.data
              : null,
          stockHoldings:
            stockHoldings && stockHoldings.data && stockHoldings.data.success
              ? stockHoldings.data.data
              : null,
          todaysquestion: tq?.data?.success ? tq.data.data : null,
        },
      };
    }
  } else {
    return {
      props: { isLogged: false, msg: "cannot get token" },
      redirect: {
        permanent: false,
        destination: "/?err=01",
      },
    };
  }
}
