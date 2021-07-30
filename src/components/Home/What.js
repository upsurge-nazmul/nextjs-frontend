import React from "react";
import img1 from "../../assets/how/1.png";
import styles from "../../styles/Home/what.module.scss";

function What() {
  return (
    <div className={styles.whatSection}>
      <div className={styles.outside_green}></div>
      <div className={styles.outside_green2}></div>
      <div className={styles.outside_yellow}></div>
      <div className={styles.outside_blue}></div>
      <div className={styles.outside_red}></div>
      <div className={styles.heading}>
        <span className={styles.highlight}>
          What <div className={styles.underline}></div>{" "}
        </span>
        it does ?
      </div>
      <div className={styles.middle}>
        <div className={styles.left}>
          <div className={styles.circle}>
            <img src={img1.src} alt="" />
            <div className={styles.blue}></div>
            <div className={styles.red}></div>
            <div className={styles.yellow}></div>
          </div>
        </div>
        <div className={styles.right}>
          <p className={styles.details}>
            Children will understand how money is earned,{" "}
            <span>how to budget and spend wisely</span> and most importantly,{" "}
            <span>how to save, invest and grow their wealth.</span>
          </p>
          <p className={styles.details}>
            They understand how to build careers - the steps they will need to
            take to become successful professionals
          </p>
          <p className={styles.details}>
            Instill an entrepreneurial perspective in children, to{" "}
            <span>
              evaluate ideas, take ownership and understand how businesses are
              set up and grown.
            </span>
          </p>
        </div>
      </div>
      {/* <div className={styles.bottom}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={`${styles.dot} ${styles.current}`}></div>
      </div> */}
    </div>
  );
}

export default What;
