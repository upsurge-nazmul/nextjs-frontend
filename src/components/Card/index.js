import styles from "../../styles/GeneralComponents/card.module.scss";

export default function Card({ data, height = "15vh", width = "15vw" }) {
  return (
    <div
      className={styles.card}
      style={{
        height: height,
        minWidth: width,
      }}
    >
      <img src={data.image} alt={data.name} className={styles.banner} />
      <div className={styles.cardContent}>
        <div className={styles.cardName}>{data.name}</div>
      </div>
    </div>
  );
}
