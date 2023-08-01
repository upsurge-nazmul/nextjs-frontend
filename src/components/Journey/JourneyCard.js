import { useRouter } from "next/router";
import styles from "../../styles/Journey/journeyCard.module.scss";
import Image from "../Image";

export default function JourneyCard({ data }) {
  console.log("!!!!!!!!", data);
  const router = useRouter();

  const handleActionClick = (journey) => {
    router.push(`/dashboard/k/quest/${journey}`);
  };

  return (
    <div className={styles.journeyCard}>
      <div className={styles.cardLeft}>
        <div className={styles.cardImage}>
          <Image
            imageUrl={`/images/kq/${data.questId}.png`}
            alt={data.title}
            placeholderText={data.title}
          />
        </div>
      </div>
      <div className={styles.cardRight}>
        <div className={`${styles.questType} mt-2`}>{data?.quest_type}</div>
        <div className={`${styles.title} mb-3`}>{data?.title}</div>
        <div
          onClick={() => handleActionClick(data?.questId)}
          className={`${styles.actionButton} rounded-pill text-center py-1`}
        >
          Start Learning
        </div>
      </div>
    </div>
  );
}
