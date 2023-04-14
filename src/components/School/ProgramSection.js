import React from "react";
import styles from "../../styles/schools/program.module.scss";
import Image from "next/image";
import EntrepreneurshipImg from "../../assets/schools/entrepreneurship.png";
import GoalsImg from "../../assets/schools/goal.png";
import SkillsImg from "../../assets/schools/skills.png";
import BudgetImg from "../../assets/schools/budget.png";

const ProgramSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <h2 className={styles.heading}>
          India&apos;s first <br />
          financial program
        </h2>
        <div className={styles.button}>
          <p>Start learning</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.card}>
          <Image src={EntrepreneurshipImg} width={80} height={80} alt=" " />
          <p>Entrepreneurship</p>
        </div>
        <div className={styles.card}>
          <Image src={BudgetImg} width={80} height={80} alt=" " />
          <p>Financial literacy</p>
        </div>
        <div className={styles.card}>
          <Image src={SkillsImg} width={80} height={80} alt=" " />
          <p>Life skills</p>
        </div>
        <div className={styles.card}>
          <Image src={GoalsImg} width={80} height={80} alt=" " />
          <p>Goals</p>
        </div>
      </div>
    </div>
  );
};

export default ProgramSection;
