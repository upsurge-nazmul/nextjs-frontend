import styles from "../../styles/pre-signup-events/live.module.scss";

const LiveSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2>Live workshops & events</h2>
        <p>
          Live online courses and workshops, designed and taught by our
          co-founders and experts, on important topics around personal finance,
          career development, and entrepreneurship.
        </p>
        <p>
          These are designed with an experiential focus and are fun, engaging
          and effective! The workshops & classes are supplemented with activity
          sheets, live games, and project work.
        </p>
        <p>
          Students who do well in projects will get certificates, scholarships &
          even internships Specially designed events such as upsurge Olympics &
          Summer Startup Summit to give exposure to high school students
        </p>
      </div>
      <div className={styles.right}>
        <div>
          {/* image is pending*/}
          <img src="" />
        </div>
      </div>
    </div>
  );
};

export default LiveSection;
