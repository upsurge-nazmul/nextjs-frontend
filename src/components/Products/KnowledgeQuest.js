import React, { useContext, useState } from "react";
import styles from "../../styles/Products/quest.module.scss";
import WaitlistPopUp from "../WaitlistPopUp";
import { MainContext } from "../../context/Main";
import { useRouter } from "next/dist/client/router";

export default function KnowledgeQuest({
  id,
  email,
  setEmail,
  check,
  error,
  showwaitlistblock,
  settoastdata,
  setshowwaitlistblock,
  authmode,
  setauthmode,
  setshowauth,
  setshowpopup,
}) {
  // const democoncepts = [
  //   "Money",
  //   "Entrepreneurship",
  //   "Earning",
  //   "Saving",
  //   "Spending",
  //   "Budgeting",
  //   "Investing",
  //   "Borrowing",
  //   "Insurance",
  //   "Banking",
  //   "Payments",
  //   "Stock Markets",
  //   "Real Estate",
  //   "Gold",
  //   "Retirement Funds",
  //   "Career Development",
  // ];
  const { theme, userdata } = useContext(MainContext);
  const router = useRouter();

  return (
    <div
      className={`${styles.questSection} ${
        theme === "dark" && styles.darkquestSection
      }`}
    >
      {showwaitlistblock && (
        <WaitlistPopUp
          email={email}
          setemail={setEmail}
          settoastdata={settoastdata}
          setshowpopup={setshowwaitlistblock}
        />
      )}

      <div className={styles.textcontainer}>
        <h1 className={styles.heading}>
          Financial Literacy <br />
          Courses for Kids
        </h1>
        <div className={styles.subheading}>
          <b>Interactive courses</b> that cover fundamentals of{" "}
          <b>
            finance, including earning, budgeting, saving, investing, and
            entrepreneurship
          </b>
          .
        </div>
        <div className={styles.subheading}>
          These bite-sized courses are about 10 minutes each and include
          exercises, <b>real-life examples</b> and short <b>quizzes</b> to make
          sure that the child understands the concepts.
        </div>
        <div className={styles.mobileVideo}>
          <div className={styles.wrap}>
            <video
              className={styles.video}
              controls
              muted
              loop
              poster="https://imgcdn.upsurge.in/images/pricing-video-picture.png"
            >
              <source src="/intro.mp4" type="video/mp4"></source>
            </video>
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.section}>
            <p className={styles.number}>60</p>
            <p className={styles.name}>courses</p>
          </div>
          <div className={styles.section}>
            <p className={styles.number}>12</p>
            <p className={styles.name}>projects</p>
          </div>
          <div className={styles.section}>
            <p className={styles.number}>70</p>
            <p className={styles.name}>challenges</p>
          </div>
        </div>
        <div className={styles.signupBox}>
          {!userdata ? (
            <div
              className={styles.joinButton}
              onClick={() => {
                // setauthmode("parent");
                setshowpopup(true);
              }}
            >
              Start FREE trial
            </div>
          ) : (
            <div
              className={styles.joinButton}
              onClick={() => {
                if (userdata) {
                  if (userdata.is_waiting_active) {
                    router.push("/dashboard/w");
                  } else if (userdata.user_type === "parent") {
                    router.push("/dashboard/p");
                  } else {
                    router.push("/dashboard/k");
                  }
                  return;
                }
              }}
            >
              Go to Dashboard
            </div>
          )}
        </div>
      </div>

      <div className={styles.lap}>
        <div className={styles.wrap}>
          <video
            className={styles.video}
            controls
            muted
            loop
            poster="https://imgcdn.upsurge.in/images/pricing-video-picture.png"
          >
            <source src="/intro.mp4" type="video/mp4"></source>
          </video>
        </div>
      </div>
    </div>
  );
}
