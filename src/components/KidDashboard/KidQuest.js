import styles from "../../styles/kidDashboard/kidQuest.module.scss";
import CircularPercentage from "../CircularPercentage";
import { useRouter } from "next/dist/client/router";

export default function KidQuest({ data }) {
  const router = useRouter();

  const getCompletedPercentage = () => {
    return Math.floor(
      data.chapters.length > 0 ? (data.level / data.chapters.length) * 100 : 0
    );
  };

  return (
    <div
      className={styles.kidQuest}
      onClick={() => {
        router.push(`/dashboard/k/quest/${data.questId}`);
      }}
    >
      <div className={styles.left}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.description}>
          {data.questDescription.slice(0, 100) + "..."}
        </div>
        <div className={styles.level}>
          {data.level} / {data.chapters.length} chapter
          {data.level > 1 ? "s" : ""} completed
        </div>
      </div>
      <div className={styles.right}>
        <CircularPercentage text={getCompletedPercentage()} />
      </div>
    </div>
  );
}
