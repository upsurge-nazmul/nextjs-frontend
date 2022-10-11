import React from "react";
import styles from "../../styles/Home/jasper.module.scss";
import BottomArrowBubble from "../SVGcomponents/BottomArrowBubble";
import Jasper from "../SVGcomponents/Jasper";
export default function JasperSection() {
  return (
    <>
      <h2 className={styles.header}>A message from Jasper, your friend-cum-mentor at upsurge</h2>
    <div className={styles.jasper}>
      <div className={styles.leftpart}>
        <div className={styles.text}>
          <BottomArrowBubble className={styles.bottomarrow} />
          <h3 className={styles.heading}>{`Hi there, I'm Jasper.`}</h3>
          <p className={styles.subheading}>
            {`Since I am a Unicorn (no, not the billion $$ kind) and so it only
            makes sense that I am the resident money expert here at upsurge. I
            will be your mentor throughout the platform, where children will get
            to understand money, investing, and entrepreneurship like never
            before.`}
          </p>
          <p className={styles.subheading}>
            {`They can go on knowledge quests, play one of the many games
            in the Arena, or earn UniCoins by completing chores. They can then
            redeem the UniCoins they've earned for real prizes from brands they
            (and you) love!`}
          </p>
        </div>
      </div>
      <div className={styles.rightpart}>
        <Jasper className={styles.jasperimg} />
      </div>
    </div>
            </>
  );
}
