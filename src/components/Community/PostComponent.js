import React, { useState } from "react";
import CommunityApis from "../../actions/apis/CommunityApis";
import styles from "../../styles/Community/postcomponent.module.scss";
import CommentSvg from "../SVGcomponents/CommentSvg";
import VoteDown from "../SVGcomponents/VoteDown";
import VoteUp from "../SVGcomponents/VoteUp";

function PostComponent({ post }) {
  const [votes, setvotes] = useState(post.votes || 0);

  function timeDifference(previous) {
    let current = new Date().getTime();
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return (
        Math.round(elapsed / 1000) +
        (Math.round(elapsed / 1000) ? " Secs Ago" : " Sec Ago")
      );
    } else if (elapsed < msPerHour) {
      return (
        Math.round(elapsed / msPerMinute) +
        (Math.round(elapsed / msPerMinute) ? " Mins Ago" : " Min Ago")
      );
    } else if (elapsed < msPerDay) {
      return (
        Math.round(elapsed / msPerHour) +
        (Math.round(elapsed / msPerHour) ? " Hrs Ago" : " Hr Ago")
      );
    } else if (elapsed < msPerMonth) {
      return (
        Math.round(elapsed / msPerDay) +
        (Math.round(elapsed / msPerDay) > 1 ? " Days Ago" : " Day Ago")
      );
    } else if (elapsed < msPerYear) {
      return (
        Math.round(elapsed / msPerMonth) +
        (Math.round(elapsed / msPerMonth) > 1 ? " Months Ago" : " Month Ago")
      );
    } else {
      return (
        Math.round(elapsed / msPerYear) +
        (Math.round(elapsed / msPerYear) > 1 ? " Yrs Ago" : " Yr Ago")
      );
    }
  }

  async function vote(type) {
    let data = {
      is_upvote: type === "up" ? true : false,
      post_id: post.id,
    };
    let response = await CommunityApis.addvote(data);
    if (response && response.data && response.data.success) {
      if (type === "up") {
        setvotes((prev) => prev + 1);
      } else {
        setvotes((prev) => (prev - 1 > 0 ? prev + 1 : 0));
      }
    }
  }
  return (
    <div className={styles.postComponent} key={post.id}>
      <div className={styles.vote}>
        <VoteUp onClick={() => vote("up")} />
        <p className={styles.votes}>{votes}</p>
        <VoteDown onClick={() => vote("down")} />
      </div>
      <div className={styles.postrightsection}>
        <div className={styles.text}>
          <div className={styles.title}>{post.title}</div>
          <div className={styles.msg}>{post.content}</div>
        </div>
        <div className={styles.bottombar}>
          <div className={styles.by}>
            <img src={post.user_img_url} alt="" />
            <p className={styles.postedby}>Posted by</p>
            <p className={styles.name}>{post.user_name}</p>
          </div>
          <p className={styles.time}>{timeDifference(post.time)}</p>
          <div className={styles.commentsbutton}>
            <CommentSvg />
            {post.comment_count} Comments
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostComponent;
