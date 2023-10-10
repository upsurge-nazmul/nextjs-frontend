import styles from "../../styles/schools/contactUs.module.scss";

const ContactUsSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <p>
          Contact us today to discuss how we can tailor our workshops to meet
          your school&apos;s specific needs.
        </p>
      </div>
      <div className={styles.rightContainer}>
        <div className={`${styles.doodle} ${styles.dl1}`} />
        <div className={`${styles.hc1}`} />
        <img
          src="https://imgcdn.upsurge.in/images/schools/c5-ellipse.png"
          className={styles.childBG}
          alt=" "
        />
        <img
          src="https://imgcdn.upsurge.in/images/schools/conatct-child.png"
          className={styles.childImage}
          alt=" "
        />
      </div>
    </div>
  );
};

export default ContactUsSection;
