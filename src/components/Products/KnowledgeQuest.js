import React, { useContext, useState } from "react";
import styles from "../../styles/Products/quest.module.scss";
import Curve1 from "../SVGcomponents/Curve1";
import Curve2 from "../SVGcomponents/Curve2";
import Petal2SvgQuest from "../SVGcomponents/Petal2SvgQuest";
import PetalSvgQuest from "../SVGcomponents/PetalSvgQuest";
import Image from "next/image";
import WaitlistPopUp from "../WaitlistPopUp";
import { MainContext } from "../../context/Main";
import { useRouter } from "next/dist/client/router";
import { motion } from "framer-motion";

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
  const democoncepts = [
    "Money",
    "Entrepreneurship",
    "Earning",
    "Saving",
    "Spending",
    "Budgeting",
    "Investing",
    "Borrowing",
    "Insurance",
    "Banking",
    "Payments",
    "Stock Markets",
    "Real Estate",
    "Gold",
    "Retirement Funds",
    "Career Development",
  ];
  const { theme, userdata } = useContext(MainContext);
  const router = useRouter();

  return (
    <div
      className={`${styles.questSection} ${
        theme === "dark" && styles.darkquestSection
      }`}
    >
      <Curve1 className={styles.curve1} />
      <Curve2 className={styles.curve2} />
      {showwaitlistblock && (
        <WaitlistPopUp
          email={email}
          setemail={setEmail}
          settoastdata={settoastdata}
          setshowpopup={setshowwaitlistblock}
        />
      )}
      <div className={styles.lap}>
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          transition={{ x: { duration: 0.4 } }}
          className={styles.wrap}
        >
          <Image
            layout="fill"
            objectFit="contain"
            src="https://imgcdn.upsurge.in/images/Group-232.png"
            alt=""
          />
        </motion.div>
      </div>

      {/* <div className={styles.kidimg}>
        <div className={styles.wrap}>
          <Image
            layout="fill"
            objectFit="contain"
            src="https://imgcdn.upsurge.in/images/1280-1280-x-720-px-3.png"
            alt=""
          />
        </div>
      </div> */}
      <div className={styles.green} />
      <div className={styles.yellow} />
      <PetalSvgQuest className={styles.petal} />
      <Petal2SvgQuest className={styles.petal2} />
      <div className={styles.textcontainer}>
        <div className={styles.heading}>Knowledge quests</div>
        <div className={styles.subheading}>
          {`Interactive courses that cover fundamentals of finance, including
          earning, budgeting, saving, investing, and entrepreneurship.`}
        </div>
        <div className={styles.subheading}>
          {`These bite-sized courses are about 10 minutes each and include
          exercises, real-life examples and short quizzes to make sure that the
          child understands the concepts.`}
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
        <p className={styles.secondheading}>Concepts Covered</p>
        <div className={styles.conceptswrapper}>
          {democoncepts.map((concept, index) => {
            return (
              <div className={styles.concept} key={"concept" + index}>
                {concept}
              </div>
            );
          })}
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
              Join early access
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
    </div>
  );
}
