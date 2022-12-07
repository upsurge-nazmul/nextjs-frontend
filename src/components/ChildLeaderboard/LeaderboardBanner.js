import styles from "../../styles/Leaderboard/leaderboardBanner.module.scss";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import TabletAndroidIcon from "@mui/icons-material/TabletAndroid";

export default function LeaderboardBanner() {
  return (
    <div className={styles.banner}>
      <img
        src={"https://imgcdn.upsurge.in/images/coinfalling.png"}
        alt={"Banner"}
        className={styles.backgroundImg}
      />
      <div className={styles.left}>
        <div className={styles.title}>Win exciting prizes!!</div>
        <div className={styles.description}></div>
      </div>
      <div className={styles.right}>
        <TabletMacIcon className={styles.tab1} />
        <TabletAndroidIcon className={styles.tab2} />
      </div>
    </div>
  );
}
