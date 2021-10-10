import React from "react";
import styles from "../../styles/Products/classes.module.scss";
import PlayCircleSvg from "../SVGcomponents/PlayCircleSvg";

export default function LiveClasses({ id }) {
  return (
    <div className={styles.liveClasses} id={id}>
      <div className={styles.top}>
        <div className={styles.heading}>Live Classes</div>
        <div className={styles.subheading}>
          Learn from the experts in finance in live mentor-led sessions
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <PlayCircleSvg className={styles.lefticon} />
        </div>
        <div className={styles.mid}>
          <div className={styles.container}>
            <img
              src="https://images.unsplash.com/photo-1521133573892-e44906baee46?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmFsbHMlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <p className={styles.heading}>
              The basics of economy: Where does money originate?
            </p>
            <p className={styles.description}>
              This is a sample description of the above element. It can be
              modified as per client needs.
            </p>
            <p className={styles.by}>By Anand Singh</p>
            <div className={styles.button}>Register</div>
          </div>
          <div className={styles.container}>
            <img
              src="https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
              alt=""
            />
            <p className={styles.heading}>
              The basics of economy: Where does money originate?
            </p>
            <p className={styles.description}>
              This is a sample description of the above element. It can be
              modified as per client needs.
            </p>
            <p className={styles.by}>By Anand Singh</p>
            <div className={styles.button}>Register</div>
          </div>
          <div className={styles.container}>
            <img
              src="https://images.unsplash.com/photo-1521133573892-e44906baee46?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmFsbHMlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <p className={styles.heading}>
              The basics of economy: Where does money originate?
            </p>
            <p className={styles.description}>
              This is a sample description of the above element. It can be
              modified as per client needs.
            </p>
            <p className={styles.by}>By Anand Singh</p>
            <div className={styles.button}>Register</div>
          </div>
        </div>
        <div className={styles.right}>
          <PlayCircleSvg className={styles.righticon} />
        </div>
      </div>
    </div>
  );
}
