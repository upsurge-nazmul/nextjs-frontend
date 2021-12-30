import { useRouter } from "next/dist/client/router";
import React, { useContext, useEffect, useState } from "react";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";

import xss from "xss";
import draftToHtml from "draftjs-to-html";
import CategoryBar from "../../../../components/Blog/CategoryBar";
import styles from "../../../../styles/WaitlistDashboard/blogs.module.scss";

import BlogApis from "../../../../actions/apis/BlogApis";
import BlogCard from "../../../../components/Blog/BlogCard";
import MoreCard from "../../../../components/Blog/MoreCard";
import Toast from "../../../../components/Toast";
import DashboardHeader from "../../../../components/Dashboard/DashboardHeader";
import LoginApis from "../../../../actions/apis/LoginApis";
import { MainContext } from "../../../../context/Main";
export default function Blogs({
  blogs,
  totalblogs,
  porppagination,
  highlightblogs,
  userdatafromserver,
}) {
  const router = useRouter();
  const [mode, setmode] = useState("Blogs");

  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  const [blogposts, setblogposts] = useState(blogs || []);
  const [blogpostsbackup, setblogpostsbackup] = useState(blogposts || []);
  const [selectedCat, setSelectedCat] = useState("All Categories");
  const { setuserdata } = useContext(MainContext);

  useEffect(() => {
    setuserdata(userdatafromserver);
  }, []);
  function sortPosts(cat, index) {
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
    <div className={styles.blogs}>
      <DashboardLeftPanel type="waitlist" />
      <Toast data={toastdata} />

      <div className={styles.contentWrapper}>
        <DashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <p className={styles.heading}>Welcome to upsurge Blog!</p>

          <CategoryBar
            selectedCat={selectedCat}
            sortPosts={sortPosts}
            pushto="/dashboard/w/blogs/"
            col="#f4f5f7"
          />

          {highlightblogs.length > 0 && (
            <div className={styles.postsMain}>
              <div
                className={styles.left}
                onClick={() =>
                  router.push(`/dashboard/w/blog/${highlightblogs[0].id}`)
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
                      pushto={"/dashboard/w/blog/"}
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
                      pushto="/dashboard/w/blog/"
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
        </div>
      </div>
    </div>
  );
}
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
      let res = await BlogApis.getallblogs();
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
            userdatafromserver: response.data.data,
            highlightblogs,
          },
        };
      } else
        return {
          props: {
            blogs: [],
            totalblogs: 0,
            highlightblogs,
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
