import React, { useState } from "react";
import styles from "../../styles/Products/quest.module.scss";
import Petal2SvgQuest from "../SVGcomponents/Petal2SvgQuest";
import PetalSvgQuest from "../SVGcomponents/PetalSvgQuest";

export default function KnowledgeQuest({ id, email, setEmail, check, error }) {
  const [showinput, setshowinput] = useState(false);
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
  return (
    <div className={styles.questSection}>
      <img src="/images/benefits_quest.png" alt="" />
      <img className={styles.kidimg} src="/images/benefitquestkid.png" alt="" />
      <PetalSvgQuest className={styles.petal} />
      <Petal2SvgQuest className={styles.petal2} />
      <div className={styles.textcontainer}>
        <div className={styles.heading}>Knowledge Quest</div>
        <div className={styles.subheading}>
          A collection of guided lessons that help your child learn the basics
          of finance by learning from the experts.
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
          {showinput && (
            <input
              className={styles.input}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          {!showinput ? (
            <div
              className={styles.joinButton}
              onClick={() => setshowinput(true)}
            >
              Join the waitlist
            </div>
          ) : (
            <div className={styles.button} onClick={check}>
              Join
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
