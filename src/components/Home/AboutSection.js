import React from "react";
import doodleLeft1 from "../../assets/about/doodle_l_1.png";
import doodleLeft2 from "../../assets/about/doodle_l_2.png";
import doodleLeft3 from "../../assets/about/doodle_l_3.png";
import doodleRight1 from "../../assets/about/doodle_r_1.png";
import doodleRight2 from "../../assets/about/doodle_r_2.png";
import doodleRight3 from "../../assets/about/doodle_r_3.png";
import styles from "../../styles/Home/aboutsection.module.scss";

function AboutSection() {
  return (
    <section className={styles.about}>
      <img
        className={`${styles.doodle} ${styles.dl1}`}
        src={doodleLeft1.src}
        alt="asdd"
      />
      <img
        className={`${styles.doodle} ${styles.dl2}`}
        src={doodleLeft2.src}
        alt=""
      />
      <img
        className={`${styles.doodle} ${styles.dl3}`}
        src={doodleLeft3.src}
        alt=""
      />
      <img
        className={`${styles.doodle} ${styles.dr1}`}
        src={doodleRight1.src}
        alt=""
      />
      <img
        className={`${styles.doodle} ${styles.dr2}`}
        src={doodleRight2.src}
        alt=""
      />
      <img
        className={`${styles.doodle} ${styles.dr3}`}
        src={doodleRight3.src}
        alt=""
      />
      <div className={styles.textContent}>
        <p className={styles.subheading}>
          “Concepts learned in games help children understand cause and effect,
          make mistakes and get rewarded for smart choices.”
        </p>
        <div className={styles.subheading2}>- Mr. Money Moustache</div>
      </div>
    </section>
  );
}

export default AboutSection;
