import React, { useState } from "react";
import NotificationApis from "../../actions/apis/NotificationApis";
import { getRelativeTime } from "../../helpers/timehelpers";
import styles from "../../styles/Dashboard/notificationcomponent.module.scss";

export default function NotificationComponent({ data }) {
  const [read, setread] = useState(data.read || false);
  async function handlemarkread(id) {
    let res = await NotificationApis.markread({ id });
    if (res && res.data.success) {
      setread(true);
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
