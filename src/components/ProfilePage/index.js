import styles from "../../styles/EditProfile/profilePage.module.scss";
import Info from "./Info";
import Bio from "./Bio";

export default function ProfilePage({ data, childavatars }) {
  return (
    <div className={styles.mainContent}>
      <Info {...{ data }} />
      <Bio {...{ data, childavatars }} />
    </div>
  );
}
