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
            Upsurge is India’s first financial literacy and entrepreneurship
            development platform for the 8 to 18 year-olds. These are critical
            life skills that are being ignored in school and college, and we are
            here to change that!
          </p>
          <p>
            Only 25% of Indians are financially literate, and it is our mission
            to ensure that the next generation is equipped to not only manage
            their money effectively, but also invest it, grow their wealth and
            achieve their financial goals.
          </p>
          <p>
            We believe in practical learning and have developed our own
            curriculum & games to teach real-world finance and entrepreneurship
            in a fun, relevant, and rewarding way.
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.imageblock}>
            <div className={styles.green}></div>
            <div className={styles.white}></div>
            <div className={styles.yellow}></div>
            <Image
              src="https://i.ibb.co/xhM7W8k/Untitled-design-77.png"
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
