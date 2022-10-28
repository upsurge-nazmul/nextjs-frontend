import styles from "../../styles/GeneralComponents/card.module.scss";

export default function Card({ data }) {
  return (
    <div className={styles.card}>
      <img src={data.image} alt={data.name} className={styles.banner} />
      <div className={styles.cardName}>{data.name}</div>
    </div>
  );
}
