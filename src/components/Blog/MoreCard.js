import { useRouter } from "next/dist/client/router";
import React, { useContext } from "react";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Blog/morecard.module.scss";
function MoreCard({ data, getdatafromraw, pushto, tabletcard }) {
  const router = useRouter();
  const { theme } = useContext(MainContext);
  return (
    <div
      className={`${styles.moreCard} ${tabletcard && styles.tabletcard} ${
        theme === "dark" && styles.darkmorecard
      }`}
      onClick={() => {
        if (pushto) {
          router.push(pushto + `${data.id}`);
        } else {
          router.push(`/blog/${data.id}`);
        }
      }}
    >
      <img src={data.img_url} alt="" />
      <div className={styles.categories}>
        {data.categories?.split(",").map((cat, index) => {
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
