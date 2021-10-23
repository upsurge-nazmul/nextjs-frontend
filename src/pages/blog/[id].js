import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/BlogPage/blogpage.module.scss";
import BlogApis from "../../actions/apis/BlogApis";
import draftToHtml from "draftjs-to-html";
import xss from "xss";
import Footer from "../../components/Home/Footer";
import Curve1 from "../../components/SVGcomponents/Curve1";
import Curve2 from "../../components/SVGcomponents/Curve2";

export default function BlogPage({ blogdata }) {
  const router = useRouter();
  const [headings, setheadings] = useState([]);
  const [scroll, setscroll] = useState(80);
  const [currentsection, setcurrentsection] = useState(null);
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [showauth, setshowauth] = useState(false);
  let date = new Date(Number(blogdata.date));
  function getdatafromraw(rawdata) {
    if (!rawdata) return "";
    let sanitized = xss(rawdata, {
      whiteList: ["b", "i", "strong"],
      stripIgnoreTag: true,
    });
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
  useEffect(() => {
    let h1s = document.getElementsByTagName("h1");
    if (h1s.length > 0) {
      setheadings(Array.from(h1s));
      setcurrentsection(h1s[0].textContent);
    }
  }, [blogdata]);
  useEffect(() => {
    if (headings.length === 0) return;
    const handlescroll = () => {
      setscroll(window.scrollY);
      headings.forEach((item) => {
        if (window.scrollY === 0) {
          setcurrentsection(headings[0].textContent);
        } else if (window.scrollY >= item.offsetTop - 100) {
          setcurrentsection(item.textContent);
        }
      });
    };
    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, [headings]);

  function hanldemove(index) {
    headings[index].scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
  return (
    <div className={styles.blogPage}>
      <Header
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
        showauth={showauth}
        setshowauth={setshowauth}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <Curve1 className={styles.curve1} />
      <Curve2 className={styles.curve2} />
      <div className={styles.contentWrapper}>
        <div className={styles.post}>
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
              <p className={styles.cat}>{blogdata.categories.split(",")[0]}</p>
            </div>
            <div className={styles.title}>{blogdata.title}</div>
            {blogdata.img_url && (
              <div className={styles.image}>
                <img src={blogdata.img_url} alt="" />
              </div>
            )}
            <div className={styles.preview}>
              {RawHTML({ children: getdatafromraw(blogdata.content) })}
            </div>
          </div>
          <div className={styles.share}>
            Share this post :
            <a
              href={
                "https://www.facebook.com/sharer/sharer.php?u=https://upsurgefi.com/blog/" +
                blogdata.id
              }
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="#0340c4" width="28" height="28">
                <path d="M20 12.047C20 7.603 16.418 4 12 4s-8 3.603-8 8.047c0 4.017 2.925 7.346 6.75 7.95v-5.624H8.719v-2.326h2.031v-1.773c0-2.017 1.194-3.13 3.022-3.13.875 0 1.79.157 1.79.157v1.98h-1.008c-.994 0-1.304.62-1.304 1.257v1.51h2.219l-.355 2.325H13.25v5.624c3.825-.604 6.75-3.933 6.75-7.95z"></path>
              </svg>
            </a>
            <a
              href={
                "https://twitter.com/share?url=https://upsurgefi.com/blog/" +
                blogdata.id
              }
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="#00d9ff" width="28" height="28">
                <path
                  fillRule="evenodd"
                  d="M9.026 19.01c6.038 0 9.341-5.007 9.341-9.341 0-.141 0-.282-.006-.423A6.689 6.689 0 0020 7.543a6.654 6.654 0 01-1.889.519 3.303 3.303 0 001.447-1.819 6.53 6.53 0 01-2.087.794A3.277 3.277 0 0015.076 6a3.287 3.287 0 00-3.284 3.285c0 .256.032.505.083.749a9.323 9.323 0 01-6.767-3.432 3.292 3.292 0 001.018 4.386 3.32 3.32 0 01-1.486-.41v.045a3.29 3.29 0 002.632 3.22 3.198 3.198 0 01-.865.115c-.21 0-.416-.019-.614-.057a3.283 3.283 0 003.067 2.28 6.585 6.585 0 01-4.079 1.408A6.32 6.32 0 014 17.544a9.339 9.339 0 005.026 1.466z"
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <div className={styles.table}>
          <div className={styles.movingtable}>
            <p
              className={styles.heading}
              // style={{ marginTop: scroll > 100 ? scroll - 100 : scroll }}
            >
              Table Of Content
            </p>
            {headings.map((item, index) => {
              return (
                <p
                  onClick={() => hanldemove(index)}
                  key={index + "tableContent"}
                  className={`${
                    item.textContent === currentsection ? styles.active : ""
                  }`}
                >
                  {item.textContent}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export async function getServerSideProps({ params, req }) {
  let blogdata = await getBlog({ id: params.id });
  return { props: { blogdata: blogdata } };
}

async function getBlog(id) {
  let response = await BlogApis.getblogwithid(id);
  if (response && response.data && response.data.data)
    return response.data.data;
}
