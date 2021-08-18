import React from "react";
import styles from "../../styles/Blog/blogcard.module.scss";
function BlogCard({ data, getdatafromraw }) {
  return (
    <div className={styles.blogcard}>
      <img src={data.img_url} alt="" />
      <div className={styles.right}>
        <div className={styles.categories}>
          {data.categories.split(",").map((cat, index) => (
            <p key={"blogcat" + index}>{cat}</p>
          ))}
        </div>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.content}>
          {getdatafromraw(data.content).replace(/<[^>]+>/g, "").length > 60
            ? getdatafromraw(data.content)
                .replace(/<[^>]+>/g, "")
                .substring(0, 60) + "..."
            : getdatafromraw(data.content).replace(/<[^>]+>/g, "")}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
