import { useRouter } from "next/router";
import styles from "../../styles/Journey/journeyCard.module.scss";
import LockSvg from "../SVGcomponents/LockSvg";
import PlaySvg from "../SVGcomponents/PlaySvg";

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
      
        <div className={styles.cardBottom}>
        <div className={`${styles.title} mb-3`} style={userPlanType >= data.premium_plan ? {borderTopColor: '#FDCC03'} : {borderTopColor: '#FF4E4E'} }>{data?.title}</div>
        <div className={`${styles.actionButton} rounded-pill text-center py-1`} style={userPlanType >= data.premium_plan ? {backgroundColor: '#FDCC03'} : {backgroundColor: '#FF4E4E'} }>
        {userPlanType >= data.premium_plan ? <PlaySvg className={styles.open} /> : <LockSvg className={styles.lock} />}
        </div>
        </div>
      
    </div>
  );
}
