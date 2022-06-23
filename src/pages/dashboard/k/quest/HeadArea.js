import React, { useEffect, useState } from "react";
import styles from "../../../../styles/knowledgeQuest/Head.module.scss";

const democoncepts = [
  "Money",
  "Currency",
  "Banking",
  "Payments",
  "Money Management",
  "Quiz",
  "Activity",
];

export default function HeadArea({}) {
  return (
    <div className={styles.headSection}>
      <div className={styles.mainhead}>
        <img
          src="https://i.ibb.co/XpQ4TYc/6-L4pbu-K66d3-80-DX634-DY634-CX494-CY497.png"
          alt=""
        />
        <div className={styles.right}>
          <p className={styles.questheading}>upsurge Quest</p>
          <p className={styles.age}>Age 10-16</p>
        </div>
        <div className={styles.creditandweeks}>
          <p className={styles.credits}>1000 UniCoins</p>
        </div>
      </div>
      <div className={styles.infoSection}>
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
      </div>
    </div>
  );
}
