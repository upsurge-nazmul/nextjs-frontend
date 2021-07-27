import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogApis from "../../actions/apis/BlogApis";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import FullBlog from "../../components/Blog/FullBlog";
import Pagination from "../../components/Blog/Pagination";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import styles from "../../styles/Blog/blog.module.scss";

function BlogPage() {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [openFull, setOpenFull] = useState(false);
  const [loading, setloading] = useState(false);
  const [blogposts, setblogposts] = useState([]);
  const [blogpostsbackup, setblogpostsbackup] = useState([]);
  const [selectedCat, setSelectedCat] = useState("all");
  const [selectedBlog, setSelectedBlog] = useState("");
  const [showauth, setshowauth] = useState(false);
  const [page, setpage] = useState(1);
  const [totalblogs, settotalblogs] = useState(0);
  const [pagination, setpagination] = useState(["1"]);
  useEffect(() => {
    getData();
    async function getData() {
      setloading(true);
      let res = await BlogApis.getblogs({ page });
      if (res && res.data) {
        setblogposts(res.data.data.rows);
        settotalblogs(res.data.data.count);
        setpagination(Array(Math.ceil(res.data.data.count / 10)).fill("page"));
        setblogpostsbackup(res.data.data.rows);
      }
      setloading(false);
    }
  }, [page]);

  function sortPosts(cat, index) {
    if (cat !== "all") {
      setSelectedCat(cat);
      setblogposts(
        blogpostsbackup.filter((item) =>
          item.categories.split(",").includes(cat)
        )
      );
    } else {
      setSelectedCat("all");
      setblogposts(blogpostsbackup);
    }
  }
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

  function getdatafromraw(rawdata) {
    let sanitized = DOMPurify.sanitize(rawdata);
    return draftToHtml(JSON.parse(sanitized));
  }
  return (
    <div
      className={`${styles.blogPage} ${openFull ? styles.disablescroll : ""}`}
    >
      <Header
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
      />
      <FullBlog
        item={selectedBlog}
        openFull={openFull}
        setOpenFull={setOpenFull}
        setSelectedBlog={setSelectedBlog}
        rest={blogpostsbackup.filter((item) => item.id !== selectedBlog.id)}
      />
      <div className={styles.content}>
        <p className={styles.heading}>Blog Posts</p>
        <div className={styles.categoryAndPosts}>
          <div className={styles.posts}>
            {blogposts.map((item) => {
              let date = new Date(Number(item.date));
              return (
                <div className={styles.post}>
                  {item.img_url && (
                    <div className={styles.image}>
                      <img src={item.img_url} alt="" />
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
                        : getdatafromraw(item.content).replace(/<[^>]+>/g, "")}
                    </div>
                    <div
                      className={styles.continue}
                      onClick={() => {
                        setSelectedBlog(item);
                        setOpenFull(true);
                      }}
                    >
                      Continue Reading
                    </div>
                  </div>
                </div>
              );
            })}
            <Pagination data={pagination} setpage={setpage} page={page} />
          </div>

          <div className={styles.categories}>
            <p className={styles.categoryHeading}>Categories</p>
            <div className={styles.categoryScroll}>
              <p
                onClick={() => sortPosts("all")}
                className={`${styles.category} ${
                  selectedCat === "all" ? styles.selectedCat : ""
                }`}
              >
                All Posts
              </p>
              {blogpostsbackup.map((item, index) => {
                return (
                  <p
                    onClick={() => sortPosts(item.categories.split(",")[index])}
                    className={`${styles.category} ${
                      selectedCat === item.categories.split(",")[index]
                        ? styles.selectedCat
                        : ""
                    }`}
                  >
                    {item.categories.split(",")[index]}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <section className={styles.footer}>
        <div className={styles.triangle}>
          <svg data-ux="SVG">
            <g fill="#FC6766" fillRule="evenodd" width="53" height="24">
              <path d="M26.5 24L53 0H0z"></path>
            </g>
          </svg>
        </div>
        <div className={styles.footercontent}>
          <p>Copyright © 2021 upsurge India - All Rights Reserved.</p>
        </div>
      </section>
    </div>
  );
}

export default BlogPage;
