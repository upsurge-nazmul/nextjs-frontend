import React from "react";
import styles from "../../styles/Benefits/entrepreneuership.module.scss";
export default function Entrepreneuership({ id }) {
  return (
    <div className={styles.main} id={id}>
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.heading}>From thinker to founder</p>
          <p className={styles.subheading}>
            {`Lorem Ipsum has been the industry's standard dummy text ever since
    the 1500s, when an unknown printer took a galley of type and
    scrambled it to make a type specimen book. It has survived not only
    five centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged. It was popularised in the 1960s
    with the release of Letraset sheets containing Lorem Ipsum passages,
    and more recently with desktop publishing software like Aldus
    PageMaker including versions of Lorem Ipsum.`}
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.imageblock}>
            <div className={styles.green}></div>
            <div className={styles.white}></div>
            <div className={styles.yellow}></div>
            <img src="https://i.ibb.co/gdj2Bry/Untitled-design-25.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
