import React from "react";
import styles from "../../styles/GeneralComponents/jodoIntro.module.scss";
import Image from "next/image";
export default function JodoIntroSvg({ className, onClick, clr }) {
  return (
    <div className={styles.intro}>
      <div className={styles.background}></div>
      <div className={styles.dashboard}>
        <div className={styles.wrapper}>
          <Image
            priority
            src="https://imgcdn.upsurge.in/images/dashboard.png"
            alt=""
            layout="fill"
            objectFit="contain"
            quality="100"
          />
        </div>
      </div>

      <div className={styles.phone}>
        <div className={styles.wrapper}>
          <Image
            src="https://imgcdn.upsurge.in/images/phone.png"
            alt=""
            layout="fill"
            quality="100"
            priority
            objectFit="contain"
          />
        </div>
      </div>
      <div className={styles.card1}>
        <div className={styles.wrapper}>
          <Image
            src="https://imgcdn.upsurge.in/images/Card-1.png"
            alt=""
            layout="fill"
            placeholder="blur"
            blurDataURL="https://imgcdn.upsurge.in/images/Card-1.png"
            priority
            objectFit="contain"
          />
        </div>
      </div>
      <div className={styles.card2}>
        <div className={styles.wrapper}>
          <Image
            placeholder="blur"
            src="https://imgcdn.upsurge.in/images/Card-2.png"
            blurDataURL="https://imgcdn.upsurge.in/images/Card-2.png"
            alt=""
            layout="fill"
            priority
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
}
