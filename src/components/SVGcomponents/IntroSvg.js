import React from "react";
import styles from "../../styles/GeneralComponents/intro.module.scss";
import Image from "next/image";
export default function IntroSvg({ className, onClick, clr }) {
  return (
    <div className={styles.intro}>
      <div className={styles.background}></div>
      <div className={styles.dashboard}>
        <div className={styles.wrapper}>
          <Image
            priority
            src="https://i.ibb.co/FmynNnH/dashboard.png"
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
            src="https://i.ibb.co/R9LxyYJ/phone.png"
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
            src="https://i.ibb.co/ykTYZdy/Card-1.png"
            alt=""
            layout="fill"
            placeholder="blur"
            blurDataURL="https://i.ibb.co/ykTYZdy/Card-1.png"
            priority
            objectFit="contain"
          />
        </div>
      </div>
      <div className={styles.card2}>
        <div className={styles.wrapper}>
          <Image
            placeholder="blur"
            src="https://i.ibb.co/TYgb3dQ/Card-2.png"
            blurDataURL="https://i.ibb.co/TYgb3dQ/Card-2.png"
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
