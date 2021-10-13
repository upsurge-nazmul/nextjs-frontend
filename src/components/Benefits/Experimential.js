import React from "react";
import styles from "../../styles/Benefits/experimential.module.scss";
export default function Experimential({ id }) {
  return (
    <div className={styles.main} id={id}>
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.heading}>Learning by doing</p>
          <p className={styles.subheading}>
            {`Through games, simulators and activities that have been designed by our experiential learning experts, children are able to experience the importance of money management in a virtual environment. 

Playing games reinforces the concepts that the child has learned, and at the same time brings an element of fun to financial literacy and entrepreneurship. And we all know that children learn best when they are having fun!
`}
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.imageblock}>
            <div className={styles.green}></div>
            <div className={styles.white}></div>
            <div className={styles.yellow}></div>
            <img src="https://i.ibb.co/SctFDz6/Untitled-design-24.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
