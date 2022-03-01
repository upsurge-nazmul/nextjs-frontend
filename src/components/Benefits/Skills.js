import React from "react";
import styles from "../../styles/Benefits/skills.module.scss";
import Image from "next/image";
export default function Skills({ id }) {
  return (
    <div className={styles.main} id={id}>
      <div className={styles.container}>
        <div className={styles.green}></div>
        <div className={styles.blue}></div>
        <div className={styles.white}></div>
        <div className={styles.yellow}></div>
        <div className={styles.left}>
          <p className={styles.heading}>
            Develop critical 21st-century skills & knowledge
          </p>
          <p className={styles.subheading}>
            {`While jobs & roles change with time, the skills needed to succeed remain the same. Our knowledge quests & games aim to not only help students understand money management and entrepreneurship, but also help inculcate skills that are critical to their success as adults. Our learning methodology helps develop real-world problem-solving, critical thinking, and analytical abilities while giving students the confidence to step out of their comfort zone `}
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.imageblock}>
            <div className={styles.wrap}>
              <Image
                layout="fill"
                objectFit="cover"
                src="https://i.ibb.co/X49spvn/1280-1280-x-720-px-5.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
