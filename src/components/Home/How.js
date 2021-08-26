import React from "react";
import styles from "../../styles/Home/how.module.scss";
import HowSvg from "../SVGcomponents/HowSvg";
function How() {
  return (
    <div className={styles.howSection}>
      <div className={styles.heading}>
        How it{" "}
        <span className={styles.highlight}>
          works <div className={styles.underline}></div>{" "}
        </span>
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <HowSvg />
        </div>
        <div className={styles.right}>
          <ul>
            <li>
              Learn through <span> interactive, fun, and experiential </span>
              learning modules.
            </li>
            <li>
              Play fun games that <span>test your knowledge</span> and compete
              with your friends for prizes.
            </li>
            <li>
              Challenge your kids to fun <span>quizzes and games</span>, and
              track their progress on their <span>to-dos.</span>
            </li>
            <li>
              <span>Get rewarded</span> for playing games and completing
              modules, attractive redemption options -{" "}
              <span>books, games, vouchers and educational courses.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default How;
