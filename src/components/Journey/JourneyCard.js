import { useRouter } from "next/router";
import styles from "../../styles/Journey/journeyCard.module.scss";
import Image from "../Image";

export default function JourneyCard({
  data,
  userPlanType,
  setShowSubToPremium,
}) {
  const router = useRouter();

  const handleActionClick = (journey) => {
    if (userPlanType >= data.premium_plan) {
      router.push(`/dashboard/k/quest/${journey}`);
    } else {
      setShowSubToPremium(true);
    }
  };

  return (
    <div className={styles.journeyCard} style={{ backgroundImage: `url(/images/kq/${data.questId}.webp)`}}  onClick={() => handleActionClick(data?.questId)}>
      
      
        {/* <div className={`${styles.questType} mt-2`}>{data?.title}</div> */}
        <div className={styles.cardBottom}>
        <div className={`${styles.title} mb-3`}>{data?.title}</div>
        <div className={`${styles.actionButton} rounded-pill text-center py-1`}     >
          &#9658; 
        </div>
        </div>
      
    </div>
  );
  // return (
  //   <div className={styles.journeyCard}>
  //     <div className={styles.cardLeft}>
  //       <div className={styles.cardImage}>
  //         <Image
  //           imageUrl={`/images/kq/${data.questId}.webp`}
  //           alt={data.title}
  //           placeholderText={data.title}
  //         />
  //       </div>
  //     </div>
  //     <div className={styles.cardRight}>
  //       <div className={`${styles.questType} mt-2`}>{data?.quest_type}</div>
  //       <div className={`${styles.title} mb-3`}>{data?.title}</div>
  //       <div
  //         onClick={() => handleActionClick(data?.questId)}
  //         className={`${styles.actionButton} rounded-pill text-center py-1`}
  //       >
  //         Start Learning
  //       </div>
  //     </div>
  //   </div>
  // );
}
