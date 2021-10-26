import React from "react";
import styles from "../../styles/Benefits/entrepreneuership.module.scss";
export default function Entrepreneuership({ id }) {
  return (
    <div className={styles.main} id={id}>
      <div className={styles.container}>
        <div className={styles.green}></div>
        <div className={styles.blue}></div>
        <div className={styles.white}></div>
        <div className={styles.yellow}></div>
        <div className={styles.left}>
          <p className={styles.heading}>Developing entrepreneurial mindsets</p>
          <p className={styles.subheading}>
            {`Through the course, we will equip your children with the necessary skills and knowledge to understand and evaluate the fundamentals of business and starting-up, and (hopefully) be the next unicorn founder.`}
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.imageblock}>
            <img src="https://i.ibb.co/gdj2Bry/Untitled-design-25.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
