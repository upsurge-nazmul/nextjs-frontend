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
      <h2 className={styles.heading}>More About Upsurge </h2>
      <div className={styles.container}>
        <div className={styles.right}>
          <div className={styles.imageblock}>
            <div className={styles.green}></div>
            <div className={styles.white}></div>
            <div className={styles.yellow}></div>
            <video className={styles.video} controls>
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
          <p>
            {`upsurge is India’s 1st learning focussed gaming platform that aims to inspire & empower students with modern skills & knowledge, in a fun & experiential way through games, immersive learning & real rewards. We believe in practical learning and have developed our own curriculum & content in collaboration with entrepreneurs, and experiential learning and financial experts.`}
          </p>
          <p>
            {`Starting with entrepreneurship & money management, critical life skills that are ignored in school, we are here to help elevate the next generation & help them achieve their financial success. In fact, money is taught in schools to children as young as 5 in some countries!`}
          </p>
          <p>
            {`Only 25% of Indians are financially literate, and it is our mission to give wings to a `}
            <b>financial literacy education</b>
            {` & entrepreneurship movement in India by equipping and empowering the youth. The world as we know it is evolving, and the earlier we equip our children with these skills, the better!`}
          </p>
          <p>OR</p>
          <p>
            {`upsurge is India's first learning-focused gaming platform that uses games, immersive learning, and tangible rewards to motivate and equip students with contemporary skills and knowledge in a fun and engaging way. `}
          </p>
          <p>
            {`We firmly believe that kids should not become a bookworm rather they should learn by doing. We are here to help elevate the next generation and assist them in achieving their financial success.`}
          </p>
          <p>
            {`We’re on a mission to equip and empower the youth in order to launch a financial literacy and entrepreneurship movement in India. `}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Who;
