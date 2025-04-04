import draftToHtml from "draftjs-to-html";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import xss from "xss";
import BlogApis from "../../actions/apis/BlogApis";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Home/blogs.module.scss";

export async function getStaticProps() {
  let res = await BlogApis.gethomeblogs();
  if (res && res.data && res.data.success) {
    blog_data = res;
  }
  // By returning { props: { blog_data } }, the Blog component
  // will receive `blog_data` as a prop at build time
  return {
    props: {
      blog_data,
    },
  };
}

function BlogsSection(blog_data) {
  const router = useRouter();
  const { theme } = useContext(MainContext);
  const [blogs, setblogs] = useState([]);
  useEffect(() => {
    async function x() {
      let res = blog_data;
      if (res && res.data && res.data.success) {
        setblogs(res.data.data);
      }
    }
    x();
  }, []);

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
  let data = [
    {
      title: "Quest",
      pushTo: "/products/quests",
      description:
        "Quest comprises byte sized interactive videos which include exercises, real life examples and a short quiz.",
    },
    {
      pushTo: "/products/games",
      title: "Games",
      description:
        "Challenge your friends over multiple games that are fun and experiential",
    },
    {
      pushTo: "/products/chores",
      title: "Chores",
      description:
        "Help young learners become financially responsible by earning money through chores or “Jobs” assigned by parents.",
    },
    {
      pushTo: "/products/liveclasses",
      title: "Live Classes",
      description:
        "Interactive and fun workshops by experts for young learners to understand money management and entrepreneurship.",
    },
  ];
  return (
    <>
      <section
        className={`${styles.blogSection} ${
          theme === "dark" && styles.darkblogSection
        }`}
      >
        <h2 className={styles.heading} onClick={() => router.push("/blogs")}>
          Read our blogs for some MONEY-ful insights
        </h2>
        <div className={styles.wrapper}>
          {blogs.map((item, index) => {
            return (
              <div
                key={item.id}
                className={styles.moreCard}
                onClick={() => {
                  router.push(`/blog/${item.id}`);
                }}
              >
                <img src={item.img_url} alt="" />
                <div className={styles.categories}>
                  {item.categories?.split(",").map((cat, index) => {
                    return <p key={"morecat" + index}>{cat}</p>;
                  })}
                </div>

                <div className={styles.title}>{item.title}</div>
                <div className={styles.content}>
                  {getdatafromraw(item.content).replace(/<[^>]+>/g, "").length >
                  100
                    ? getdatafromraw(item.content)
                        .replace(/<[^>]+>/g, "")
                        .substring(0, 100) + "..."
                    : getdatafromraw(item.content).replace(/<[^>]+>/g, "")}
                </div>
                <div className={styles.time}>5 Minutes Read</div>
              </div>
            );
          })}
          <p className={styles.button} onClick={() => router.push("/blogs")}>
            Read Now
          </p>
        </div>
      </section>
    </>
  );
}

export default BlogsSection;
