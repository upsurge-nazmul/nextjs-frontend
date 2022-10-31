import styles from "../../styles/events/eventDetails.module.scss";

export default function EventDetails({ data }) {
  return (
    <div className={styles.eventDetails}>
      <div className={styles.topSection}>
        <div className={styles.contentArea}>
          <div className={styles.cardName}>{data.name}</div>
          <div className={styles.eventType}>{data.eventType}</div>
          <div className={styles.eventDate}>{data.eventDate}</div>
        </div>
        <div className={styles.bannerArea}>
          <img src={data.image} alt={data.name} className={styles.banner} />
        </div>
      </div>
      <div className={styles.detailsSection}>{data.description}</div>
    </div>
  );
}
