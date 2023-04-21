import EventsApis from "../../actions/apis/EventsApis";
import styles from "../../styles/events/eventDetails.module.scss";

export default function EventDetails({ data, onOutsideClick }) {
  const RawHTML = ({ children, className = "" }) => (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, "<br />") }}
    />
  );
  return (
    <div className={styles.tradePopup}>
      <div className={styles.popupBackground} onClick={onOutsideClick} />
      <div className={styles.popupBody}>
        <div className={styles.eventDetails}>
          <div className={styles.eventHeader}>
            <img src={data.image} alt={data.name} className={styles.banner} />
            <div className={styles.textContainer}>
              <h3>{data.name}</h3>
            </div>
          </div>
          <div className={styles.eventBody}>
            <article className={styles.detailsSection}>
              {RawHTML({ children: data.description })}
            </article>
          </div>
          <div className={styles.eventFooter}>
            <button onClick={onOutsideClick} className={styles.cancel}>
              Cancel
            </button>
            <button
              onClick={() => {
                EventsApis.registerFormClick({
                  eventId: data.id,
                });
                window.open(data.formLink, "_ blank");
              }}
              className={styles.register}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
