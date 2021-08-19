import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/kidDashboard/kidChore.module.scss";

function KidChore({ data }) {
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
  let due_date = new Date(Number(data.due_date)).getTime() ?? currenttime;
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
    <div className={styles.kidChore}>
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

        <p>{due_date}</p>
      </div>
      <div className={styles.button}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 9C0 6.61305 0.948212 4.32387 2.63604 2.63604C4.32387 0.948212 6.61305 0 9 0C11.3869 0 13.6761 0.948212 15.364 2.63604C17.0518 4.32387 18 6.61305 18 9C18 11.3869 17.0518 13.6761 15.364 15.364C13.6761 17.0518 11.3869 18 9 18C6.61305 18 4.32387 17.0518 2.63604 15.364C0.948212 13.6761 0 11.3869 0 9Z"
            fill="white"
          />
          <path
            d="M7.73237 10.2408L12.1353 5.83789L13.0916 6.79426L7.73237 12.1535L4.86328 9.28441L5.81964 8.32805L7.73237 10.2408Z"
            fill="#4166EB"
          />
        </svg>{" "}
        Mark as done
      </div>

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

export default KidChore;
