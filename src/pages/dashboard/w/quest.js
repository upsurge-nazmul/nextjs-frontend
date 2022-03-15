import React, { useEffect, useState } from "react";
import KnowledgeQuestApi from "../../../actions/apis/KnowledgeQuestApi";
import LoginApis from "../../../actions/apis/LoginApis";
import Toast from "../../../components/Toast";
import DashboardLeftPanel from "../../../components/Dashboard/DashboardLeftPanel";
import { useRouter } from "next/dist/client/router";
import styles from "../../../styles/Quest/questpage.module.scss";
import RequestsAndHistorySection from "../../../components/ParentStore/RequestsAndHistorySection";
import LiveClassSection from "../../../components/ParentStore/LiveClassSection";
import AvailablePointsSection from "../../../components/ParentStore/AvailablePointsSection";
import VoucherSection from "../../../components/ParentStore/VoucherSection";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import ApproveModal from "../../../components/ParentStore/ApproveModal";
import AvailableAvatarSection from "../../../components/KidStore/AvailableAvatarSection";
import RequestModal from "../../../components/KidStore/RequestModal";
import ChoreApis from "../../../actions/apis/ChoreApis";
import { useContext } from "react";
import { MainContext } from "../../../context/Main";
import KidDashboardHeader from "../../../components/KidDashboard/KidDashboardHeader";
import PeopleSvg from "../../../components/SVGcomponents/PeopleSvg";
import ProjectSvg from "../../../components/SVGcomponents/ProjectSvg";
import IslandSvg from "../../../components/SVGcomponents/IslandSvg";
import Island2Svg from "../../../components/SVGcomponents/Island2Svg";
import KQBG1 from "../../../components/SVGcomponents/KQBG1";
import BoatSvg from "../../../components/SVGcomponents/BoatSvg";
import QuestQuiz from "../../../components/Quests/QuestQuiz";
import { scrollParentToChild } from "../../../helpers/domHelpers";
const democoncepts = [
  "Investing",
  "Saving",
  "Assets",
  "Credit Cards",
  "Debit Cards",
  "Banking",
  "Money",
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
              <p className={styles.questheading}>Money Quest</p>
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
                {`Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, But also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.`}
              </p>
              <p className={styles.heading}>Knowledge Quest Content</p>
              <p className={styles.content}>
                Follow the course content to learn more about Investing.
              </p>
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
                    Course - Introduction to money
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
                    Money Quiz
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
                    Introduction to Money Management
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
                    Activity/Quiz
                  </p>
                  <BoatSvg
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
                  className={styles.map}
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
              <div className={styles.buttonwrapper}>
                {/* <div className={styles.bookmarkbutton}>
                <BookMarkSvg />
                Bookmark
              </div> */}
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
