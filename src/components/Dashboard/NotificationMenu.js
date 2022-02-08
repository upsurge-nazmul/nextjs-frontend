import React, { useEffect, useState } from "react";
import styles from "../../styles/Dashboard/notificationmenu.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import NotificationApis from "../../actions/apis/NotificationApis";
import NotificationComponent from "../Dashboard/NotificationComponent";
export default function NotificationMenu({
  setshownotifications,
  settoastdata,
}) {
  let [notifications, setnotifications] = useState([]);
  const [page, setpage] = useState(1);
  const [showmore, setshowmore] = useState(true);
  useEffect(() => {
    function getifclickedoutside(e) {
      var avbtn = document.getElementById("notification-btn");
      var menu = document.getElementById("notification-menu");
      if (avbtn.contains(e.target)) {
        return;
      } else if (menu !== null && !menu.contains(e.target)) {
        setshownotifications(false);
      }
    }
    document.addEventListener("mousedown", getifclickedoutside);
    return () => {
      document.removeEventListener("mousedown", getifclickedoutside);
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    x();
    async function x() {
      let data = await NotificationApis.getnotifications({ page });
      if (data.data.success) {
        console.log(data.data.data);
        if (data.data.data.length > 0)
          setnotifications((prev) => [...prev, ...data.data.data]);
        else setshowmore(false);
      }
    }
  }, [page]);
  async function handlemarkread(id) {
    let res = await NotificationApis.markread({ id });
  }
  return (
    <div className={styles.notificationMenu} id="notification-menu">
      <div className={styles.heading}>
        Notifications
        <CloseIcon
          className={styles.closeIcon}
          onClick={() => setshownotifications(false)}
        />
      </div>
      <div className={styles.wrapper}>
        {notifications.map((item, index) => {
          return (
            <NotificationComponent
              data={item}
              key={item.id}
              settoastdata={settoastdata}
            />
          );
        })}
        {showmore ? (
          <div
            className={styles.more}
            onClick={() => setpage((prev) => prev + 1)}
          >
            Load more
          </div>
        ) : (
          <div className={styles.more_close}>no more notifications</div>
        )}
      </div>
    </div>
  );
}
