import styles from "../../styles/schools/schoolHero.module.scss";

const SchoolHeroSection = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.doodle} ${styles.dl1}`} />
      <div className={`${styles.doodle} ${styles.dl2}`} />
      <div className={`${styles.hc1}`} />
      <div className={`${styles.hc2}`} />
      <img
        src={"https://imgcdn.upsurge.in/images/schools/school-hero-bg.png"}
        className={styles.bgImage}
      />
      <div className={styles.left}>
        <p>
          Upsurge offers financial literacy and entrepreneurship workshops for
          schools! Our workshops aim to equip students with the knowledge and
          skills they need to succeed in the real world.
        </p>
      </div>
      <div className={styles.right}>
        <img
          src={"https://imgcdn.upsurge.in/images/schools/school-hero-img.png"}
          alt="Child Image"
        />
      </div>
    </div>
  );
};

export default SchoolHeroSection;
