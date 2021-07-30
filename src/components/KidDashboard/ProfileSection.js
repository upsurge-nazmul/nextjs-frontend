import React from "react";
import Reward from "../Reward";
import styles from "../../styles/kidDashboard/profile.module.scss";
function ProfileSection() {
  let data = {
    points: 1200,
    gems: 500,
  };
  return (
    <div className={styles.profileSection}>
      <img
        className={styles.avatar}
        src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
        alt=""
      />
      <Reward type="point" value={data.points} />
      <Reward type="gem" value={data.gems} />
    </div>
  );
}

export default ProfileSection;
