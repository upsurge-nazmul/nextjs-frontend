import styles from "../../styles/schools/readmore.module.scss";

const ReadMoreSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={`${styles.doodle} ${styles.dl1}`} />
        <div className={`${styles.doodle} ${styles.dl2}`} />
        <div className={`${styles.hc1}`} />
        {/* <Image src={childImg} width={400} height={600} /> */}
        <img
          src={"https://imgcdn.upsurge.in/images/schools/read-child.png"}
          // src="https://imgcdn.upsurge.in/images/schools/new/excited-hispanic-schoolgirl-having-idea.svg"
          className={styles.childImage}
          alt=" "
        />
      </div>
      <div className={styles.rightContainer}>
        <p>
          Upsurge offers financial literacy and entrepreneurship workshops for
          schools to equip students with practical skills for real-world
          success. Led by experienced trainers, our engaging workshops are
          designed to make learning enjoyable and experiential. Consider our
          workshops to provide your students with valuable knowledge and skills.
        </p>
      </div>
    </div>
  );
};

export default ReadMoreSection;
