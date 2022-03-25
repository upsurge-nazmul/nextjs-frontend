import React from "react";
import styles from "../../styles/Home/howearlyaccess.module.scss";
import ProductGameSvg from "../../components/SVGcomponents/ProductGameSvg";
import QuestSvg from "../../components/SVGcomponents/QuestSvg";
import QuizIcon from "@mui/icons-material/Quiz";
import AddReactionIcon from "@mui/icons-material/AddReaction";
export default function HowEarlyAccess() {
  return (
    <div className={styles.page}>
      <p className={styles.heading}>
        Join our Early Access Program & stand a chance to win attractive prizes
      </p>
      <p className={styles.subheading}>How the early access program works</p>
      <p className={styles.steptophead}>
        Earn UniCoins to rise up the leaderboard by
      </p>
      <div className={styles.wrapper}>
        <div className={styles.flexwrapper}>
          <div className={styles.stepsubhead}>
            <ProductGameSvg className={styles.icon} />
            <p>Playing games</p>
          </div>
          <div className={styles.stepsubhead}>
            <QuestSvg className={styles.icon} />
            <p>Completing a knowledge quest</p>
          </div>
          <div className={styles.stepsubhead}>
            <QuizIcon className={styles.fonticon} />
            <p>Testing your financial knowledge</p>
          </div>
          <div className={styles.stepsubhead}>
            <AddReactionIcon className={styles.fonticon} />
            <p>Inviting Friends</p>
          </div>
        </div>
      </div>
    </div>
  );
}
