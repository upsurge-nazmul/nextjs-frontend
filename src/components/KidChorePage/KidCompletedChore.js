import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/kidchores/kidCompletedChore.module.scss";

export default function KidCompletedChore({ data }) {
  const [showmenu, setshowmenu] = useState(false);
  const router = useRouter();
  const demoChore = {
    image:
      "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTFWtjP3S55GF9SiB8xsodk5w2QO5MichphEj4JcYRpo-Eewh5WdqGZH6G1OtIgoB-PmyPDWcx-9ieyysbz5g",
    task: "Prepare Monthly Budget",
    to: "Assigned to Pulkit",
    time: "Due in 3 days",
    status: "pending",
  };
  let currenttime = new Date().getTime();
  let due_date =
    new Date(Number(data?.due_date || "Due in 3 days")).getTime() ??
    currenttime;
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const diffDays = Math.round(Math.abs((due_date - currenttime) / oneDay));
  due_date = `Due in ${diffDays} days`;

  useEffect(() => {
    if (showmenu) document.addEventListener("mousedown", getifclickedoutside);
    else document.removeEventListener("mousedown", getifclickedoutside);
    function getifclickedoutside(e) {
      let menu = document.querySelector(".menu");
      if (menu !== null && !menu.contains(e.target)) {
        setshowmenu(false);
      }
    }
    return () => {
      document.removeEventListener("mousedown", getifclickedoutside);
    };
  }, [showmenu]);

  return (
    <div className={styles.kidCompletedChore}>
      <img src={demoChore.image} alt="" />
      <div className={styles.taskAndTo}>
        <div className={styles.task}>{data.title}</div>
        <div className={styles.to}>{data.assigned_to}</div>
      </div>
      <div className={styles.time}>
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.41935 0C3.77674 0 0 3.58862 0 8C0 12.4114 3.77674 16 8.41935 16C13.062 16 16.8387 12.4114 16.8387 8C16.8387 3.58862 13.062 0 8.41935 0ZM12.4235 12.1379C12.2867 12.2679 12.1071 12.3334 11.9275 12.3334C11.7479 12.3334 11.5681 12.2679 11.4314 12.1379L7.92334 8.80469C7.7914 8.68005 7.71778 8.51062 7.71778 8.33337V4C7.71778 3.63135 8.03202 3.33337 8.41935 3.33337C8.80669 3.33337 9.12092 3.63135 9.12092 4V8.05737L12.4235 11.1953C12.6978 11.4561 12.6978 11.8773 12.4235 12.1379Z"
            fill="black"
          />
        </svg>

        <p>{due_date || "Finished on 23rd Aug"}</p>
      </div>
      <div className={styles.button}>Completed</div>
      <div className={styles.more}>
        {showmenu ? (
          <div className={styles.menu}>
            <p
              className={styles.menutab}
              onClick={() =>
                router.push("managechore/edit", {
                  data: data,
                  isineditmode: true,
                })
              }
            >
              Edit
            </p>
          </div>
        ) : null}
        <svg
          width="5"
          height="23"
          viewBox="0 0 5 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="2.5" cy="2.5" r="2.5" fill="#424242" />
          <circle cx="2.5" cy="11.5" r="2.5" fill="#424242" />
          <circle cx="2.5" cy="20.5" r="2.5" fill="#424242" />
        </svg>
      </div>
    </div>
  );
}
