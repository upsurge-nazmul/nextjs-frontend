import React from "react";
import styles from "../../styles/Home/jasper.module.scss";
import BottomArrowBubble from "../SVGcomponents/BottomArrowBubble";
import BubbleSvg from "../SVGcomponents/BubbleSvg";
import Jasper from "../SVGcomponents/Jasper";
export default function JasperSection() {
  return (
    <div className={styles.jasper}>
      <div className={styles.leftpart}>
        <div className={styles.text}>
          <BottomArrowBubble className={styles.bottomarrow} />
          <p className={styles.heading}>{`Hi there, I'm Jasper.`}</p>
          <p className={styles.subheading}>
            I am here to tell you about Upsurge, a platform for young learners
            that will help them understand money, investing, and
            entrepreneurship like never before.
          </p>
          <p className={styles.subheading}>
            {`They can go on knowledge quests, play one of the many games in the
            Arena, or earn UniCoins by completing chores. They can then redeem
            the UniCoins they've earned for real prizes!`}
          </p>
        </div>
        <BubbleSvg className={styles.bubble} />
      </div>
      <Jasper className={styles.jasperimg} />
    </div>
  );
}
