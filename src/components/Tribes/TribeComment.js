import React from "react";
import { useState } from "react";
import { getRelativeTime } from "../../helpers/timehelpers";
import styles from "../../styles/Tribes/tribecomment.module.scss";

export default function TribeComment({
  subcomment,
  postId,
  data,
  handleCommentClick,
  index,
}) {
  const [openreply, setopenreply] = useState(false);
  const [comment, setcomment] = useState("");
  return (
    <div className={`${styles.comment} ${subcomment && styles.subcomment}`}>
      {subcomment && (
        <div className={styles.lefticonsection}>
          <div className={styles.vertical}></div>
          <div className={styles.horizontal}></div>
        </div>
      )}
      <div className={styles.rightsection}>
        <div className={styles.top}>
          <img src={data.user_img_url} alt="" />
          <p className={styles.name}>
            {data.first_name + " " + data.last_name}
          </p>
          <p className={styles.timestamp}>
            {getRelativeTime(Number(data.timestamp))}
          </p>
        </div>
        <p className={styles.commentdata}>{data.comment}</p>
        <div className={styles.bottomBar}>
          {openreply && (
            <input
              type="text"
              onChange={(e) => setcomment(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleCommentClick(postId, comment);
              }}
            />
          )}
          <p
            className={styles.replyBtn}
            onClick={() => {
              if (!openreply) setopenreply(true);
              else handleCommentClick(postId, comment, data.id);
            }}
          >
            Reply
          </p>
        </div>
        {data.sub_comments && (
          <div className={styles.subcomments}>
            {data.sub_comments.rows.map((subcomment, index) => {
              return (
                <TribeComment
                  subcomment={true}
                  data={subcomment}
                  postId={postId}
                  iterationcount={index}
                  handleCommentClick={handleCommentClick}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
