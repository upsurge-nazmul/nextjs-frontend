import React, { useEffect } from "react";
import styles from "../../styles/Dashboard/notificationmenu.module.scss";
import CloseIcon from "@mui/icons-material/Close";
export default function NotificationMenu({ setshownotifications }) {
  let demodata = [
    "Lorem ipsum dolor sit amet, consect",
    "Lorem ipsum dolor sit amet, consect",
    "Lorem ipsum dolor sit amet, consect",
    "Lorem ipsum dolor sit amet, consect",
    "Lorem ipsum dolor sit amet, consect",
    "Lorem ipsum dolor sit amet, consect",
    "Lorem ipsum dolor sit amet, consect",
    "Lorem ipsum dolor sit amet, consect",
  ];
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
        {demodata.map((item, index) => {
          return (
            <p className={styles.notification} key={index + "noti"}>
              {item}
            </p>
          );
        })}
      </div>
    </div>
  );
}
