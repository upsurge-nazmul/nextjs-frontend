import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import styles from "../../styles/Blog/fullblog.module.scss";

function FullBlog({ item, openFull, setOpenFull, rest, setSelectedBlog }) {
  let date = new Date(Number(item.date));
  function getdatafromraw(rawdata) {
    let sanitized = DOMPurify.sanitize(rawdata);
    return draftToHtml(JSON.parse(sanitized));
  }
  const RawHTML = ({ children, className = "" }) => (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, "<br />") }}
    />
  );
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <AnimatePresence>
      {openFull && (
        <div className={styles.fullBlog}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "Tween", duration: 0.2 }}
            className={styles.back}
            onClick={() => setOpenFull(false)}
          ></motion.div>
          <motion.div
            initial={{ y: 400 }}
            animate={{ y: 0 }}
            exit={{ y: 400 }}
            transition={{ type: "Tween", duration: 0.2 }}
            className={styles.postandmore}
          >
            <div
              className={styles.cancelButton}
              onClick={() => {
                setOpenFull(false);
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="rgb(209, 68, 67)"
                width="40px"
                height="40px"
              >
                <path
                  fill-rule="evenodd"
                  d="M17.999 4l-6.293 6.293L5.413 4 4 5.414l6.292 6.293L4 18l1.413 1.414 6.293-6.292 6.293 6.292L19.414 18l-6.294-6.293 6.294-6.293z"
                ></path>
              </svg>
            </div>
            <div className={styles.post}>
              {item.featuredImage && (
                <div className={styles.image}>
                  <img src={item.featuredImage} alt="" />
                </div>
              )}
              <div className={styles.textcontent}>
                <div className={styles.timeandcat}>
                  <p className={styles.date}>
                    {date.getDate() +
                      " " +
                      months[date.getMonth()] +
                      " " +
                      date.getFullYear()}
                  </p>
                  <p className={styles.space}>|</p>
                  <p className={styles.cat}>{item.categories.split(",")[0]}</p>
                </div>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.preview}>
                  {RawHTML({ children: getdatafromraw(item.content) })}
                </div>
              </div>
              <div className={styles.share}>
                Share this post :
                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=https://upsurgefi.com/blog"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="#0340c4"
                    width="28"
                    height="28"
                  >
                    <path d="M20 12.047C20 7.603 16.418 4 12 4s-8 3.603-8 8.047c0 4.017 2.925 7.346 6.75 7.95v-5.624H8.719v-2.326h2.031v-1.773c0-2.017 1.194-3.13 3.022-3.13.875 0 1.79.157 1.79.157v1.98h-1.008c-.994 0-1.304.62-1.304 1.257v1.51h2.219l-.355 2.325H13.25v5.624c3.825-.604 6.75-3.933 6.75-7.95z"></path>
                  </svg>
                </a>
                <a
                  href="https://twitter.com/share?url=https://upsurgefi.com/blog"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="#00d9ff"
                    width="28"
                    height="28"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9.026 19.01c6.038 0 9.341-5.007 9.341-9.341 0-.141 0-.282-.006-.423A6.689 6.689 0 0020 7.543a6.654 6.654 0 01-1.889.519 3.303 3.303 0 001.447-1.819 6.53 6.53 0 01-2.087.794A3.277 3.277 0 0015.076 6a3.287 3.287 0 00-3.284 3.285c0 .256.032.505.083.749a9.323 9.323 0 01-6.767-3.432 3.292 3.292 0 001.018 4.386 3.32 3.32 0 01-1.486-.41v.045a3.29 3.29 0 002.632 3.22 3.198 3.198 0 01-.865.115c-.21 0-.416-.019-.614-.057a3.283 3.283 0 003.067 2.28 6.585 6.585 0 01-4.079 1.408A6.32 6.32 0 014 17.544a9.339 9.339 0 005.026 1.466z"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className={styles.other}>
              <h2 className={styles.morePosts}>Recent Posts</h2>
              {rest.map((item) => {
                return (
                  <div
                    className={styles.postCards}
                    onClick={() => setSelectedBlog(item)}
                  >
                    {item.img_url ? (
                      <div className={styles.image}>
                        <img src={item.img_url} alt="" />
                      </div>
                    ) : null}
                    <div className={styles.textcontent}>
                      <div className={styles.timeandcat}>
                        <p className={styles.date}>
                          {date.getDate() +
                            " " +
                            months[date.getMonth()] +
                            " " +
                            date.getFullYear()}
                        </p>
                        <p className={styles.space}>|</p>
                        <p className={styles.cat}>
                          {item.categories.split(",")[0]}
                        </p>
                      </div>
                      <div className={styles.title}>{item.title}</div>
                      <div className={styles.preview}>
                        {getdatafromraw(item.content).replace(/<[^>]+>/g, "")
                          .length > 60
                          ? getdatafromraw(item.content)
                              .replace(/<[^>]+>/g, "")
                              .substring(0, 60) + "..."
                          : getdatafromraw(item.content).replace(
                              /<[^>]+>/g,
                              ""
                            )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default FullBlog;
