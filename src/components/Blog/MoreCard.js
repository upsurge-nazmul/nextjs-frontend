import { useRouter } from "next/dist/client/router";
import React from "react";
import styles from "../../styles/Blog/morecard.module.scss";
function MoreCard({ data, getdatafromraw }) {
  const router = useRouter();
  return (
    <div
      className={styles.moreCard}
      onClick={() => {
        router.push(`/blog/${data.id}`);
      }}
    >
      <img src={data.img_url} alt="" />
      <div className={styles.categories}>
        {data.categories.split(",").map((cat, index) => {
          return <p key={"morecat" + index}>{cat}</p>;
        })}
      </div>

      <div className={styles.title}>{data.title}</div>
      <div className={styles.content}>
        {getdatafromraw(data.content).replace(/<[^>]+>/g, "").length > 60
          ? getdatafromraw(data.content)
              .replace(/<[^>]+>/g, "")
              .substring(0, 60) + "..."
          : getdatafromraw(data.content).replace(/<[^>]+>/g, "")}
      </div>
      <div className={styles.time}>5 Minutes Read</div>
    </div>
  );
}

export default MoreCard;
