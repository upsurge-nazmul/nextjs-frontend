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
          src={"https://imgcdn.upsurge.in/images/schools/schools-child-two.png"}
          className={styles.childImage}
          alt=" " 
        />
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.textContainer}>
          <p>
            upsurge understands the importance of financial literacy and
            entrepreneurship today. As such we offer financial literacy and
            entrepreneurship workshops for schools! Our workshops equip students
            with the knowledge and skills they need to succeed in the real
            world.
          </p>
          <p className={styles.lastParagraph}>
            Workshops are practical, real life, engaging and experiential
            keeping in mind that students enjoy learning. They are conducted by
            experienced trainers who have expertise in financial literacy and
            entrepreneurship. If you&apos;re interested in providing your students
            with the knowledge and skills they need to succeed in the real
            world, we encourage you to consider our financial literacy and
            entrepreneurship workshops.
          </p>
        </div>
        <button>Read more...</button>
      </div>
    </div>
  );
};

export default ReadMoreSection;
