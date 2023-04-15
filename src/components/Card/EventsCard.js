import styles from "../../styles/cards/eventsCard.module.scss";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function EventsCard({
  data,
  height = "15vh",
  width = "15vw",
  handleSelect = () => {},
}) {
  return (
    <div className={styles.card}>
      <figure className={styles.cardThumbnail}>
        <img src={data.image} alt={data.name} className={styles.banner} />
        <div className={styles.dataContainer}>
          <p className={styles.date}>
            {monthNames[new Date(data.expiry).getMonth()]}
          </p>
          <p>{new Date(data.expiry).getDate()}</p>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardName}>{data.name}</div>
          <div className={styles.actionArea}>
            {data.eventOpen ? (
              <button className={styles.registerButton}>Register Now</button>
            ) : (
              <button className={styles.comingButton}>Coming Soon</button>
            )}
            <button className={styles.detailsButton} onClick={handleSelect}>
              See Details
            </button>
          </div>
          {/* <div className={styles.eventType}>{data.eventType}</div>
        <div className={styles.eventDate}>{data.eventDate}</div> */}
        </div>
      </figure>
    </div>
  );
}
