import React from "react";
import styles from "../../styles/Courses/coursecontent.module.scss";
function CourseContent() {
  let domo = ["Planning", "Money", "Investing"];
  return (
    <div className={styles.coursecontent}>
      <img
        src="https://imgcdn.upsurge.in/images/unsp/photo-1618424181497-157f25b6ddd5.jpg"
        alt=""
      />
      <p className={styles.type}>Challenge</p>
      <p className={styles.title}>Plan your Savings</p>
      <div className={styles.content}>
        {domo.map((item, index) => {
          return <p key={"content" + index}>{item}</p>;
        })}
      </div>
      <p className={styles.description}>
        Learn the basics of saving and planning your investments from our top
        experts.
      </p>
    </div>
  );
}

export default CourseContent;
