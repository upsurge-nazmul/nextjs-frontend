import React from "react";
import styles from "../../styles/Benefits/experimential.module.scss";
import GeoObjectsSvg from "../SVGcomponents/GeoObjectsSvg";
export default function Experimential({ id }) {
  return (
    <div className={styles.main} id={id}>
      <GeoObjectsSvg className={styles.geo} />
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.text}>I hear and I forget,</p>{" "}
          <p className={styles.text}>I see and I remember,</p>{" "}
          <p className={styles.text}>
            I do and <strong>I understand.</strong>
          </p>
        </div>
        <div className={styles.right}>
          <p className={styles.heading}>Learning by doing</p>
          <p className={styles.subheading}>
            {`We believe that learning is most effective when it’s through play! Our games, activities and quizzes will instill in your children, healthy money habits that will last a lifetime.`}
          </p>
        </div>
      </div>
    </div>
  );
}
