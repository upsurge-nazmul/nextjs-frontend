import styles from "../../styles/EditProfile/profilePage.module.scss";

export default function StateName({ data }) {
  return (
    <div className={styles.stateNameArea}>
      <div className={styles.stateLabel}>State</div>
      <div className={styles.stateName}>
        {data ? (
          <>{data}</>
        ) : (
          <span className={styles.placeholder}>Select city first</span>
        )}
      </div>
    </div>
  );
}
