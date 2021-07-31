import React from "react";
import styles from "../../styles/Blog/morecard.module.scss";
function MoreCard({ data }) {
  return (
    <div className={styles.moreCard}>
      <img src={data.featuredImage} alt="" />
      <div className={styles.categories}>
        {data.categories.map((cat) => {
          return <p>{cat}</p>;
        })}
      </div>

      <div className={styles.title}>{data.title}</div>
      <div className={styles.content}>
        {data.content.length > 60
          ? data.content.substring(0, 60) + "..."
          : data.content}
      </div>
      <div className={styles.time}>5 Minutes Read</div>
    </div>
  );
}

export default MoreCard;
