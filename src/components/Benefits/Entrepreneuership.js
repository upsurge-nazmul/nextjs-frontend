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
          <p className={styles.heading}>From thinker to founder</p>
          <p className={styles.subheading}>
            {`Introduce young learners to the basics of starting and running a business in a fun and engaging way, definitely not the way it's taught in schools! We offer a practical program that will ignite your child’s entrepreneurial spark and empower them with the tools and knowledge to start their own business! Who knows, they might be the next unicorn founder in the news`}
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
