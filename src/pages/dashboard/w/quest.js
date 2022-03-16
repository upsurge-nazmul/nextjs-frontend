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
  isLogged,
  msg,
  userdatafromserver,
  levelfromserver,
}) {
  // modes are different pages like home,kids,store,payments,notifications
  const [mode, setmode] = useState("Knowledge Quest");
  const [questmode, setquestmode] = useState("map");
  const { userdata, setuserdata } = useContext(MainContext);
  const [currentlevel, setcurrentlevel] = useState(levelfromserver);
  const router = useRouter();
  const [showmodal, setshowmodal] = useState(false);
  const [quizId, setquizId] = useState("");
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [data, setdata] = useState({
    name: "",
    price: "",
  });
  const content = [
    {
      name: "Money & Barter System",
      des: "Children will understand how & why Money was invented, it’s evolution, and uses",
    },
    {
      name: "Money & Barter System - Activity",
      des: "Children will understand how & why Money was invented, it’s evolution, and uses",
    },
    {
      name: "Ira goes to the bank",
      des: "Let’s go with Ira and her father to the bank and understand the benefits of opening bank accounts",
    },
    {
      name: "Ira goes to the bank - Activity",
      des: "Let’s go with Ira and her father to the bank and understand the benefits of opening bank accounts",
    },
    {
      name: "How to manage your money",
      des: "Children will understand how & why Money was invented, it’s evolution, and uses ",
    },
    {
      name: "How to manage your money - Activity",
      des: "Children will understand how & why Money was invented, it’s evolution, and uses ",
    },
  ];
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, [userdatafromserver]);
  useEffect(() => {
    let parent = document.getElementById("map");
    let child = document.getElementById("kqc" + currentlevel);
    if (parent && child) {
      scrollParentToChild(parent, child, 100);
    }
  }, [questmode]);
  return (
    <div className={styles.questPage}>
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />
      <RequestModal
        data={data}
        showmodal={showmodal}
        setshowmodal={setshowmodal}
        availableUnicoins={userdatafromserver?.num_unicoins || 0}
      />
      <div className={styles.contentWrapper}>
        <DashboardHeader mode={mode} setmode={setmode} />
        <div className={styles.mainContent}>
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
              <p className={styles.weeks}>2 weeks</p>
              <p className={styles.credits}>200 UniCoins</p>
            </div>
          </div>
          <div className={styles.mainwrapper}>
            <div className={styles.left}>
              <p className={styles.heading}>About the Quest</p>
              <p className={styles.about}>
                {`This introductory quests takes children through the concepts of money, banking, payments and money management. To progress, you have to complete each chapter, and complete all six to earn the completion badge and 1,000 UniCoins.`}
              </p>
              <p className={styles.heading}>Knowledge Quest Content</p>
              <p className={styles.content}>
                Follow the course content to learn more about Investing.
              </p>
              {questmode !== "map" && (
                <div className={styles.contentDetails}>
                  <p className={styles.contentheading}>
                    {content[currentlevel - 1].name}
                  </p>
                  <p className={styles.contentdes}>
                    {content[currentlevel - 1].des}
                  </p>
                </div>
              )}
              {questmode === "map" ? (
                <div
                  className={`${styles.map} ${
                    currentlevel >= 6 && styles.blockscroll
                  }`}
                  id="map"
                >
                  {currentlevel >= 6 && (
                    <img
                      className={styles.stamp}
                      src="https://i.ibb.co/MSnLzRq/Untitled-design-146-removebg-preview.png"
                      alt=""
                    />
                  )}
                  <img
                    src="https://i.ibb.co/r21r8V1/mainmap.jpg"
                    className={styles.bg}
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
                    {`Money & Barter System`}
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
                    Activity
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
                    Ira goes to the bank
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
                    Activity
                  </p>
                  <p
                    id="kqc5"
                    className={`${styles.kqc} ${styles.kqc5}  ${
                      currentlevel == 5 && styles.activekqc
                    } ${currentlevel > 5 && styles.completedkqc}`}
                  >
                    How to manage your money
                  </p>
                  <p
                    className={`${styles.kqc} ${styles.kqc6}  ${
                      currentlevel == 6 && styles.activekqc
                    } ${currentlevel > 6 && styles.completedkqc}`}
                    onClick={() => {
                      if (!(currentlevel >= 6)) {
                        return;
                      }
                      setquizId("debit-credit-card");
                      setquestmode("quiz");
                    }}
                  >
                    Activity
                  </p>
                  <BoatIcon
                    id="boat"
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
              ) : (
                <iframe
                  id="iframe"
                  className={`${styles.map} ${styles.course}`}
                  src={
                    questmode === "KnowingYourMoney"
                      ? "/quests/KnowingYourMoney/story.html"
                      : "/quests/bankvisit/story.html"
                  }
                ></iframe>
              )}
              {questmode !== "map" && (
                <div className={styles.buttons}>
                  <div
                    className={styles.button}
                    onClick={() => setquestmode("map")}
                  >
                    Go back
                  </div>
                  {questmode !== "quiz" && (
                    <div
                      className={styles.button}
                      onClick={() => {
                        if (questmode === "bank-visit") {
                          KnowledgeQuestApi.update({
                            level: 4,
                            id: "money-quest",
                          });
                          setcurrentlevel(4);
                        }
                        if (questmode === "KnowingYourMoney") {
                          KnowledgeQuestApi.update({
                            level: 2,
                            id: "money-quest",
                          });
                          setcurrentlevel(2);
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
            <div className={styles.right}>
              <div className={styles.details}>
                {/* <div className={styles.section}>
                  <p className={styles.number}>34</p>
                  <p className={styles.name}>session</p>
                </div> */}
                <div className={styles.section}>
                  <p className={styles.number}>3</p>
                  <p className={styles.name}>Courses</p>
                </div>
                <div className={styles.section}>
                  <p className={styles.number}>3</p>
                  <p className={styles.name}>Activities</p>
                </div>
              </div>
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
              <div className={styles.buttonwrapper}>
                <div
                  className={styles.startbutton}
                  onClick={() => {
                    setquestmode("KnowingYourMoney");
                    let elemnt = document.getElementById("iframe");
                    if (!elemnt) {
                      elemnt = document.getElementById("map");
                    }
                    elemnt = elemnt.offsetTop;
                    window.scrollTo({ top: elemnt - 250, behavior: "smooth" });
                  }}
                >
                  Start quest
                </div>
              </div>
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
      console.log(level.data);
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          levelfromserver:
            level && level.data && level.data.success
              ? level.data.data.level
              : 1,
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
