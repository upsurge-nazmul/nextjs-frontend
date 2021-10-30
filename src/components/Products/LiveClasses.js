import React from "react";
import styles from "../../styles/Products/classes.module.scss";
import Image from "next/image";
export default function LiveClasses({ id }) {
  return (
    <div className={styles.liveClasses} id={id}>
      <div className={styles.top}>
        <div className={styles.heading}>Live Classes</div>
        <div className={styles.subheading}>
          Live online classes designed and taught by our co-founders and panel
          of experts on various important topics around personal finance, career
          development and entrepreneurship. <br />
          Designed by experiential learning professionals, these classes are
          fun, engaging and effective!
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.liveclassimg}>
          <Image
            layout="fill"
            objectFit="contain"
            src="https://i.ibb.co/WFBWc53/liveclass.png"
            alt=""
          />
        </div>
        <div className={styles.hoverimg}>
          <Image
            layout="fill"
            objectFit="contain"
            src="https://i.ibb.co/LxjRv60/liveclassgirl.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
