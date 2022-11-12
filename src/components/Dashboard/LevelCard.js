import styles from "../../styles/levelCard.module.scss";

export default function LevelCard({ data }) {
  return (
    <div className={styles.levelCard}>
      <div className={styles.topSection}>
        <img
          src={"/images/badges/badge_" + data.level + ".svg"}
          alt="Badge"
          className={styles.badge}
        ></img>
        <div className={styles.levelArea}>
          <div className={styles.levelName}>Level {data.level}</div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <div className={`${styles.unlockedAt} ${styles.list}`}>
          <div className={styles.listHeading}>Unlocked at</div>
          {data.unlockedAt.map((item, i) => (
            <div className={styles.listItem} key={i}>
              - {item}
            </div>
          ))}
        </div>
        <div className={`${styles.perks} ${styles.list}`}>
          <div className={styles.listHeading}>Perks</div>
          {data.perks.map((item) => (
            <div className={styles.listItem}>- {item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
