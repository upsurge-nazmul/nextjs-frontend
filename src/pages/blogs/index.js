import React, { useEffect, useState } from "react";
import BlogApis from "../../actions/apis/BlogApis";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import FullBlog from "../../components/Blog/FullBlog";
import styles from "../../styles/Blog/blog.module.scss";
import CategoryBar from "../../components/Blog/CategoryBar";
import BlogCard from "../../components/Blog/BlogCard";
import MoreCard from "../../components/Blog/MoreCard";
import xss from "xss";
import draftToHtml from "draftjs-to-html";
import ArrowUp from "../../components/SVGcomponents/ArrowUp";
import { useRouter } from "next/dist/client/router";
import Footer from "../../components/Home/Footer";

function BlogPage({ blogs, totalblogs, porppagination, highlightblogs }) {
  const router = useRouter();
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [openFull, setOpenFull] = useState(false);
  const [loading, setloading] = useState(false);
  const [blogposts, setblogposts] = useState(blogs || []);
  const [blogpostsbackup, setblogpostsbackup] = useState(blogposts || []);
  const [selectedCat, setSelectedCat] = useState("All Categories");
  const [selectedBlog, setSelectedBlog] = useState("");
  const [showauth, setshowauth] = useState(false);
  const [pagination, setpagination] = useState(porppagination || ["1"]);
  const [page, setpage] = useState(1);

  async function getData(page) {
    setloading(true);
    let res = await BlogApis.getblogs({ page });
    console.log(res.data.data.rows);
    if (res && res.data) {
      setblogposts(res.data.data.rows);
      setpagination(Array(Math.ceil(res.data.data.count / 10)).fill("page"));
      setblogpostsbackup(res.data.data.rows);
    }
    setloading(false);
  }

  function sortPosts(cat, index) {
    console.log(cat.toLowerCase());
    console.log(blogposts);
    if (cat !== "All Categories") {
      setSelectedCat(cat);
      setblogposts(
        blogpostsbackup.filter((item) =>
          item.categories.split(",").includes(cat.toLowerCase())
        )
      );
    } else {
      setSelectedCat("All Categories");
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
  async function loadmore() {
    let res = await BlogApis.getblogs({ page: page + 1 });
    if (res && res.data) {
      let filteredblogs = res.data.data.rows.filter((item) => {
        for (let i = 0; i < highlightblogs.length; i++) {
          const element = highlightblogs[i];
          if (element.id === item.id) {
            return false;
          } else return true;
        }
      });
      setblogposts((prev) => [...prev, ...filteredblogs]);
      setblogpostsbackup((prev) => [...prev, ...filteredblogs]);
      setpage(page + 1);
    }
    setloading(false);
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
        <p className={styles.heading}>Welcome to Upsurge Blog!</p>

        <CategoryBar selectedCat={selectedCat} sortPosts={sortPosts} />

        {highlightblogs.length > 0 && (
          <div className={styles.postsMain}>
            <div
              className={styles.left}
              onClick={() => router.push(`/blog/${blogposts[0].id}`)}
            >
              <img src={highlightblogs[0].img_url} alt="" />
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
                    key={"blogcard" + index}
                    data={blog}
                    getdatafromraw={getdatafromraw}
                  />
                );
              })}
            </div>
          </div>
        )}
        {blogposts.length > 4 && (
          <div className={styles.more}>
            <p className={styles.moreHeading}>More from our experts</p>
            <div className={styles.moreWrapper}>
              {blogposts.slice(4).map((blog, index) => {
                for (let i = 0; i < highlightblogs.length; i++) {
                  const element = highlightblogs[i];
                  if (element.id === blog.id) {
                    return null;
                  }
                }
                return (
                  <MoreCard
                    key={"morecard" + index}
                    data={blog}
                    getdatafromraw={getdatafromraw}
                  />
                );
              })}
            </div>
          </div>
        )}
        {blogposts.length === 0 && (
          <div className={styles.loadmorebutton}>No blogs found</div>
        )}
        {/* {blogposts.length > 0 ? (
          totalblogs !== blogpostsbackup.length ? (
            <div className={styles.loadmorebutton} onClick={() => loadmore()}>
              Load More
              <ArrowUp clr="black" />
            </div>
          ) : null
        ) : (
          <div className={styles.loadmorebutton}>No blogs found</div>
        )} */}
      </div>
      <Footer />
    </div>
  );
}

export default BlogPage;

export async function getServerSideProps({ params, req }) {
  let res = await BlogApis.getallblogs();
  console.log(res.data);
  let res2 = await BlogApis.gethomeblogs();
  let highlightblogs = [];
  if (res2 && res2.data && res2.data.success) {
    highlightblogs = res2.data.data;
  }
  if (res && res.data && res.data.data) {
    return {
      props: {
        blogs: res.data.data.rows,
        totalblogs: res.data.data.count,
        highlightblogs,
      },
    };
  } else return { props: { blogs: [], totalblogs: 0, highlightblogs } };
}
