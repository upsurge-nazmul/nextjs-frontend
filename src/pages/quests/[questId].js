import React, { useState } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import Section from "../../components/Quests/Section";
import BookMarkSvg from "../../components/SVGcomponents/BookMarkSvg";
import PeopleSvg from "../../components/SVGcomponents/PeopleSvg";
import ProjectSvg from "../../components/SVGcomponents/ProjectSvg";
import Toast from "../../components/Toast";
import styles from "../../styles/Quest/quest.module.scss";

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
function Quests() {
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [mode, setmode] = useState("Knowledge Quest");

  return (
    <div className={styles.quest}>
      <DashboardLeftPanel />
      <Toast data={toastdata} />
      <div className={styles.contentWrapper}>
        <DashboardHeader mode={mode} setmode={setmode} />
        <div className={styles.mainhead}>
          <img
            src="https://i.pinimg.com/originals/8f/14/57/8f14578ef69a4c53352955d1e072eda6.png"
            alt=""
          />
          <div className={styles.right}>
            <p className={styles.questheading}>
              Personal Finance & Business 101
            </p>
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
            <div className={styles.section}>
              {demodata.map((section, index) => (
                <Section data={section} key={"section" + index} />
              ))}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.buttonwrapper}>
              <div className={styles.bookmarkbutton}>
                <BookMarkSvg />
                Bookmark
              </div>
              <div className={styles.startbutton}>Start quest</div>
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
    </div>
  );
}

export default Quests;
