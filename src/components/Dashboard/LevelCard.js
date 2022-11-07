import styles from "../../styles/levelCard.module.scss";

export default function LevelCard({ data }) {
  return (
    <div className={styles.level}>
      <img
        src={"/images/badges/badge_" + data.level + ".svg"}
        alt="Badge"
      ></img>
      <p className={styles.levelName}>Level {data.level}</p>
    </div>
  );
}
