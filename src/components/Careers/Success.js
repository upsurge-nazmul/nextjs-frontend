import styles from "../../styles/Careers/application.module.scss";
import CircleTick from "../SVGcomponents/CircleTick";

export default function Success() {
  return (
    <div className={styles.application}>
      <div className={styles.success}>
        <CircleTick className={styles.icon} />
        <div className={styles.successMsg}>
          Your application submitted successfully
        </div>
        <div className={styles.infoMsg}>
          You should recieve a confirmation email
        </div>
      </div>
    </div>
  );
}
