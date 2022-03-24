import React from "react";
import styles from "../../styles/Home/who.module.scss";
import Image from "next/image";
function Who() {
  return (
    <div className={styles.whoSection}>
      <div className={styles.heading}>Who are we ?</div>
      <div className={styles.container}>
        <div className={styles.left}>
          <p>
            Fast Company recently stated, “to change the world, we need a
            generation of new minds equipped with new ways of thinking. Design
            thinking can achieve this.”
          </p>
          <p>
            “Five years from now, over one-third of skills (35%) that are
            considered important in today’s workforce will have changed. Complex
            problem solving, critical thinking, and creativity will be the top
            three skills for future jobs” – World Economic Forum
          </p>
          <p>
            Our landscape is changing, it’s time to prepare our children and
            teens for the future.
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.imageblock}>
            <div className={styles.green}></div>
            <div className={styles.white}></div>
            <div className={styles.yellow}></div>
            <Image
              src="https://i.ibb.co/LRc6Jsp/shutterstock-1136939339-min.jpg"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Who;
