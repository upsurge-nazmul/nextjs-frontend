import styles from "../../styles/WaitlistDashboard/seeMoreCard.module.scss";

export default function SeeMoreCard({ handleClick }) {
  return (
    <div className={styles.seeMore} onClick={handleClick}>
      <div className={styles.text}>↓ See More ↓</div>
    </div>
  );
}
