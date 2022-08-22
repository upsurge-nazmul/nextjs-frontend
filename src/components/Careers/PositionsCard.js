import styles from "../../styles/Careers/positionsCard.module.scss";
import ArrowRight from "../SVGcomponents/ArrowRight";
import { useRouter } from "next/router";

export default function PositionsCard({ data }) {
  const router = useRouter();

  return (
    <div className={styles.positionsCard}>
      <div className={styles.left}>
        <div className={styles.position}>{data.position}</div>
        <div className={styles.location}>{data.location}</div>
      </div>
      <div className={styles.right}>
        <button
          className={styles.applyButton}
          onClick={() => router.push(`/careers/${data.id}`)}
        >
          Apply <ArrowRight clr={"#fff"} />
        </button>
      </div>
    </div>
  );
}
