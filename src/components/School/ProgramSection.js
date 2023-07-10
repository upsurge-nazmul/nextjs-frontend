import React from "react";
import styles from "../../styles/schools/program.module.scss";
import Image from "next/image";
// import EntrepreneurshipImg from "../../assets/schools/entrepreneurship.png";
// import GoalsImg from "../../assets/schools/goal.png";
// import SkillsImg from "../../assets/schools/skills.png";
// import BudgetImg from "../../assets/schools/budget.png";

const ProgramSection = () => {
  const programs = [
    {
      name: "Entrepreneurship",
      image:
        "https://imgcdn.upsurge.in/images/schools/new/entrepreneurship.svg",
    },
    {
      name: "Financial literacy",
      image: "https://imgcdn.upsurge.in/images/schools/new/budget.svg",
    },
    {
      name: "Life skills",
      image: "https://imgcdn.upsurge.in/images/schools/new/skills.svg",
    },
    {
      name: "Career Development",
      image: "https://imgcdn.upsurge.in/images/schools/new/goal.svg",
    },
    {
      name: "Internships",
      image: "https://imgcdn.upsurge.in/images/schools/new/internships.svg",
    },
  ];
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Programs We Offer</h2>
      <div className={styles.innerContainer}>
        {programs.map((item, index) => (
          <div key={"program-card-" + index} className={styles.card}>
            <div className={styles.imageContainer}>
              <Image
                src={item.image}
                priority
                width={90}
                height={90}
                alt={item.name}
              />
            </div>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramSection;
