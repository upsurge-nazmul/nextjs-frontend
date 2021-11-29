import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import DashboardLeftPanel from "../../components/Dashboard/DashboardLeftPanel";
import Header from "../../components/Header/Header";
import Footer from "../../components/Home/Footer";
import xss from "xss";
import draftToHtml from "draftjs-to-html";
import LeftPanel from "../../components/LeftPanel";
import CategoryBar from "../../components/Blog/CategoryBar";
import styles from "../../styles/test/blogtest.module.scss";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";
import JoinUs from "../../components/Home/JoinUs";
import WaitingListCta from "../../components/WaitingListCta";
import BlogApis from "../../actions/apis/BlogApis";
import BlogCard from "../../components/Blog/BlogCard";
import MoreCard from "../../components/Blog/MoreCard";
export default function Test({
  blogs,
  totalblogs,
  porppagination,
  highlightblogs,
}) {
  const router = useRouter();
  const [openFull, setOpenFull] = useState(false);
  const [loading, setloading] = useState(false);
  const [blogposts, setblogposts] = useState(blogs || []);
  const [blogpostsbackup, setblogpostsbackup] = useState(blogposts || []);
  const [selectedCat, setSelectedCat] = useState("All Categories");
  const [selectedBlog, setSelectedBlog] = useState("");
  const [showauth, setshowauth] = useState(false);
  const [pagination, setpagination] = useState(porppagination || ["1"]);
  const [page, setpage] = useState(1);
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
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
    <div className={styles.blogtest}>
      <Header
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <div className={styles.wrapper}>
        <DashboardLeftPanel hidelogo />
        <div className={styles.content}>
          <p className={styles.heading}>Welcome to Upsurge Blog!</p>

          <CategoryBar selectedCat={selectedCat} sortPosts={sortPosts} />

          {highlightblogs.length > 0 && (
            <div className={styles.postsMain}>
              <div
                className={styles.left}
                onClick={() => router.push(`/blog/${blogposts[0].id}`)}
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
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ params, req }) {
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
        highlightblogs,
      },
    };
  } else return { props: { blogs: [], totalblogs: 0, highlightblogs } };
}
