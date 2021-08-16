import React, { useState } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import Section from "../../components/Quests/Section";
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
                <svg
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.4508 12.2412C13.0996 11.3992 12.5899 10.6344 11.9502 9.98932C11.3125 9.34242 10.557 8.82664 9.72551 8.47048C9.71807 8.46671 9.71062 8.46482 9.70317 8.46105C10.863 7.61307 11.617 6.23178 11.617 4.67337C11.617 2.09171 9.55052 0 7 0C4.44949 0 2.38301 2.09171 2.38301 4.67337C2.38301 6.23178 3.13699 7.61306 4.29683 8.46294C4.28938 8.46671 4.28193 8.46859 4.27449 8.47236C3.44045 8.82852 2.69205 9.3392 2.04977 9.99121C1.41067 10.6367 0.901113 11.4015 0.549245 12.2431C0.203571 13.0671 0.0171405 13.9505 4.65534e-05 14.8455C-0.000450341 14.8656 0.00303479 14.8856 0.0102967 14.9043C0.0175586 14.9231 0.0284503 14.9401 0.04233 14.9545C0.0562097 14.9689 0.0727966 14.9804 0.0911133 14.9882C0.10943 14.996 0.129106 15 0.148982 15H1.266C1.34791 15 1.41307 14.934 1.41493 14.853C1.45216 13.3982 2.02929 12.0358 3.04949 11.0031C4.10507 9.93467 5.50693 9.34673 7 9.34673C8.49308 9.34673 9.89493 9.93467 10.9505 11.0031C11.9707 12.0358 12.5478 13.3982 12.5851 14.853C12.5869 14.9359 12.6521 15 12.734 15H13.851C13.8709 15 13.8906 14.996 13.9089 14.9882C13.9272 14.9804 13.9438 14.9689 13.9577 14.9545C13.9715 14.9401 13.9824 14.9231 13.9897 14.9043C13.997 14.8856 14.0005 14.8656 14 14.8455C13.9813 13.9447 13.797 13.0685 13.4508 12.2412ZM7 7.91457C6.14548 7.91457 5.34123 7.57726 4.73619 6.96482C4.13114 6.35239 3.79789 5.53832 3.79789 4.67337C3.79789 3.80842 4.13114 2.99435 4.73619 2.38191C5.34123 1.76947 6.14548 1.43216 7 1.43216C7.85452 1.43216 8.65877 1.76947 9.26381 2.38191C9.86886 2.99435 10.2021 3.80842 10.2021 4.67337C10.2021 5.53832 9.86886 6.35239 9.26381 6.96482C8.65877 7.57726 7.85452 7.91457 7 7.91457Z"
                    fill="#232323"
                  />
                </svg>
                345 students enrolled
              </div>
              <div className={styles.projects}>
                <svg
                  width="14"
                  height="17"
                  viewBox="0 0 14 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.15875 1.7V1.7001L0.15 15.3C0.15 15.3 0.15 15.3001 0.15 15.3001M0.15875 1.7L0.15 15.3001M0.15875 1.7C0.15875 0.850946 0.867205 0.15 1.75 0.15H8.68914L13.85 5.16341M0.15875 1.7L13.85 5.16341M0.15 15.3001C0.150054 16.1491 0.858488 16.85 1.74125 16.85H12.25C13.1338 16.85 13.85 16.1481 13.85 15.3V5.16341M0.15 15.3001L13.85 5.16341M12.25 15.45H12.4V15.3V5.95V5.8H12.25H8.025V1.7V1.55H7.875H1.75H1.6V1.7V15.3V15.45H1.75H12.25ZM5.97698 11.3023L6.0815 11.4034L6.18577 11.3021L9.79125 7.79962L10.8097 8.789L6.0725 13.3909L3.19067 10.5914L4.21738 9.60103L5.97698 11.3023Z"
                    fill="#232323"
                    stroke="white"
                    stroke-width="0.3"
                  />
                </svg>
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, But also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <p className={styles.heading}>Knowledge Quest Content</p>
            <p className={styles.content}>
              Follow the course content to learn more about Investing.
            </p>
            <div className={styles.section}>
              {demodata.map((section) => (
                <Section data={section} />
              ))}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.buttonwrapper}>
              <div className={styles.bookmarkbutton}>
                <svg
                  width="19"
                  height="26"
                  viewBox="0 0 19 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.1917 9.50065V9.60065H10.2917H12.6667C12.8502 9.60065 13.0261 9.67352 13.1558 9.80324C13.2855 9.93295 13.3584 10.1089 13.3584 10.2923C13.3584 10.4758 13.2855 10.6517 13.1558 10.7814C13.0261 10.9111 12.8502 10.984 12.6667 10.984H10.2917H10.1917V11.084V13.459C10.1917 13.6424 10.1189 13.8184 9.98916 13.9481C9.85945 14.0778 9.68352 14.1507 9.50008 14.1507C9.31664 14.1507 9.14071 14.0778 9.011 13.9481C8.88129 13.8184 8.80841 13.6424 8.80841 13.459V11.084V10.984H8.70841H6.33341C6.14997 10.984 5.97405 10.9111 5.84433 10.7814C5.71462 10.6517 5.64175 10.4758 5.64175 10.2923C5.64175 10.1089 5.71462 9.93295 5.84433 9.80324C5.97405 9.67352 6.14997 9.60065 6.33341 9.60065H8.70841H8.80841V9.50065V7.12565C8.80841 6.94221 8.88129 6.76628 9.011 6.63657C9.14071 6.50686 9.31664 6.43398 9.50008 6.43398C9.68352 6.43398 9.85945 6.50686 9.98916 6.63657C10.1189 6.76628 10.1917 6.94221 10.1917 7.12565V9.50065Z"
                    fill="black"
                    stroke="#F4F5F7"
                    stroke-width="0.2"
                  />
                  <path
                    d="M17.8252 25.1171L17.8254 25.1167L17.8172 25.1123L9.54744 20.6552L9.5 20.6297L9.45256 20.6552L1.18281 25.1123L1.1826 25.1119L1.17485 25.1171C1.07069 25.1864 0.949686 25.2262 0.824717 25.2321C0.699748 25.2381 0.575498 25.2101 0.465199 25.151C0.354901 25.092 0.262686 25.0041 0.198375 24.8968C0.134072 24.7895 0.100074 24.6668 0.1 24.5417C0.1 24.5417 0.1 24.5416 0.1 24.5416L0.1 3.16667C0.1 2.35334 0.423094 1.57332 0.998206 0.998206C1.57332 0.423094 2.35334 0.1 3.16667 0.1H15.8333C16.6467 0.1 17.4267 0.423094 18.0018 0.998206C18.5769 1.57332 18.9 2.35334 18.9 3.16667V24.5416C18.8999 24.6667 18.8659 24.7895 18.8016 24.8968C18.7373 25.0041 18.6451 25.092 18.5348 25.151C18.4245 25.2101 18.3003 25.2381 18.1753 25.2321C18.0503 25.2262 17.9293 25.1864 17.8252 25.1171ZM1.48333 23.0628V23.2284L1.62985 23.1514L9.10794 19.2215L9.10818 19.222L9.11682 19.2163C9.23033 19.1407 9.36365 19.1004 9.5 19.1004C9.63636 19.1004 9.76967 19.1407 9.88318 19.2163L9.88289 19.2167L9.89207 19.2215L17.3701 23.1514L17.5167 23.2284V23.0628V3.16667C17.5167 2.72022 17.3393 2.29206 17.0236 1.97637C16.7079 1.66068 16.2798 1.48333 15.8333 1.48333H3.16667C2.72022 1.48333 2.29206 1.66068 1.97637 1.97637C1.66068 2.29206 1.48333 2.72022 1.48333 3.16667V23.0628Z"
                    fill="black"
                    stroke="#F4F5F7"
                    stroke-width="0.2"
                  />
                </svg>
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
              {democoncepts.map((concept) => {
                return <div className={styles.concept}>{concept}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quests;
