import styles from "../../styles/cards/eventsCard.module.scss";

export default function EventsCard({ data, height = "15vh", width = "15vw" }) {
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
        <div className={styles.eventType}>{data.eventType}</div>
        <div className={styles.eventDate}>{data.eventDate}</div>
        <div className={styles.actionArea}>
          {data.eventOpen ? (
            <button className={styles.registerButton}>Register Now</button>
          ) : (
            <button className={styles.commingButton}>Comming Soon</button>
          )}
        </div>
      </div>
    </div>
  );
}
