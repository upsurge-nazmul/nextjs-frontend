import React, { useContext, useEffect, useState } from "react";
import BlogApis from "../../../../actions/apis/BlogApis";
import styles from "../../../../styles/WaitlistDashboard/blogs.module.scss";
import CategoryBar from "../../../../components/Blog/CategoryBar";
import BlogCard from "../../../../components/Blog/BlogCard";
import MoreCard from "../../../../components/Blog/MoreCard";
import xss from "xss";
import draftToHtml from "draftjs-to-html";
import ArrowUp from "../../../../components/SVGcomponents/ArrowUp";
import { useRouter } from "next/dist/client/router";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import Toast from "../../../../components/Toast";
import DashboardHeader from "../../../../components/Dashboard/DashboardHeader";
import { MainContext } from "../../../../context/Main";
import LoginApis from "../../../../actions/apis/LoginApis";
import Curve1 from "../../../../components/SVGcomponents/Curve1";
import Curve2 from "../../../../components/SVGcomponents/Curve2";
import DashboardFooter from "../../../../components/Dashboard/DashboardFooter";

function BlogPage({ blogs, totalblogs, porppagination, userdatafromserver }) {
  const router = useRouter();
  const [openFull, setOpenFull] = useState(false);
  const [mode, setmode] = useState("Blogs");
  const [loading, setloading] = useState(false);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [blogposts, setblogposts] = useState(blogs || []);
  const [blogpostsbackup, setblogpostsbackup] = useState(blogposts || []);
  const [selectedCat, setSelectedCat] = useState("All Categories");
  const [pagination, setpagination] = useState(porppagination || ["1"]);
  const [page, setpage] = useState(1);
  const { setuserdata } = useContext(MainContext);
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, []);
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

  useEffect(() => {
    setblogposts(blogs);
    setblogpostsbackup(blogs);
  }, [blogs]);
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
    console.log(res.data.data.rows);
    if (res && res.data) {
      setblogposts((prev) => [...prev, ...res.data.data.rows]);
      setblogpostsbackup((prev) => [...prev, ...res.data.data.rows]);
      setpage(page + 1);
    }
    setloading(false);
  }
  return (
    <div className={`${styles.blogs} ${openFull ? styles.disablescroll : ""}`}>
      <DashboardLeftPanel />
      <Toast data={toastdata} />
      <Curve1 className={styles.curve1} />
      <Curve2 className={styles.curve2} />
      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <p className={styles.heading}>Welcome to upsurge Blog!</p>

          <CategoryBar
            pushto="/dashboard/k/blogs/"
            selectedCat={selectedCat}
            sortPosts={sortPosts}
            col="transparent"
          />

          {blogposts.length > 0 && (
            <div className={styles.postsMain}>
              <div
                className={styles.left}
                onClick={() =>
                  router.push(`/dashboard/k/blog/${blogposts[0].id}`)
                }
              >
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
                    : getdatafromraw(blogposts[0].content).replace(
                        /<[^>]+>/g,
                        ""
                      )}
                </p>
                <p className={styles.time}>5 Minutes Read</p>
              </div>
              <div className={styles.right}>
                {blogposts.slice(1, 4).map((blog, index) => {
                  return (
                    <BlogCard
                      key={"blogcard" + index}
                      pushto={"/dashboard/k/blog/"}
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
                  return (
                    <MoreCard
                      key={"morecard" + index}
                      data={blog}
                      pushto="/dashboard/k/blog/"
                      getdatafromraw={getdatafromraw}
                    />
                  );
                })}
              </div>
            </div>
          )}
          {blogposts.length > 0 ? (
            totalblogs !== blogpostsbackup.length ? (
              <div className={styles.loadmorebutton} onClick={() => loadmore()}>
                Load More
                <ArrowUp clr="black" />
              </div>
            ) : null
          ) : (
            <div className={styles.loadmorebutton}>No blogs found</div>
          )}
        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default BlogPage;
export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  let msg = "";
  if (token) {
    let response = await LoginApis.checktoken({
      token: token,
    });
    if (response && !response.data.success) {
      msg = response.data.msg;
      return {
        props: { msg },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      let res = await BlogApis.getblogs({ page: 1, category: params.category });
      if (res && res.data && res.data.data) {
        return {
          props: {
            blogs: res.data.data.rows,
            totalblogs: res.data.data.count,
            userdatafromserver: response.data.data,
          },
        };
      } else
        return {
          props: {
            blogs: [],
            totalblogs: 0,
            userdatafromserver: response.data.data,
          },
        };
    }
  } else {
    return {
      props: { msg: "cannot get token" },
      redirect: {
        permanent: false,
        destination: "/?err=01",
      },
    };
  }
}
