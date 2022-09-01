import styles from "../../styles/GeneralComponents/addChildSuccess.module.scss";

export default function AddChildSuccess({
  name,
  userName,
  password,
  clickHandler = () => {},
}) {
  return (
    <div className={styles.popup}>
      <div className={styles.background}></div>
      <div className={styles.content}>
        <div className={styles.bodyArea}>
          <div className={styles.bodyTitle}>
            Now <span className={styles.name}>{name}</span> can login using
          </div>
          <div className={styles.bodyItem}>
            <span className={styles.label}>Username: </span>
            <span className={styles.value}>{userName}</span>
          </div>
          <div className={styles.bodyItem}>
            <span className={styles.label}>Password: </span>
            <span className={styles.value}>{password}</span>
          </div>
        </div>
        <div className={styles.actionArea}>
          <button className={styles.nextButton} onClick={clickHandler}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
