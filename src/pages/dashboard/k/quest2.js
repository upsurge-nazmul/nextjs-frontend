import React, { useEffect, useState } from "react";
import KnowledgeQuestApi from "../../../actions/apis/KnowledgeQuestApi";
import LoginApis from "../../../actions/apis/LoginApis";
import Toast from "../../../components/Toast";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import { useRouter } from "next/dist/client/router";
import styles from "../../../styles/Quest/questpage.module.scss";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import RequestModal from "../../../components/KidStore/RequestModal";
import { useContext } from "react";
import { MainContext } from "../../../context/Main";
import BoatIcon from "../../../components/SVGcomponents/BoatIcon";
import QuestQuiz from "../../../components/Quests/QuestQuiz";
import { scrollParentToChild } from "../../../helpers/domHelpers";
import GameApis from "../../../actions/apis/GameApis";
import GameFrame from "../../../components/Quests/GameFrame";
import BrokenGameConroller from "../../../components/SVGcomponents/BrokenGameConroller";
const democoncepts = [
  "Money",
  "Currency",
  "Banking",
  "Payments",
  "Money Management",
  "Quiz",
  "Activity",
];
export default function KidStore({
  gamedata,
  userdatafromserver,
  levelfromserver,
  questData,
}) {
  // modes are different pages like home,kids,store,payments,notifications
  const [mode, setmode] = useState("");
  const [questmode, setquestmode] = useState("map");
  const { userdata, setuserdata, widthHeight } = useContext(MainContext);
  const [currentlevel, setcurrentlevel] = useState(levelfromserver);
  const router = useRouter();
  const [showgame, setshowgame] = useState(false);
  const [showmodal, setshowmodal] = useState(false);
  const [quizId, setquizId] = useState("");
  const [isfullscreen, setisfullscreen] = useState(false);

  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [data, setdata] = useState({
    name: "",
    price: "",
  });
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, [userdatafromserver]);
  useEffect(() => {
    let parent = document.getElementById("quest-main");
    let child = document.getElementById("boaticon");
    console.log(child);
    if (parent && child) {
      scrollParentToChild(parent, child, 0);
    }
  }, [questmode]);
  function movetofull() {
    // if already full screen; exit
    // else go fullscreen
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setisfullscreen(false);
    } else {
      let element = document.getElementById("unity-wrapper");
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
      setisfullscreen(true);
    }
  }
  // useEffect(() => {
  //   window.screen.orientation.onchange = function () {
  //     if (this.type.startsWith("landscape")) {
  //       movetofull();
  //     } else {
  //       document.webkitExitFullscreen();
  //     }
  //   };
  // }, []);
  return (
    <div className={styles.questPage}>
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />
      <RequestModal
        data={data}
        showmodal={showmodal}
        setshowmodal={setshowmodal}
        availableUnicoins={userdatafromserver?.num_unicoins || 0}
      />
      <div className={styles.contentWrapper}>
        <DashboardHeader mode={mode} setmode={setmode} />
        <div className={styles.mainContent} id="quest-main">
          <div className={styles.mainhead}>
            <img
              src="https://i.ibb.co/XpQ4TYc/6-L4pbu-K66d3-80-DX634-DY634-CX494-CY497.png"
              alt=""
            />
            <div className={styles.right}>
              <p className={styles.questheading}>upsurge Quest</p>
              <p className={styles.age}>Age 10-16</p>
              {/* <div className={styles.details}>
                <div className={styles.students}>
                  <PeopleSvg />
                  345 students enrolled
                </div>
                <div className={styles.projects}>
                  <ProjectSvg />
                  37 published projects
                </div>
              </div> */}
            </div>
            <div className={styles.creditandweeks}>
              <p className={styles.credits}>1000 UniCoins</p>
            </div>
          </div>
          <div className={styles.mainwrapper}>
            <div className={styles.left}>
              <p className={styles.heading}>About the Quest</p>
              <p className={styles.about}>
                {`This introductory quests takes children through the concepts of money, banking, payments and money management. To progress, you have to complete each chapter, and complete all six to earn the completion badge and 1,000 UniCoins.`}
              </p>
              <p className={styles.heading}>Concepts Covered</p>
              <div className={styles.conceptswrapper}>
                {democoncepts.map((concept, index) => {
                  return (
                    <div className={styles.concept} key={"concept" + index}>
                      {concept}
                    </div>
                  );
                })}
              </div>
              {currentlevel === 0 && (
                <p className={styles.heading}>
                  {`Click on “What is money?” to start your quest`}
                </p>
              )}
              {questmode !== "map" && (
                <div className={styles.contentDetails}>
                  <p className={styles.contentheading}>
                    {questData[currentlevel - 1].heading}
                  </p>
                  <p className={styles.contentdes}>
                    {questData[currentlevel - 1].des}
                  </p>
                </div>
              )}
              <div className={styles.mainWrapper} id="unity-wrapper">
                {widthHeight.width < 900 &&
                widthHeight.height > widthHeight.width ? (
                  <div className={styles.mobileerr}>
                    <div className={styles.box}>
                      <BrokenGameConroller className={styles.jasper} />
                      <p className={styles.heading}>
                        Please switch to landscape mode
                      </p>
                      <p>{`We recommend changing your display to landscape mode to best enjoy the quest`}</p>
                      <div
                        className={styles.button}
                        onClick={() => router.push("/dashboard/w")}
                      >
                        Go back
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {questmode === "map" ? (
                      <div
                        className={`${styles.map} ${
                          currentlevel >= 6 && styles.blockscroll
                        }`}
                        id="map"
                      >
                        {currentlevel > 6 && (
                          <img
                            className={styles.stamp}
                            src="https://i.ibb.co/MSnLzRq/Untitled-design-146-removebg-preview.png"
                            alt=""
                            loading="lazy"
                          />
                        )}
                        <img 
                          src="https://i.ibb.co/r21r8V1/mainmap.jpg"
                          className={styles.bg}
                          alt=" "
                        />
                        <p
                          id="kqc1"
                          className={`${styles.kqc} ${styles.kqc1} ${
                            currentlevel === 1 && styles.activekqc
                          } ${currentlevel > 1 && styles.completedkqc}`}
                          onClick={() => {
                            if (!(currentlevel >= 1)) {
                              return;
                            }
                            setquestmode("KnowingYourMoney");
                          }}
                        >
                          {questData[0].title}
                        </p>
                        <p
                          id="kqc2"
                          className={`${styles.kqc} ${styles.kqc2}  ${
                            currentlevel == 2 && styles.activekqc
                          } ${currentlevel > 2 && styles.completedkqc}`}
                          onClick={() => {
                            if (!(currentlevel >= 2)) {
                              return;
                            }
                            setquizId("introduction-to-money");
                            setquestmode("quiz");
                          }}
                        >
                          {questData[1].title}
                        </p>
                        <p
                          id="kqc3"
                          className={`${styles.kqc} ${styles.kqc3}  ${
                            currentlevel == 3 && styles.activekqc
                          } ${currentlevel > 3 && styles.completedkqc}`}
                          onClick={() => {
                            if (!(currentlevel >= 3)) {
                              return;
                            }
                            setquestmode("bank-visit");
                          }}
                        >
                          {questData[2].title}
                        </p>
                        <p
                          id="kqc4"
                          className={`${styles.kqc} ${styles.kqc4}  ${
                            currentlevel == 4 && styles.activekqc
                          } ${currentlevel > 4 && styles.completedkqc}`}
                          onClick={() => {
                            if (!(currentlevel >= 2)) {
                              return;
                            }
                            setquizId("visit-to-bank");
                            setquestmode("quiz");
                          }}
                        >
                          {questData[3].title}
                        </p>
                        <p
                          id="kqc5"
                          className={`${styles.kqc} ${styles.kqc5}  ${
                            currentlevel == 5 && styles.activekqc
                          } ${currentlevel > 5 && styles.completedkqc}`}
                          onClick={() => {
                            if (!(currentlevel >= 5)) {
                              return;
                            }
                            setquestmode("KiarasBudgetTrip");
                          }}
                        >
                          {questData[4].title}
                        </p>
                        <p
                          className={`${styles.kqc} ${styles.kqc6}  ${
                            currentlevel == 6 && styles.activekqc
                          } ${currentlevel > 6 && styles.completedkqc}`}
                          onClick={() => {
                            if (!(currentlevel >= 6)) {
                              return;
                            }
                            setshowgame(true);
                            setquestmode("game");
                          }}
                        >
                          {questData[5].title}
                        </p>
                        <BoatIcon
                          id="boaticon"
                          className={`${styles.boat} ${
                            styles["boat" + currentlevel]
                          }`}
                        />
                      </div>
                    ) : questmode === "quiz" ? (
                      <QuestQuiz
                        quizId={quizId}
                        setlevel={setcurrentlevel}
                        setmode={setquestmode}
                        level={currentlevel}
                      />
                    ) : showgame ? (
                      <GameFrame gamedata={gamedata} setmode={setquestmode} />
                    ) : (
                      <iframe
                        id="iframe"
                        className={`${styles.map} ${styles.course}`}
                        src={
                          questmode === "KnowingYourMoney"
                            ? "/quests/KnowingYourMoney/story.html"
                            : questmode === "KiarasBudgetTrip"
                            ? "/quests/KiarasBudgetTrip/story.html"
                            : "/quests/bankvisit/story.html"
                        }
                      ></iframe>
                    )}
                  </div>
                )}
              </div>

              {(questmode !== "map" || showgame) && (
                <div className={styles.buttons}>
                  <div
                    className={styles.button}
                    onClick={() => setquestmode("map")}
                  >
                    Go back
                  </div>
                  {questmode !== "quiz" && currentlevel < 7 && (
                    <div
                      className={styles.button}
                      onClick={() => {
                        if (questmode === "bank-visit") {
                          KnowledgeQuestApi.update({
                            level: 4,
                            id: "money-quest",
                          });
                          setuserdata((prev) => ({
                            ...prev,
                            num_unicoins: Number(prev.num_unicoins) + 100,
                          }));
                          setcurrentlevel(4);
                        }
                        if (questmode === "KnowingYourMoney") {
                          KnowledgeQuestApi.update({
                            level: 2,
                            id: "money-quest",
                          });
                          setuserdata((prev) => ({
                            ...prev,
                            num_unicoins: Number(prev.num_unicoins) + 100,
                          }));
                          setcurrentlevel(2);
                        }
                        if (questmode === "KiarasBudgetTrip") {
                          KnowledgeQuestApi.update({
                            level: 6,
                            id: "money-quest",
                          });
                          setuserdata((prev) => ({
                            ...prev,
                            num_unicoins: Number(prev.num_unicoins) + 100,
                          }));
                          setcurrentlevel(6);
                        }
                        if (questmode === "game") {
                          KnowledgeQuestApi.update({
                            level: 7,
                            id: "money-quest",
                          });
                          setcurrentlevel(7);
                          setshowgame(false);
                          setuserdata((prev) => ({
                            ...prev,
                            num_unicoins: Number(prev.num_unicoins) + 450,
                          }));
                        }
                        setquestmode("map");
                      }}
                    >
                      Done
                    </div>
                  )}
                </div>
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
      let level = await KnowledgeQuestApi.initiate(
        { id: "money-quest" },
        token
      );
      let questRes = await KnowledgeQuestApi.getQuestData({ old: true }, token);
      let gamedata = await GameApis.gamedata({ id: "NeedOrWant" });
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          levelfromserver:
            level && level.data && level.data.success
              ? level.data.data.level
              : 1,
          gamedata:
            gamedata && gamedata?.data && gamedata?.data.success
              ? gamedata.data.data
              : null,
          questData: questRes
            ? questRes.data
              ? questRes.data.success
                ? questRes.data.data
                : null
              : null
            : null,
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
