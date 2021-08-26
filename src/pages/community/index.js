import React, { useState } from "react";
import Helpheader from "../../components/Help/HelpHeader";
import retirement from "../../assets/community/retirement.png";
import PostComponent from "../../components/Community/PostComponent";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/Community/community.module.scss";
import CommunityApis from "../../actions/apis/CommunityApis";
import Toast from "../../components/Toast";
import BallsSvg from "../../components/SVGcomponents/BallsSvg";
import ArrowRight from "../../components/SVGcomponents/ArrowRight";
import ArrowDown from "../../components/SVGcomponents/ArrowDown";
import ThunderSvg from "../../components/SVGcomponents/ThunderSvg";
import Bulb from "../../components/SVGcomponents/Bulb";
import ArrowUp from "../../components/SVGcomponents/ArrowUp";
function Community({ topusersdata, announcementsdata, postsdata }) {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [page, setpage] = useState(2);
  const [posts, setposts] = useState(postsdata.rows || []);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  let tempannouncements = [
    {
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis",
      msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatisLorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis",
    },
    {
      title: "We are announcing an exciting new feature today!",
      msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatisLorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis",
    },
    {
      title: "We are announcing an exciting new feature today!",
      msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatisLorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis",
    },
  ];
  let topics = [
    "Finance",
    "Education",
    "Stock Market",
    "Business",
    "Woman in finance",
    "Career Tips",
    "Retirement",
    "Retirement",
  ];

  async function getmoreposts() {
    let postsres = await CommunityApis.getallposts({ page: page });
    if (postsres && postsres.data && postsres.data.success)
      setposts((prev) => [...prev, ...postsres.data.data.rows]);
    setpage((prev) => prev + 1);
  }

  async function addpost() {
    let newpost = {
      title: "New Test",
      content:
        "took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      comment_count: 0,
      votes: 0,
    };
    let response = await CommunityApis.addpost(newpost);
    if (response && response.data && response.data.success) {
      setposts((prev) => [response.data.data, ...prev]);
      settoastdata({
        show: true,
        type: "success",
        msg: response.data.message,
      });
    } else {
      settoastdata({
        show: true,
        type: "error",
        msg: response?.data?.message || "Server Offline",
      });
    }
  }
  return (
    <div className={styles.communityPage}>
      <Toast data={toastdata} />
      <Helpheader
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <div className={styles.welcome}>
        <div className={styles.left}>
          <p className={styles.top}>Welcome to the</p>
          <p className={styles.bottom}>Community Forum!</p>
        </div>
        <div className={styles.right}>
          <BallsSvg />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.left}>
            <div className={styles.announcements}>
              <div className={styles.heading}>
                Announcements <ArrowRight height="20" />
              </div>
              <div className={styles.wrapper}>
                {announcementsdata.rows?.map((item, index) => {
                  return (
                    <div
                      className={styles.announcement}
                      key={"annoncement" + index}
                    >
                      <p className={styles.title}>{item.heading}</p>
                      <p className={styles.msg}>{item.details}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.posts}>
              <div className={styles.heading}>
                All Topics{" "}
                <ArrowRight height="20" clr="black" width="20" height="15" />
              </div>

              <div className={styles.topics}>
                {topics.map((topic, index) => (
                  <p className={styles.topic} key={"topic" + index}>
                    {topic}
                  </p>
                ))}
              </div>
              <div className={styles.wrapper}>
                {posts.map((post, index) => {
                  return <PostComponent key={"post" + index} post={post} />;
                })}
                {posts.length !== postsdata.count ? (
                  <div className={styles.loadmorebutton} onClick={getmoreposts}>
                    Load More
                    <ArrowDown clr="black" />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.top}>
              <div className={`${styles.communitycard} ${styles.quickstart}`}>
                <ThunderSvg />
                <div className={styles.text}>
                  <p className={styles.heading}>Upsurge</p>
                  <p className={styles.heading}>Quickstart Guide</p>
                  <p className={styles.go}>
                    Get the guide
                    <ArrowRight width="11" height="7" />
                  </p>
                </div>
              </div>
              <div className={`${styles.communitycard} ${styles.suggestion}`}>
                <Bulb />
                <div className={styles.text}>
                  <p className={styles.heading}>Suggestions</p>
                  <p className={styles.heading}>& Course Requests</p>
                  <p className={styles.go}>
                    Make a suggestion
                    <ArrowRight width="11" height="7" />
                  </p>
                </div>
              </div>
              <div className={styles.communitybigcard}>
                <img src={retirement.src} alt="" />
                <div className={styles.text}>
                  <p className={styles.heading}>Free Webinar on</p>
                  <p className={styles.heading}>Retirement Planning</p>
                  <p className={styles.go}>
                    Register
                    <ArrowRight width="11" height="7" clr="black" />
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.button} onClick={addpost}>
                + Start a New Topic
              </div>
              <div className={styles.heading}>Top Users</div>
              <div className={styles.wrapper}>
                {topusersdata.rows?.map((user, index) => {
                  return (
                    <div className={styles.topuser} key={"user" + index}>
                      <img src={user.user_img_url} alt="" />
                      <p className={styles.name}>{user.user_name}</p>
                      <p className={styles.votes}>
                        {user.total_votes}{" "}
                        <ArrowDown clr="#4166EB" height="9" />
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  const propsdata = {
    announcementsdata: { count: 0, rows: [] },
    topusersdata: { count: 0, rows: [] },
    postsdata: { count: 0, rows: [] },
  };

  let response = await CommunityApis.gettopusers();
  if (response && response.data && response.data.success) {
    propsdata.topusersdata = response.data.data;
  }
  let announcementres = await CommunityApis.getannouncements();
  if (announcementres && announcementres.data && announcementres.data.success) {
    propsdata.announcementsdata = announcementres.data.data;
  }
  let postsres = await CommunityApis.getallposts({ page: 1 });
  if (postsres && postsres.data && postsres.data.success)
    propsdata.postsdata = postsres.data.data;
  return {
    props: propsdata,
  };
}
