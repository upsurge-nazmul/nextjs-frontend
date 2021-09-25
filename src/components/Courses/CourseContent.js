import React from "react";
import styles from "../../styles/Courses/coursecontent.module.scss";
function CourseContent() {
  let domo = ["Planning", "Money", "Investing"];
  return (
    <div className={styles.coursecontent}>
      <img
        src="https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
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
