import React from "react";
import xss from "xss";
import draftToHtml from "draftjs-to-html";
import { useRouter } from "next/dist/client/router";
import styles from "../../styles/Dashboard/dashboardblogs.module.scss";
import Image from "next/image";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import BlogCard from "../Blog/BlogCard";

export default function DashboardBlogs({ allBlogs, highlightblogs }) {
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
    <div className={styles.dashboardblogs} id="dashboard-blogs">
      <h2
        className={styles.heading}
        onClick={() => router.push("/dashboard/p/blogs")}
      >
        Blogs
        <HeadingArrow />
      </h2>
      <div className={styles.wrapper}>
        {highlightblogs.length > 0 && (
          <div className={styles.postsMain}>
            <div
              className={styles.left}
              onClick={() =>
                router.push(`/dashboard/p/blog/${highlightblogs[0].id}`)
              }
            >
              <img src={highlightblogs[0]?.img_url} alt="" />
              <div className={styles.categoryWrapper}>
                {highlightblogs[0].categories.split(",").map((cat, index) => (
                  <p className={styles.category} key={"cat" + index}>
                    {cat}
                  </p>
                ))}
              </div>
              <p className={styles.blogtitle}>{highlightblogs[0].title}</p>
              <p className={styles.blogcontent}>
                {getdatafromraw(highlightblogs[0].content).replace(
                  /<[^>]+>/g,
                  ""
                ).length > 60
                  ? getdatafromraw(highlightblogs[0].content)
                      .replace(/<[^>]+>/g, "")
                      .substring(0, 60) + "..."
                  : getdatafromraw(highlightblogs[0].content).replace(
                      /<[^>]+>/g,
                      ""
                    )}
              </p>
              <p className={styles.time}>5 Minutes Read</p>
            </div>
            <div className={styles.right}>
              {highlightblogs.slice(1, 4).map((blog, index) => {
                return (
                  <BlogCard
                    pushto={"/dashboard/p/blog/"}
                    key={"blogcard" + index}
                    data={blog}
                    getdatafromraw={getdatafromraw}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className={styles.wrapper}>
        {allBlogs &&
          allBlogs.length &&
          allBlogs.slice(0, 5).map((item) => {
            return (
              <div
                className={styles.blog}
                key={item.id}
                onClick={() => router.push("/dashboard/p/blog/" + item.id)}
              >
                <div className={styles.img}>
                  <Image
                    src={item.img_url}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                  />
                </div>
                <div className={styles.right}>
                  <div className={styles.categories}>
                    {item.categories?.split(",").map((cat, index) => {
                      return <p key={"morecat" + index}>{cat}</p>;
                    })}
                  </div>
                  <div className={styles.title}>{item.title}</div>
                  <div className={styles.content}>
                    {getdatafromraw(item.content).replace(/<[^>]+>/g, "")
                      .length > 150
                      ? getdatafromraw(item.content)
                          .replace(/<[^>]+>/g, "")
                          .substring(0, 150) + "..."
                      : getdatafromraw(item.content).replace(/<[^>]+>/g, "")}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
