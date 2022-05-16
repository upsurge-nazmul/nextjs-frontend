import React, { useContext } from "react";
import styles from "../../styles/Benefits/financial.module.scss";
import Image from "next/image";
import { MainContext } from "../../context/Main";
export default function Financial({ id }) {
  const { theme } = useContext(MainContext);
  return (
    <div
      className={`${styles.main} ${theme === "dark" && styles.darkmain}`}
      id={id}
    >
      <div className={styles.container}>
        <div className={styles.green}></div>
        <div className={styles.blue}></div>
        <div className={styles.white}></div>
        <div className={styles.yellow}></div>
        <div className={styles.left}>
          <p className={styles.heading}>
            Kickstart your child’s financial journey
          </p>
          <p className={styles.subheading}>
            {`Kickstart your child’s financial and entrepreneurial journey with our proprietary product designed by finance professionals, 3x entrepreneurs, and experiential learning experts. Kids will learn through our curated interactive content and then apply these learnings to fun games to learn. Games will have weekly and monthly leaderboards to motivate children and give them a chance to win rewards.`}
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.imageblock}>
            <div className={styles.wrap}>
              <Image
                layout="fill"
                objectFit="cover"
                src="https://i.ibb.co/Sd5LLFV/1920-x-1080-px.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
