import React from "react";
import { getIndianTime, getRelativeTime } from "../../helpers/timehelpers";
import styles from "../../styles/Tribes/tribepost.module.scss";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
export default function TribePost({ data, handleLike, handleCommentClick }) {
  return (
    <div className={styles.post}>
      <div className={styles.top}>
        <img src={data.user_img_url} alt="" />
        <div className={styles.post_right}>
          <p className={styles.post_username}>
            {data.first_name + " " + data.last_name}
          </p>
          <p className={styles.timestamp}>
            {getRelativeTime(Number(data.timestamp))}
          </p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.post_data}>{data.post}</p>
        <div className={styles.bottombar}>
          <div className={styles.likebtn} onClick={() => handleLike(data.id)}>
            <ThumbUpIcon
              className={`${styles.icon} ${data.is_liked && styles.liked}`}
            />{" "}
            Likes ({data.likes || 0})
          </div>
          <div className={styles.commentbtn} onClick={handleCommentClick}>
            <CommentIcon className={styles.icon} /> Comments (
            {data.comments?.count || 0})
          </div>
        </div>
      </div>
    </div>
  );
}
