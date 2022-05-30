import React, { useState } from "react";
import DashboardHeader from "../../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import Section from "../../../../components/Quests/Section";
import BookMarkSvg from "../../../../components/SVGcomponents/BookMarkSvg";
import PeopleSvg from "../../../../components/SVGcomponents/PeopleSvg";
import ProjectSvg from "../../../../components/SVGcomponents/ProjectSvg";
import Toast from "../../../../components/Toast";
import styles from "../../../../styles/Quest/quest.module.scss";

const demodata = [
  {
    sectionno: 1,
    title: "Money",
    chaptersandweeks: "",
    chapters: [
      {
        chapterno: 1,
        title: "What is money?",
        completion: "100%",
        remainingtime:
          "Children will understand how & why Money was invented, it’s evolution, and uses",
      },
      {
        chapterno: 2,
        title: "Money Quiz",
        completion: "40%",
        remainingtime: "",
      },
    ],
  },
  {
    sectionno: 2,
    title: "Banking",
    chaptersandweeks: "",
    chapters: [
      {
        chapterno: 1,
        title: "Ira's visit to the bank",
        completion: "60%",
        remainingtime:
          "Let’s go with Ira and her father to the bank and understand the benefits of opening bank accounts",
      },
      {
        chapterno: 2,
        title: "Banking Quiz",
        completion: "40%",
        remainingtime: "",
      },
    ],
  },
  {
    sectionno: 3,
    title: "Payments",
    chaptersandweeks: "",
    chapters: [
      {
        chapterno: 1,
        title: "Kiara's Budget Trip",
        completion: "60%",
        remainingtime: "Know about currencies",
      },
      {
        chapterno: 2,
        title: "Digital Banking & payments",
        completion: "40%",
        remainingtime: "",
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
const availableCourses = [
  {
    name: "upsurge Quest",
    description:
      "This introductory quests takes children through the concepts of money, banking, payments and money management. To progress, you have to complete each chapter, and complete all six to earn the completion badge and 1,000 UniCoins.",
    amount: 3500,
    img_url:
      "https://i.ibb.co/XpQ4TYc/6-L4pbu-K66d3-80-DX634-DY634-CX494-CY497.png",
    id: "upsurge-quest",
  },
];
export default function Quests() {
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
            src="https://i.ibb.co/XpQ4TYc/6-L4pbu-K66d3-80-DX634-DY634-CX494-CY497.png"
            alt=""
          />
          <div className={styles.right}>
            <p className={styles.questheading}>upsurge Quest</p>
            <p className={styles.age}>Age 10-12</p>
          </div>
          <div className={styles.creditandweeks}>
            <p className={styles.credits}>1000 UniCoins</p>
          </div>
        </div>
        <div className={styles.maincontent}>
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
            {/* <div className={styles.buttonwrapper}>
              <div className={styles.bookmarkbutton}>
                <BookMarkSvg />
                Bookmark
              </div>
              <div className={styles.startbutton}>Start quest</div>
            </div> */}
            {/* <div className={styles.details}>
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
