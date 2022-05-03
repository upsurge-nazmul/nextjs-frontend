import { useRouter } from "next/dist/client/router";
import React, { useContext } from "react";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Blog/blogcard.module.scss";
function BlogCard({ data, getdatafromraw, pushto }) {
  const router = useRouter();
  const { theme } = useContext(MainContext);
  return (
    <div
      className={`${styles.blogcard} ${
        theme === "dark" && styles.darkblogcard
      }`}
      onClick={() => {
        if (pushto) {
          router.push(pushto + `${data.slug}`);
        } else {
          router.push(`/blog/${data.slug}`);
        }
      }}
    >
      <img src={data?.img_url} alt="" />
      <div className={styles.right}>
        <div className={styles.categories}>
          {data.categories.split(",").map((cat, index) => (
            <p key={"blogcat" + index}>{cat}</p>
          ))}
        </div>
        <div className={styles.title}>
          {data.title.length < 60
            ? data.title
            : data.title.substring(0, 40) + "..."}
        </div>
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
