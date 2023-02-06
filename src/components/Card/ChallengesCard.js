import styles from "../../styles/cards/eventsCard.module.scss";

export default function ChallengesCard({
  data,
  height = "15vh",
  width = "15vw",
  handleSelect = () => {},
}) {
  return (
    <div
      className={styles.card}
      style={{
        maxHeight: height,
        maxWidth: width,
      }}
    >
      <img src={data.image} alt={data.name} className={styles.banner} />
      <div className={styles.cardContent}>
        <div className={styles.cardName}>{data.name}</div>
        <div className={styles.eventType}>{data.eventType}</div>
        <div className={styles.eventDate}>{data.eventDate}</div>
      </div>
      <div className={styles.actionArea}>
        {data.eventOpen ? (
          <button className={styles.registerButton}>Register Now</button>
        ) : (
          <button className={styles.commingButton}>Comming Soon</button>
        )}
        <button className={styles.detailsButton} onClick={handleSelect}>
          See Details
        </button>
      </div>
    </div>
  );
}
