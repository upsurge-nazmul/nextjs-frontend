import draftToHtml from "draftjs-to-html";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import xss from "xss";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Home/blogs.module.scss";
import { AnimatePresence, motion } from "framer-motion";

function readingTime(text) {
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
}

function BlogsSection({ blogData }) {
  const router = useRouter();
  const { theme } = useContext(MainContext);
  const [blogs, setblogs] = useState(blogData);
  const [index, setIndex] = useState(0);
  const [height, setHeight] = useState(0);
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prev) => {
        if (prev === data.length - 1) {
          return 0;
        }
        return ++prev;
      });
    }, 4000);
    return () => clearInterval(intervalId);
  }, [index]);

  useEffect(() => {
    const card = document.getElementById("blogCard");
    setHeight(card.clientHeight);
  }, [index]);

  let data = [
    {
      title: "Knowledge Quest",
      pushTo: "/products/quests",
      description:
        "Knowledge Quest comprises byte sized interactive videos which include exercises, real life examples and a short quiz.",
    },
    {
      pushTo: "/products/games",
      title: "Games Arena",
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
        <h2 className={styles.heading}>
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
                {/* <div className={styles.content}>
                  {getdatafromraw(item.content).replace(/<[^>]+>/g, "").length >
                  100
                    ? getdatafromraw(item.content)
                        .replace(/<[^>]+>/g, "")
                        .substring(0, 100) + "..."
                    : getdatafromraw(item.content).replace(/<[^>]+>/g, "")}
                </div> */}
                <div className={styles.time}>
                  {readingTime(getdatafromraw(item.content))} Minutes Read
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.mobileWrapper}>
          <div className={styles.container} style={{ height: height + 20 }}>
            <AnimatePresence>
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.moreCard}
                onClick={() => {
                  router.push(`/blog/${blogs[index].id}`);
                }}
                id="blogCard"
              >
                <img src={blogs[index].img_url} alt="" />
                <div className={styles.itemContainer}>
                  <div className={styles.categories}>
                    {blogs[index].categories?.split(",").map((cat, ind) => {
                      return <p key={"morecat" + ind}>{cat}</p>;
                    })}
                  </div>
                  <div className={styles.time}>
                    {readingTime(getdatafromraw(blogs[index].content))} Minutes
                    Read
                  </div>
                </div>
                <div className={styles.title}>{blogs[index].title}</div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className={styles.navbar}>
            {blogs.map((n, i) => (
              <div
                key={"blog-dot-" + i}
                onClick={() => setIndex(i)}
                className={`${styles.dot} ${i === index && styles.active}`}
              ></div>
            ))}
          </div>
        </div>
        <button className={styles.button} onClick={() => router.push("/blogs")}>
          Read Now
        </button>
      </section>
    </>
  );
}

export default BlogsSection;
