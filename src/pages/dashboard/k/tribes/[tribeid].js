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
import TribeChore from "../../../../components/Tribes/TribeChore";
import FillSpace from "../../../../components/Dashboard/FillSpace";
import TribePendingSection from "../../../../components/Tribes/TribePendingSection";
export default function Games({
  userdatafromserver,
  tribedetails,
  tribeposts,
  tribeleaderboard,
  tribefeed,
  pendingmembers,
}) {
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
      console.log(res.data.data);
      setposts((prev) => ({
        rows: [
          {
            ...res.data.data,
            user_img_url: userdatafromserver.user_img_url,
            first_name: userdatafromserver.first_name,
            last_name: userdatafromserver.last_name,
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

      if (res.data.data === "Disliked") {
        posts.rows[postindex].is_liked = false;
        posts.rows[postindex].likes =
          posts.rows[postindex].likes > 0 ? posts.rows[postindex].likes - 1 : 0;
      } else {
        posts.rows[postindex].is_liked = true;
        posts.rows[postindex].likes = posts.rows[postindex].likes + 1;
      }
      setposts((prev) => ({
        rows: posts.rows,
        count: prev.count,
      }));
    } else {
      settoastdata({
        show: true,
        type: "error",
        msg: res?.data?.message || "Unable to connet to server",
      });
    }
  }
  async function handleCommentClick(id, comment, super_comment_id) {
    let modal = { post_id: id, comment };
    if (super_comment_id) {
      modal.super_comment_id = super_comment_id;
    }
    let res = await TribeApis.addcomment(modal, getCookie("accesstoken"));
    if (res && res.data && res.data.success) {
      let postindex = posts.rows.findIndex((item) => item.id === id);
      if (super_comment_id) {
        let supercommentindex = posts.rows[postindex].comments.rows.findIndex(
          (item) => item.id === super_comment_id
        );
        if (supercommentindex === -1) {
          router.reload();
          return;
        }
        posts.rows[postindex].comments.rows[
          supercommentindex
        ].sub_comments.rows = [
          {
            ...res.data.data,
            user_img_url: userdatafromserver.user_img_url,
            first_name: userdatafromserver.first_name,
            last_name: userdatafromserver.last_name,
          },
          ...posts.rows[postindex].comments.rows[supercommentindex].sub_comments
            .rows,
        ];
        posts.rows[postindex].comments.rows[
          supercommentindex
        ].sub_comments.count =
          posts.rows[postindex].comments.rows[supercommentindex].sub_comments
            .count + 1;
      } else {
        if (posts.rows[postindex].comments) {
          posts.rows[postindex].comments.rows = [
            {
              ...res.data.data,
              user_img_url: userdatafromserver.user_img_url,
              first_name: userdatafromserver.first_name,
              last_name: userdatafromserver.last_name,
            },
            ...posts.rows[postindex].comments?.rows,
          ];
          posts.rows[postindex].comments.count =
            posts.rows[postindex].comments.count + 1;
        } else {
          posts.rows[postindex].comments = { rows: [], count: 0 };
          posts.rows[postindex].comments.rows = [
            {
              ...res.data.data,
              user_img_url: userdatafromserver.user_img_url,
              first_name: userdatafromserver.first_name,
              last_name: userdatafromserver.last_name,
            },
          ];
          posts.rows[postindex].comments.count = 1;
        }
      }
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
          showback
          gobackto="/dashboard/k/tribes"
        />
        <div className={styles.mainContent}>
          <div className={styles.flexLeft}>
            <div className={styles.top}>
              <img
                src={
                  tribedetails.tribe_img_url ||
                  "https://imgcdn.upsurge.in/images/default-avatar.png"
                }
                alt=""
              />
              <div className={styles.right}>
                <div className={styles.head}>
                  <p className={styles.name}>{tribedetails.name}</p>
                  {tribedetails.owner_id === userdatafromserver.user_id && (
                    <p
                      className={styles.edit}
                      onClick={() =>
                        router.push(
                          "/dashboard/k/managetribe/" + tribedetails.id
                        )
                      }
                    >
                      edit tribe
                    </p>
                  )}
                </div>
                <p className={styles.description}>
                  {tribedetails.description || "no description available."}
                </p>
              </div>
            </div>
            {/* <div className={styles.postdiv}>
              <textarea
                className={styles.postarea}
                placeholder={"Create some awesome post...."}
                value={post}
                onChange={(e) => setpost(e.target.value)}
              />
              <div className={styles.postbtn} onClick={handlepost}>
                Create Post
              </div>
            </div> */}
            <p className={styles.tribehead}>My Tribe Feed</p>
            <div className={styles.wrapper}>
              {tribefeed.rows.map((data) => {
                return (
                  <TribeChore
                    data={data}
                    key={data.id}
                    handleLike={handleLike}
                    handleCommentClick={handleCommentClick}
                    memberdata={tribeleaderboard}
                  />
                );
              })}
              {tribefeed.rows.length === 0 && (
                <FillSpace text="No updates found." />
              )}
            </div>
          </div>
          <div className={styles.flexRight}>
            <TribeLeaderboard data={tribeleaderboard} />
            {pendingmembers?.length > 0 && (
              <TribePendingSection data={pendingmembers} />
            )}
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
      let tribeleaderboard = await TribeApis.leaderboard(
        { id: params.tribeid },
        token
      );
      let tribefeed = await TribeApis.getchorefeed(
        { id: params.tribeid },
        token
      );
      let pendingMembers = await TribeApis.getpendingmembers(
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
          pendingmembers:
            pendingMembers && pendingMembers.data && pendingMembers.data.success
              ? pendingMembers.data.data
              : null,
          tribeposts:
            tribeposts && tribeposts.data && tribeposts.data.success
              ? tribeposts.data.data
              : { rows: [], count: 0 },
          tribefeed:
            tribefeed && tribefeed.data && tribefeed.data.success
              ? tribefeed.data.data
              : { rows: [], count: 0 },
          tribeleaderboard:
            tribeleaderboard &&
            tribeleaderboard.data &&
            tribeleaderboard.data.success
              ? tribeleaderboard.data.data
              : [],

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
