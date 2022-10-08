import React, { useContext } from "react";
import styles from "../../styles/Home/who.module.scss";
import Image from "next/image";
import { MainContext } from "../../context/Main";
function Who() {
  const { theme } = useContext(MainContext);
  return (
    <div
      className={`${styles.whoSection} ${
        theme === "dark" && styles.darkwhoSection
      }`}
    >
      <h2 className={styles.heading}>Financial Literacy for students, made super-easy with upsurge</h2>
      <div className={styles.container}>
        <div className={styles.right}>
          <div className={styles.imageblock}>
            <div className={styles.green}></div>
            <div className={styles.white}></div>
            <div className={styles.yellow}></div>
            <video className={styles.video} controls autoPlay muted loop>
              <source src="/intro.mp4" type="video/mp4"></source>
            </video>
            {/* 
            <Image
              className={styles.image}
              src="https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/home_who.jpeg"
              alt=""
              layout="fill"
              objectFit="cover"
            /> */}
          </div>
        </div>
        <div className={styles.left}>
        </div>
      </div>
    </div>
  );
}

export default Who;
