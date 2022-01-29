import React, { useContext, useEffect, useState } from "react";
import Toast from "../../../../components/Toast";
import DashboardHeader from "../../../../components/Dashboard/DashboardHeader";
import DashboardLeftPanel from "../../../../components/Dashboard/DashboardLeftPanel";
import GameCard from "../../../../components/Dashboard/GameCard";
import { useRouter } from "next/dist/client/router";
import styles from "../../../../styles/kidDashboard/tribemainpage.module.scss";
import HeadingArrow from "../../../../components/SVGcomponents/HeadingArrow";
import { MainContext } from "../../../../context/Main";
import LoginApis from "../../../../actions/apis/LoginApis";
import FreeGameApis from "../../../../actions/apis/FreeGameApis";
import TribeApis from "../../../../actions/apis/TribeApis";
import { Game_Data } from "../../../../static_data/Game_Data";
import KidDashboardHeader from "../../../../components/KidDashboard/KidDashboardHeader";
import TribeCard from "../../../../components/KidDashboard/TribeCard";
import TribeLeaderboard from "../../../../components/Tribes/TribeLeaderboard";
import { getCookie } from "../../../../actions/cookieUtils";
import TribePost from "../../../../components/Tribes/TribePost";
export default function Games({
  userdatafromserver,
  tribedetails,
  tribeposts,
}) {
  console.log(tribeposts);
  // modes are different pages like home,kids,store,payments,notifications
  const { setuserdata } = useContext(MainContext);
  const [mode, setmode] = useState("Tribe");
  const [post, setpost] = useState("");
  const [posts, setposts] = useState(tribeposts);
  const router = useRouter();
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  useEffect(() => {
    setuserdata(userdatafromserver);
  }, []);
  async function handlepost() {
    let model = {
      post,
      tribe_id: router.query.tribeid,
    };
    let res = await TribeApis.addpost(model, getCookie("accesstoken"));
    if (res && res.data && res.data.success) {
      setposts((prev) => ({
        rows: [
          {
            ...res.data.data,
            user_img_url: userdatafromserver.user_img_url,
            name:
              userdatafromserver.first_name +
              " " +
              userdatafromserver.last_name,
          },
          ...prev.rows,
        ],
        count: prev.count + 1,
      }));
      settoastdata({
        show: true,
        type: "success",
        msg: res?.data?.message,
      });
    } else {
      settoastdata({
        show: true,
        type: "error",
        msg: res?.data?.message || "Unable to connet to server",
      });
    }
  }
  async function handleLike(id) {
    let res = await TribeApis.likePost({ id }, getCookie("accesstoken"));
    if (res && res.data && res.data.success) {
      let postindex = posts.rows.findIndex((item) => item.id === id);
      posts.rows[postindex].is_liked = true;
      posts.rows[postindex].likes = posts.rows[postindex].likes + 1;
      setposts((prev) => ({
        rows: posts.rows,
        count: prev.count,
      }));
      settoastdata({
        show: true,
        type: "success",
        msg: res?.data?.message,
      });
    } else {
      settoastdata({
        show: true,
        type: "error",
        msg: res?.data?.message || "Unable to connet to server",
      });
    }
  }
  async function handleCommentClick(id, comment) {
    let res = await TribeApis.addcomment(
      { post_id: id, comment },
      getCookie("accesstoken")
    );
    if (res && res.data && res.data.success) {
      let postindex = posts.rows.findIndex((item) => item.id === id);
      posts.rows[postindex].comments.rows = [
        res.data.data,
        ...posts.rows[postindex].comments?.rows,
      ];
      posts.rows[postindex].comments.count =
        posts.rows[postindex].comments.count + 1;
      setposts((prev) => ({
        rows: posts.rows,
        count: prev.count,
      }));
      settoastdata({
        show: true,
        type: "success",
        msg: res?.data?.message,
      });
    } else {
      settoastdata({
        show: true,
        type: "error",
        msg: res?.data?.message || "Unable to connet to server",
      });
    }
  }
  return (
    <div className={styles.tribepage}>
      <DashboardLeftPanel type="kid" />
      <Toast data={toastdata} />

      <div className={styles.contentWrapper}>
        <KidDashboardHeader
          mode={mode}
          setmode={setmode}
          settoastdata={settoastdata}
        />
        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
            <div className={styles.top}>
              <img
                src={
                  tribedetails.tribe_img_url ||
                  "https://i.ibb.co/v3vVV8r/default-avatar.png"
                }
                alt=""
              />
              <div className={styles.right}>
                <p className={styles.name}>{tribedetails.name}</p>
                <p className={styles.description}>{tribedetails.description}</p>
              </div>
            </div>
            <div className={styles.postdiv}>
              <textarea
                className={styles.postarea}
                placeholder={"Create some awesome post...."}
                value={post}
                onChange={(e) => setpost(e.target.value)}
              />
              <div className={styles.postbtn} onClick={handlepost}>
                Create Post
              </div>
            </div>
            <p className={styles.tribehead}>My Tribe Feed</p>
            <div className={styles.wrapper}>
              {posts.rows.map((data) => {
                return (
                  <TribePost
                    data={data}
                    key={data.id}
                    handleLike={handleLike}
                    handleCommentClick={handleCommentClick}
                  />
                );
              })}
            </div>
          </div>
          <div className={styles.flexRight}>
            <TribeLeaderboard />
          </div>
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
        props: { isLogged: false, msg },
        redirect: {
          permanent: false,
          destination: "/?err=02",
        },
      };
    } else {
      let tribedata = await TribeApis.gettribedetail(
        { id: params.tribeid },
        token
      );
      let tribeposts = await TribeApis.getTribePosts(
        { id: params.tribeid },
        token
      );
      return {
        props: {
          isLogged: true,
          userdatafromserver: response.data.data,
          tribedetails:
            tribedata && tribedata.data && tribedata.data.success
              ? tribedata.data.data
              : null,
          tribeposts:
            tribeposts && tribeposts.data && tribeposts.data.success
              ? tribeposts.data.data
              : { rows: [], count: 0 },
          token: token,
        },
      };
    }
  } else {
    return {
      props: { isLogged: false, msg: "cannot get token" },
      redirect: {
        permanent: false,
        destination: "/?err=01",
      },
    };
  }
}
