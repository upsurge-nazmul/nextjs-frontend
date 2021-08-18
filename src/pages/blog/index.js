import React, { useEffect, useState } from "react";
import BlogApis from "../../actions/apis/BlogApis";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import FullBlog from "../../components/Blog/FullBlog";
import draftToHtml from "draftjs-to-html";
import styles from "../../styles/Blog/blog.module.scss";
import CategoryBar from "../../components/Blog/CategoryBar";
import BlogCard from "../../components/Blog/BlogCard";
import MoreCard from "../../components/Blog/MoreCard";
import xss from "xss";

function BlogPage({ blogs, totalblogs, porppagination }) {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [openFull, setOpenFull] = useState(false);
  const [loading, setloading] = useState(false);
  const [blogposts, setblogposts] = useState(blogs || []);
  const [blogpostsbackup, setblogpostsbackup] = useState(blogposts || []);
  const [selectedCat, setSelectedCat] = useState("all");
  const [selectedBlog, setSelectedBlog] = useState("");
  const [showauth, setshowauth] = useState(false);
  const [pagination, setpagination] = useState(porppagination || ["1"]);
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

  let blogdata = [
    {
      postId: "7096fb97-d559-4b73-bb4f-012a1dec77fa",
      hideCommenting: false,
      title: "Entrepreneurship for Children",
      date: "2021-06-22T14:51:12.902Z",
      content:
        "We will soon be launching a suite of innovative and experiential modules for children to understand businesses in an engaging and effective way!",
      slug: "entrepreneurship-for-children",
      featuredImage:
        "https://img1.wsimg.com/isteam/ip/d8e5f7c1-24b8-4fb9-b39b-4cb141b26043/Facebook_Cover.jpg",
      categories: ["Entrepreneurship"],
      featureFlags: {},
    },
    {
      postId: "d466c6ed-6ede-4435-a36d-fae1c4050d4a",
      hideCommenting: false,
      title: "Financi Education for Children",
      date: "2021-06-22T14:49:52.928Z",
      content:
        "This is what our mission is - Helping India's youth rise and achieve financial independence. This life skill is one of the most important and oft ignored.",
      slug: "finance-education-for-children",
      featuredImage:
        "https://img1.wsimg.com/isteam/ip/d8e5f7c1-24b8-4fb9-b39b-4cb141b26043/Facebook_Cover.jpg",
      categories: ["Financial Literacy"],
      featureFlags: {},
    },
    {
      postId: "d466c6ed-6ede-4435-a36d-fae1c4050d4a",
      hideCommenting: false,
      title: "Financi Education for Children",
      date: "2021-06-22T14:49:52.928Z",
      content:
        "This is what our mission is - Helping India's youth rise and achieve financial independence. This life skill is one of the most important and oft ignored.",
      slug: "finance-education-for-children",
      featuredImage:
        "https://img1.wsimg.com/isteam/ip/d8e5f7c1-24b8-4fb9-b39b-4cb141b26043/Facebook_Cover.jpg",
      categories: ["Financial Literacy"],
      featureFlags: {},
    },
    {
      postId: "d466c6ed-6ede-4435-a36d-fae1c4050d4a",
      hideCommenting: false,
      title: "Financi Education for Children",
      date: "2021-06-22T14:49:52.928Z",
      content:
        "This is what our mission is - Helping India's youth rise and achieve financial independence. This life skill is one of the most important and oft ignored.",
      slug: "finance-education-for-children",
      featuredImage:
        "https://img1.wsimg.com/isteam/ip/d8e5f7c1-24b8-4fb9-b39b-4cb141b26043/Facebook_Cover.jpg",
      categories: ["Financial Literacy"],
      featureFlags: {},
    },
  ];

  function getdatafromraw(rawdata) {
    if (!rawdata) return "";
    let sanitized = xss(rawdata, {
      whiteList: ["b", "i", "strong"],
      stripIgnoreTag: true,
    });
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
        <p className={styles.heading}>Welcome to Upsurge Blog!</p>
        <CategoryBar />
        <div className={styles.postsMain}>
          <div className={styles.left}>
            <img src={blogposts[0].img_url} alt="" />
            <div className={styles.categoryWrapper}>
              {blogposts[0].categories.split(",").map((cat, index) => (
                <p className={styles.category} key={"cat" + index}>
                  {cat}
                </p>
              ))}
            </div>
            <p className={styles.blogtitle}>{blogposts[0].title}</p>
            <p className={styles.blogcontent}>
              {getdatafromraw(blogposts[0].content).replace(/<[^>]+>/g, "")
                .length > 60
                ? getdatafromraw(blogposts[0].content)
                    .replace(/<[^>]+>/g, "")
                    .substring(0, 60) + "..."
                : getdatafromraw(blogposts[0].content).replace(/<[^>]+>/g, "")}
            </p>
            <p className={styles.time}>5 Minutes Read</p>
          </div>
          <div className={styles.right}>
            {blogposts.map((blog, index) => {
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
        <div className={styles.more}>
          <p className={styles.moreHeading}>More from our experts</p>
          <div className={styles.moreWrapper}>
            {blogposts.map((blog, index) => {
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
        <div className={styles.loadmorebutton}>
          Load More{" "}
          <svg
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 17V1"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 10L8 17L15 10"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;

export async function getServerSideProps({ params, req }) {
  let res = await BlogApis.getblogs({ page: 1 });
  console.log(res.data.data.rows);
  if (res && res.data && res.data.data) {
    return {
      props: {
        blogs: res.data.data.rows,
        totalblogs: res.data.data.count,
        porppagination: Array(Math.ceil(res.data.data.count / 10)).fill("page"),
      },
    };
  } else return { props: { blogs: [], totalblogs: 0, porppagination: ["1"] } };
}
