import React from "react";
import styles from "../../styles/Courses/courseComponent.module.scss";

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
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.58065 0.74707C2.95193 0.74707 0 3.55197 0 6.99994C0 10.4479 2.95193 13.2528 6.58065 13.2528C10.2094 13.2528 13.1613 10.4479 13.1613 6.99994C13.1613 3.55197 10.2094 0.74707 6.58065 0.74707ZM9.71031 10.2342C9.60337 10.3358 9.46299 10.387 9.32261 10.387C9.18224 10.387 9.04176 10.3358 8.93492 10.2342L6.19295 7.6289C6.08983 7.53148 6.03229 7.39905 6.03229 7.26051V3.87351C6.03229 3.58537 6.2779 3.35247 6.58065 3.35247C6.88339 3.35247 7.129 3.58537 7.129 3.87351V7.04479L9.71031 9.49743C9.92469 9.70123 9.92469 10.0305 9.71031 10.2342Z"
              fill="#828282"
            />
          </svg>
          <p>{100 - data?.course_progress + "% Left"}</p>
        </div>
      </div>
      <div className={styles.button}>View Progress</div>
      <div className={styles.more}>
        <svg
          width="5"
          height="23"
          viewBox="0 0 5 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="2.5" cy="2.5" r="2.5" fill="#424242" />
          <circle cx="2.5" cy="11.5" r="2.5" fill="#424242" />
          <circle cx="2.5" cy="20.5" r="2.5" fill="#424242" />
        </svg>
      </div>
    </div>
  );
}

export default CoursesComponent;
