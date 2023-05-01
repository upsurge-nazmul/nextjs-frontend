import { useState } from "react";
import styles from "../../styles/pre-signup-events/events.module.scss";
import { useEffect } from "react";
import EventsApis from "../../actions/apis/EventsApis";

const EventsSection = () => {
  const [data, setData] = useState([]);
  const fetchAllEvents = async () => {
    const res = await EventsApis.getAllEvents({ category: "internship" });
    console.log(res);
    if (res && res.data && res.data.data) {
      setData(res.data.data);
    }
  };
  useEffect(() => {
    fetchAllEvents();
  }, []);
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Upcoming Events</h2>
      <div className={styles.cardsContainer}>
        <div className={styles.cards}>
          {data.map((card, index) => (
            <div key={"event-card" + index} className={styles.card}>
              {card.coming && (
                <div className={styles.blur}>
                  <span>Coming Soon...</span>
                </div>
              )}
              <div className={styles.imgContainer}>
                <img src={card.img} alt=" " />
              </div>
              <div className={styles.content}>
                <h3 className={`${styles.title} ${styles.cutoffText}`}>
                  {card.title}
                </h3>
                <div className={styles.buttonContainer}>
                  <button className={styles.button}>Register Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsSection;
