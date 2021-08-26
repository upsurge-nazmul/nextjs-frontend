import React from "react";
import styles from "../../styles/Courses/courseComponent.module.scss";
import ClockSvg from "../SVGcomponents/ClockSvg";
import MenuSvg from "../SVGcomponents/MenuSvg";

function CoursesComponent({ data }) {
  return (
    <div className={styles.CoursesComponent}>
      <img src={data?.img_url} alt="" className={styles.kidimg} />
      <div className={styles.text}>
        <p className={styles.heading}>{data?.current_course}</p>
        <p className={styles.subheading}>Assigned to Pulkit</p>
      </div>
      <div className={styles.courseProgression}>
        <div className={styles.progressBar}>
          <div
            className={styles.completion}
            style={{ width: `${data?.course_progress}%` }}
          ></div>
        </div>
        <div className={styles.progressText}>
          <ClockSvg />
          <p>{100 - data?.course_progress + "% Left"}</p>
        </div>
      </div>
      <div className={styles.button}>View Progress</div>
      <div className={styles.more}>
        <MenuSvg />
      </div>
    </div>
  );
}

export default CoursesComponent;
