import React, { useState } from "react";
import ChoreApis from "../../actions/apis/ChoreApis";
import NotificationApis from "../../actions/apis/NotificationApis";
import { getRelativeTime } from "../../helpers/timehelpers";
import styles from "../../styles/Dashboard/notificationcomponent.module.scss";

export default function NotificationComponent({ data, settoastdata }) {
  console.log(data);
  const [read, setread] = useState(data.read || false);
  async function handlemarkread(id) {
    let res = await NotificationApis.markread({ id });
    if (res && res.data.success) {
      setread(true);
    }
  }
  async function handleApprove() {
    let res = await NotificationApis.markread({ id: data.id });
    if (res && res.data.success) {
      setread(true);
    }
    let response = await ChoreApis.approvechore({ id: data.link_id });
    if (response && response.data && response.data.success) {
      settoastdata({ show: true, type: "success", msg: "done" });
    } else {
      settoastdata({
        show: true,
        type: "success",
        msg: response.data.message || "Cannot reach server",
      });
    }
  }
  return (
    <div
      className={`${styles.notification} ${read && styles.notificationread}`}
      key={data.id}
    >
      {data.sender_img_url && (
        <div className={styles.left}>
          <img src={data.sender_img_url} alt="" />
        </div>
      )}
      <div className={styles.mid}>
        <p className={styles.name}>{data.sender_name}</p>
        <p className={styles.msg}>{data.msg}</p>
        {!read && data.type === "chore_approval" && (
          <div className={styles.action}>
            <div className={styles.approve} onClick={handleApprove}>
              Approve
            </div>
            <div
              className={styles.cancel}
              onClick={() => handlemarkread(data.id)}
            >
              Cancel
            </div>
          </div>
        )}
      </div>
      <div className={styles.right}>
        <p className={styles.time}>{getRelativeTime(Number(data.timestamp))}</p>
        {!read && (
          <p className={styles.mark} onClick={() => handlemarkread(data.id)}>
            Mark as read
          </p>
        )}
      </div>
    </div>
  );
}
