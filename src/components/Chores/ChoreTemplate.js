import React from "react";
import styles from "../../styles/Chores/choretemplate.module.scss";

function ChoreTemplate() {
  const demotemplate = {
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/yucca-cane-plant-in-a-pot-on-a-white-background-royalty-free-image-1580856558.jpg?crop=0.91771xw:1xh;center,top&resize=480:*",
    name: "Water Plants",
    time: "Daily Chore",
  };
  return (
    <div className={styles.choreTemplate}>
      <img src={demotemplate.image} alt="" className={styles.userimg} />
      <div className={styles.nameandpoints}>
        <p className={styles.name}>{demotemplate.name}</p>
        <p className={styles.points}>{demotemplate.time}</p>
      </div>
      <div className={styles.assignbutton}>Assign</div>
    </div>
  );
}

export default ChoreTemplate;
