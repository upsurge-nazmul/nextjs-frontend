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
    title: "What is Money?",
    chaptersandweeks: "",
    chapters: [
      {
        chapterno: 1,
        title: "Origins & Barter System",
        completion: "100%",
        remainingtime: "",
      },
      {
        chapterno: 2,
        title: "Kiara’s budget trip",
        completion: "40%",
        remainingtime: "",
      },
      {
        chapterno: 3,
        title: "Quiz",
        completion: "40%",
        remainingtime: "",
      },
      {
        chapterno: 4,
        title: "Activity",
        completion: "40%",
        remainingtime: "",
      },
    ],
  },
  {
    sectionno: 2,
    title: "Banking & Payments",
    chaptersandweeks: "",
    chapters: [
      {
        chapterno: 1,
        title: "Introduction to Banking",
        completion: "60%",
        remainingtime: "",
      },
      {
        chapterno: 2,
        title: "Credit & Debit Cards",
        completion: "40%",
        remainingtime: "",
      },
      {
        chapterno: 3,
        title: "Digital Payments & UPI",
        completion: "40%",
        remainingtime: "",
      },
    ],
  },
  {
    sectionno: 3,
    title: "Introduction to Personal Finance",
    chaptersandweeks: "",
    chapters: [
      {
        chapterno: 1,
        title: "What is money management?",
        completion: "60%",
        remainingtime: "Know about currencies",
      },
      {
        chapterno: 2,
        title: "Earning",
        completion: "40%",
        remainingtime: "",
      },
      {
        chapterno: 3,
        title: "Spending & Budgeting",
        completion: "40%",
        remainingtime: "",
      },
      {
        chapterno: 4,
        title: "Saving & Goal setting",
        completion: "40%",
        remainingtime: "",
      },
      {
        chapterno: 5,
        title: "Investing & Compounding your wealth",
        completion: "40%",
        remainingtime: "",
      },
      {
        chapterno: 6,
        title: "Insurance & Taxes",
        completion: "40%",
        remainingtime: "",
      },
    ],
  },
  {
    sectionno: 4,
    title: "Entrepreneurship",
    chaptersandweeks: "",
    chapters: [
      {
        chapterno: 1,
        title: "Starting up",
        completion: "60%",
        remainingtime: "",
      },
      {
        chapterno: 2,
        title: "Finding the next big thing",
        completion: "40%",
        remainingtime: "",
      },
      {
        chapterno: 3,
        title: "Growing your business",
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
