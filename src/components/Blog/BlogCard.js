import React from "react";
import styles from "../../styles/Blog/blogcard.module.scss";
function BlogCard({ data }) {
  return (
    <div className={styles.blogcard}>
      <img src={data.featuredImage} alt="" />
      <div className={styles.right}>
        <div className={styles.categories}>
          {data.categories.map((cat) => (
            <p>{cat}</p>
          ))}
        </div>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.content}>
          {data.content.length > 60
            ? data.content.substring(0, 60) + "..."
            : data.content}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
