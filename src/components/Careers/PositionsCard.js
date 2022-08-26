import styles from "../../styles/Careers/positionsCard.module.scss";
import ArrowRight from "../SVGcomponents/ArrowRight";

export default function PositionsCard({
  data,
  handleApplyClick,
  handlePositionClick,
}) {
  return (
    <div className={styles.positionsCard}>
      <div className={styles.left} onClick={() => handlePositionClick(data.id)}>
        <div className={styles.position}>{data.position}</div>
        <div className={styles.location}>{data.location}</div>
      </div>
      <div className={styles.right}>
        <button
          className={styles.applyButton}
          onClick={() => handleApplyClick(data.id)}
        >
          Apply <ArrowRight clr={"#fff"} />
        </button>
      </div>
    </div>
  );
}
