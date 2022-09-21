import React, { useContext, useEffect, useState } from "react";
import Toast from "../../../components/Toast";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import ChoreComponent from "../../../components/Dashboard/ChoreComponent";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import GameCard from "../../../components/Dashboard/GameCard";
import { useRouter } from "next/dist/client/router";
import styles from "../../../styles/ChildActivity/childactivity.module.scss";
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
    {
      ref: "#milestone",
      position: "bottom",
      highlightBg: true,
      text: "Welcome to upsurge!",
      extraPadding: true,
      content: `you can check your milestones here.`,
      required: true,
      disableBtns: true,
      isolate: true,
    },
    {
      ref: "#milestone-wrapper",
      content: (
        <IntroDiv
          hideJasper={true}
          head={`Here you can see all your milestones!`}
          text={`You can also directly go to milestones, by clicking on them.`}
        />
      ),
      superimpose: true,
      position: "bottom",
      required: true,
      delay: true,
      isolate: true,
      absolute: true,
      disableBg: true,
      nextFunction: () => {
        if (currentTourIndex === 3) {
          setcurrentTourIndex((prev) => prev + 1);
        }
        setshowtodo(!showtodo);
      },
    },
    {
      ref: "#leaderboards",
      position: "bottom",
      content: `You can see the leaderboards here.`,
      extraPadding: true,
      superimpose: true,
      highlightBg: true,
      required: true,
      isolate: true,
    },
    {
      ref: "#chores",
      position: "bottom",
      content: `You can see your pending chores here.`,
      superimpose: true,
      required: true,
      isolate: true,
    },
    {
      ref: "#quests",
      position: "bottom",
      content: `You can see your quest progress here.`,
      superimpose: true,
      required: true,
      isolate: true,
    },
    {
      ref: "#recent_games",
      position: "top",
      content: `You can access your recent games.`,
      superimpose: true,
      required: true,
      highlightBg: true,
      isolate: true,
      extraPadding: true,
    },
    {
      ref: "#todays-question",
      position: "bottom",
      content: `You can answer questions and get rewards.`,
      superimpose: true,
      required: false,
      isolate: true,
    },
    {
      ref: "#chores-leftpanel",
      position: "bottom",
      content: `Now lets go to chores.`,
      disableBtns: true,
      superimpose: true,
      required: true,
      highlightBg: true,
      isolate: true,
    },
    {
      ref: "#quest-leftpanel",
      position: "bottom",
      content: `You can track the knowledge quest progress of your children.`,
      superimpose: true,
      required: true,
      highlightBg: true,
      isolate: true,
    },
    {
      ref: "#games-leftpanel",
      position: "bottom",
      content: `You can play games here.`,
      superimpose: true,
      required: true,
      highlightBg: true,
      isolate: true,
    },
    {
      ref: "#store-leftpanel",
      position: "bottom",
      content: `Now lets go to store.`,
      superimpose: true,
      required: true,
      highlightBg: true,
      isolate: true,
    },
  ];

  return (
    <div className={styles.childactivity}>
      <PageTitle title={`upsurge | Dashboard`} />
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />
      {showtour && (
        <Tour
          story={story}
          current={currentTourIndex}
          setcurrent={setcurrentTourIndex}
          showtour={showtour}
          setshowtour={setshowtour}
          introComplete={true}
        />
      )}
      {showlevels && <LevelComponent setshow={setshowlevels} />}
      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
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
          <Journey />
          <div className={styles.contentArea}>
            <div className={styles.flexLeft}>
              <div className={styles.headsection}>
                  {/* <div className={styles.topblock}>
                      <h2 className={styles.mainheading}>
                        Level
                        <HeadingArrow />
                      </h2>
                      <div className={styles.right}>
                        <div
                          className={styles.badge}
                          onClick={() => setshowlevels(true)}
                        >
                          <img
                            src={"/images/badges/badge_" + currentLevel + ".svg"}
                            alt=""
                          />
                          <p className={styles.level}>Level {currentLevel}</p>
                        </div>
                      </div>
                    </div> */}
                {childTribes.length > 0 && (
                  <>
                    <div className={styles.tribeheading}>
                      <h2
                        className={styles.mainheading}
                        onClick={() => router.push("/dashboard/k/tribes")}
                      >
                        Tribes
                        <HeadingArrow />
                      </h2>
                    </div>
                    <div className={styles.tribes} id="tribewrapper">
                      {childTribes.map((tribe) => (
                        <div
                          className={styles.tribe}
                          key={tribe.id}
                          onClick={() =>
                            router.push("/dashboard/k/tribes/" + tribe.id)
                          }
                        >
                          <img
                            src={
                              tribe.tribe_img_url ||
                              "https://imgcdn.upsurge.in/images/default-avatar.png"
                            }
                            alt=""
                          />
                          <p className={styles.name}>{tribe.name}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              {/* <div className={styles.milestonesSection}>
                <h2
                  id="milestone"
                  className={styles.mainheading}
                  onClick={() => {
                    if (currentTourIndex === 2) {
                      setcurrentTourIndex((prev) => prev + 1);
                    }
                    setshowtodo(true);
                  }}
                >
                  Milestones
                  <HeadingArrow />
                </h2>
                <div className={styles.quizblock}>
                  <p className={styles.heading}>
                    {tododata
                      ? tododata.completed + "/" + tododata.total
                      : "All clear"}
                  </p>
                  <p
                    className={styles.subheading}
                    onClick={() => setshowtodo(true)}
                  >
                    Complete Milestones
                  </p>
                </div>
              </div> */}              
              <div className={styles.questionSection}>
                {todaysquestion && <TodaysQuestion data={todaysquestion} />}
              </div>
              <div className={styles.leaderboardsection} id="leaderboards">
                <div className={styles.wrapper}>
                  <div className={styles.element}>
                    <p className={styles.rank}>
                      {moneyacedata.inhand_money + moneyacedata.account_balance}
                    </p>
                    <p className={styles.section}>Money ace</p>
                  </div>
                  {/* <div className={styles.element}>
                  <p className={styles.rank}>{highestquizscore ?? 0}</p>
                  <p className={styles.section}>Money Quotient</p>
                </div>
                <div className={styles.element}>
                  <p className={styles.rank}>{activeQuests?.length || 0}</p>
                  <p className={styles.section}>Quests</p>
                </div>
                <div className={styles.element}>
                  <p className={styles.rank}>
                    {stockHoldings ? Math.floor(stockHoldings[0].amount) : 0}
                  </p>
                  <p className={styles.section}>StockSimulator</p>
                </div> */}
                </div>
              </div>
            </div>
            <div className={styles.flexRight}>
              {/* <div className={styles.questsection} id="quests">
                <h2
                  className={styles.heading}
                  onClick={() => router.push("/dashboard/k/quest")}
                >
                  Quests
                  <HeadingArrow />
                </h2>
                <div className={styles.wrapper}>
                  {quests.length && quests.find((quest) => quest.level > 0) ? (
                    <>
                      {quests.map((quest, i) => {
                        if (quest.level > 0)
                          return <KidQuest data={quest} key={i} />;
                      })}
                    </>
                  ) : (
                    <FillSpace
                      text={"No quest in progress"}
                      extrastyle={{ margin: 0, minHeight: "220px" }}
                    />
                  )}
                </div>
              </div> */}
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
                        settoastdata={settoastdata}
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
