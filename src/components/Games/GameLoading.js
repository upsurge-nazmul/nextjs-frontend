import styles from "../../styles/Games/gameLoading.module.scss";

export default function GameLoading({ percentage }) {
  return (
    <div className={styles.mainLoading}>
      <div className={styles.percentageArea}>
        <div className={styles.loadingText}>{parseInt(percentage * 100)}</div>
        <div className={styles.percentage}>{"%"}</div>
      </div>
      <div className={styles.progressBg}>
        <div
          className={styles.progress}
          style={{ width: `${parseInt(percentage * 100)}%` }}
        />
      </div>
    </div>
  );
}
