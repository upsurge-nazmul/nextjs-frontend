import styles from "../../styles/schools/schoolHero.module.scss";

const SchoolHeroSection = () => {
  return (
    <div className={styles.container}>
      {/* <div className={`${styles.doodle} ${styles.dl1}`} />
      <div className={`${styles.doodle} ${styles.dl2}`} />
      <div className={`${styles.hc1}`} />
      <div className={`${styles.hc2}`} /> */}
      <img
        src={"https://imgcdn.upsurge.in/images/schools/school-hero-bg.png"}
        // src="/images/school-bg.svg"
        className={styles.bgImage}
        alt=" "
      />
      <div className={styles.left}>
        <h1 className={styles.heading}>
          Financial literacy and entrepreneurship programs for schools!
        </h1>
        <p>
          Our programs equip students with the knowledge and skills they need to
          succeed in the real world.
        </p>
        <button className={styles.exploreButton}>
          <span>Explore</span>
          <div className={styles.arrow}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </div>
        </button>
      </div>
      <div className={styles.right}>
        <img
          src="https://imgcdn.upsurge.in/images/schools/hero-child.png"
          alt="Child Image"
        />
      </div>
    </div>
  );
};

export default SchoolHeroSection;
