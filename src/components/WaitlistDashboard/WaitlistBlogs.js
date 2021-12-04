import React from "react";
import xss from "xss";
import draftToHtml from "draftjs-to-html";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/WaitlistDashboard/waitlistblog.module.scss";
import Image from "next/image";
export default function WaitlistBlogs({ blogs }) {
  const router = useRouter();
  function getdatafromraw(rawdata) {
    if (!rawdata) return "";
    let sanitized = xss(rawdata, {
      whiteList: ["b", "i", "strong"],
      stripIgnoreTag: true,
    });
    return draftToHtml(JSON.parse(sanitized))
      .replace(/<[^>]+>/g, "")
      .replace(/\n/g, " ")
      .trim();
  }
  return (
    <div className={styles.waitlistblog}>
      <p className={styles.heading}>Blogs</p>
      <div className={styles.wrapper}>
        {blogs.map((item) => {
          return (
            <div
              className={styles.blog}
              key={item.id}
              onClick={() => router.push("/dashboard/w/blog/" + item.id)}
            >
              <div className={styles.img}>
                <Image src={item.img_url} layout="fill" objectFit="cover" />
              </div>
              <div className={styles.right}>
                <div className={styles.categories}>
                  {item.categories?.split(",").map((cat, index) => {
                    return <p key={"morecat" + index}>{cat}</p>;
                  })}
                </div>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.content}>
                  {getdatafromraw(item.content).replace(/<[^>]+>/g, "").length >
                  250
                    ? getdatafromraw(item.content)
                        .replace(/<[^>]+>/g, "")
                        .substring(0, 250) + "..."
                    : getdatafromraw(item.content).replace(/<[^>]+>/g, "")}
                </div>
                <div className={styles.time}>5 Minutes Read</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
