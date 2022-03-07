import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import Section from "../../components/Quests/Section";
import BoatSvg from "../../components/SVGcomponents/boatSvg";
import BookMarkSvg from "../../components/SVGcomponents/BookMarkSvg";
import Island2Svg from "../../components/SVGcomponents/island2Svg";
import KQBG1 from "../../components/SVGcomponents/KQBG1";
import IslandSvg from "../../components/SVGcomponents/islandSvg";
import PeopleSvg from "../../components/SVGcomponents/PeopleSvg";
import ProjectSvg from "../../components/SVGcomponents/ProjectSvg";
import Toast from "../../components/Toast";
import styles from "../../styles/Quest/questhome.module.scss";
import JoinUs from "../../components/Home/JoinUs";
import Footer from "../../components/Home/Footer";

const demodata = [
  {
    sectionno: 1,
    title: "Money",
    chaptersandweeks: "3 Chapters 1 Week",
    chapters: [
      {
        chapterno: 1,
        title: "What is money?",
        completion: "100%",
        remainingtime: "3 Hrs remaining",
      },
      {
        chapterno: 2,
        title: "Why is money needed?",
        completion: "40%",
        remainingtime: "3 Hrs remaining",
      },
      {
        chapterno: 3,
        title: "What was there before money?",
        completion: "50%",
        remainingtime: "3 Hrs remaining",
      },
    ],
  },
  {
    sectionno: 2,
    title: "Money",
    chaptersandweeks: "3 Chapters 1 Week",
    chapters: [
      {
        chapterno: 1,
        title: "What is money?",
        completion: "60%",
        remainingtime: "3 Hrs remaining",
      },
      {
        chapterno: 2,
        title: "Why is money needed?",
        completion: "40%",
        remainingtime: "3 Hrs remaining",
      },
      {
        chapterno: 3,
        title: "What was there before money?",
        completion: "50%",
        remainingtime: "3 Hrs remaining",
      },
    ],
  },
  {
    sectionno: 3,
    title: "Money",
    chaptersandweeks: "3 Chapters 1 Week",
    chapters: [
      {
        chapterno: 1,
        title: "What is money?",
        completion: "60%",
        remainingtime: "3 Hrs remaining",
      },
      {
        chapterno: 2,
        title: "Why is money needed?",
        completion: "40%",
        remainingtime: "3 Hrs remaining",
      },
      {
        chapterno: 3,
        title: "What was there before money?",
        completion: "50%",
        remainingtime: "3 Hrs remaining",
      },
    ],
  },
];
const democoncepts = [
  "Investing",
  "Saving",
  "Assets",
  "Mutual Funds",
  "Investing",
  "Saving",
  "Assets",
  "Mutual Funds",
];
export default function Quest() {
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [mode, setmode] = useState("map");
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [stickyheader, setstickyheader] = useState(false);
  const [showpopup, setshowpopup] = useState(false);
  const [showauth, setshowauth] = useState(false);
  const [currentlevel, setcurrentlevel] = useState(1);
  const router = useRouter();
  useEffect(() => {
    let level = localStorage.getItem("kq-money-level");
    if (level) {
      setcurrentlevel(level);
    }
  }, []);
  useEffect(() => {
    const handlescroll = () => {
      if (window.scrollY > 0) {
        setstickyheader(true);
      } else {
        setstickyheader(false);
      }
    };
    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, []);
  return (
    <div className={styles.questPage}>
      <Toast data={toastdata} />
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        stickyheader={stickyheader}
        setshowauth={setshowauth}
        setshowpopup={setshowpopup}
        showpopup={showpopup}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <div className={styles.mainContent}>
        <div className={styles.mainhead}>
          <img
            src="https://i.ibb.co/XpQ4TYc/6-L4pbu-K66d3-80-DX634-DY634-CX494-CY497.png"
            alt=""
          />
          <div className={styles.right}>
            <p className={styles.questheading}>Money Quest</p>
            <p className={styles.age}>Age 10-12</p>
            <div className={styles.details}>
              <div className={styles.students}>
                <PeopleSvg />
                345 students enrolled
              </div>
              <div className={styles.projects}>
                <ProjectSvg />
                37 published projects
              </div>
            </div>
          </div>
          <div className={styles.creditandweeks}>
            <p className={styles.weeks}>3 weeks</p>
            <p className={styles.credits}>430 Credits Required</p>
          </div>
        </div>
        <div className={styles.maincontent}>
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
            {mode === "map" ? (
              <div className={styles.map} id="map">
                <KQBG1 className={styles.bg} />
                <div
                  className={styles.island1}
                  onClick={() => setmode("bankvisit")}
                >
                  <div className={styles.container}>
                    {currentlevel == 1 && <BoatSvg className={styles.boat} />}
                    <p className={styles.title}>
                      Olivia&#8217;s Visit to the Bank
                    </p>
                    <IslandSvg />
                  </div>
                </div>
                <div
                  className={`${styles.island2} ${
                    currentlevel == 1 && styles.island2disabled
                  }`}
                  onClick={() => {
                    if (currentlevel == 1) {
                      settoastdata({
                        show: true,
                        msg: "Please complete first chapter before continuing.",
                        type: "error",
                      });
                      return;
                    }
                    setmode("KnowingYourMoney");
                  }}
                >
                  <div className={styles.container}>
                    {currentlevel == 2 && <BoatSvg className={styles.boat} />}

                    <p className={styles.title}>Knowing Your Money</p>
                    <Island2Svg />
                  </div>
                </div>
              </div>
            ) : (
              <iframe
                id="iframe"
                className={styles.map}
                src={
                  mode === "KnowingYourMoney"
                    ? "/quests/KnowingYourMoney/story.html"
                    : "/quests/bankvisit/story.html"
                }
              ></iframe>
            )}
            {mode !== "map" && (
              <div className={styles.buttons}>
                <div className={styles.button} onClick={() => setmode("map")}>
                  Go back
                </div>
                <div
                  className={styles.button}
                  onClick={() => {
                    if (mode === "bankvisit") {
                      setcurrentlevel(2);
                      localStorage.setItem("kq-money-level", 2);
                    }
                    setmode("map");
                  }}
                >
                  Done
                </div>
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
                  setmode("bankvisit");
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
              <div className={styles.section}>
                <p className={styles.number}>34</p>
                <p className={styles.name}>session</p>
              </div>
              <div className={styles.section}>
                <p className={styles.number}>4</p>
                <p className={styles.name}>projects</p>
              </div>
              <div className={styles.section}>
                <p className={styles.number}>3</p>
                <p className={styles.name}>challenges</p>
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
      <JoinUs />
      <Footer />
    </div>
  );
}
