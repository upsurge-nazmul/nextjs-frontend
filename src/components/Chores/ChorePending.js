import React from "react";
import styles from "../../styles/Chores/chorepending.module.scss";

function ChorePending() {
  const demoChore = {
    image:
      "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQTFWtjP3S55GF9SiB8xsodk5w2QO5MichphEj4JcYRpo-Eewh5WdqGZH6G1OtIgoB-PmyPDWcx-9ieyysbz5g",
    task: "Prepare Monthly Budget",
    to: "Assigned to Pulkit",
    time: "Completed 3 days ago",
    status: "completed",
  };
  return (
    <div className={styles.chorePending}>
      <img src={demoChore.image} alt="" />
      <div className={styles.taskAndTo}>
        <div className={styles.task}>{demoChore.task}</div>
        <div className={styles.to}>{demoChore.to}</div>
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

        <p>{demoChore.time}</p>
      </div>
      <div className={styles.completionIcon}>
        {demoChore.status === "completed" ? (
          <svg
            width="25"
            height="25"
            className={styles.compIcon}
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 12.5C0 9.18479 1.31696 6.00537 3.66117 3.66117C6.00537 1.31696 9.18479 0 12.5 0C15.8152 0 18.9946 1.31696 21.3388 3.66117C23.683 6.00537 25 9.18479 25 12.5C25 15.8152 23.683 18.9946 21.3388 21.3388C18.9946 23.683 15.8152 25 12.5 25C9.18479 25 6.00537 23.683 3.66117 21.3388C1.31696 18.9946 0 15.8152 0 12.5Z"
              fill="#17D1BC"
            />
            <path
              d="M10.7392 14.2225L16.8544 8.10742L18.1826 9.43571L10.7392 16.8791L6.75439 12.8943L8.08268 11.566L10.7392 14.2225Z"
              fill="white"
            />
          </svg>
        ) : demoChore.status === "pending" ? (
          <svg
            width="25"
            height="26"
            viewBox="0 0 25 26"
            className={styles.compIcon}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.7214 0V2.53126C19.2225 3.20793 23.1197 8.20779 22.443 13.7089C21.8666 18.2702 18.2827 21.8916 13.7214 22.4305V24.9366C20.6135 24.2474 25.6259 18.1323 24.9366 11.2403C24.3728 5.28807 19.6486 0.588956 13.7214 0ZM11.2152 0.0375929C8.77168 0.275681 6.44092 1.21551 4.53621 2.79441L6.32814 4.64899C7.73161 3.5212 9.4233 2.79441 11.2152 2.54379V0.0375929ZM2.76935 4.56128C1.20254 6.46266 0.238342 8.78808 0 11.2403H2.5062C2.74428 9.46089 3.44602 7.76921 4.56128 6.35321L2.76935 4.56128ZM16.8542 8.10754L10.739 14.2227L8.08248 11.5661L6.7542 12.8944L10.739 16.8792L18.1824 9.43583L16.8542 8.10754ZM0.012531 13.7465C0.263151 16.2026 1.22804 18.5208 2.78188 20.4255L4.56128 18.6336C3.4547 17.2171 2.74924 15.5291 2.51873 13.7465H0.012531ZM6.32814 20.4756L4.53621 22.1924C6.43438 23.7746 8.75824 24.76 11.2152 25.0244V22.5182C9.43257 22.2877 7.74465 21.5822 6.32814 20.4756Z"
              fill="#FD8A03"
            />
          </svg>
        ) : (
          <svg
            width="25"
            height="25"
            className={styles.compIcon}
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="25" height="25" rx="12.5" fill="#CCCCCC" />
          </svg>
        )}
      </div>
      <div className={styles.button}>Approve</div>
      <div className={styles.removebutton}>
        <svg
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.97169 7.31787L13.1638 3.12575C13.7618 2.52775 13.7618 1.55822 13.1638 0.960219C12.5658 0.362219 11.5963 0.362219 10.9983 0.960219L6.80616 5.15234L2.61403 0.960219C2.01603 0.362219 1.0465 0.362219 0.4485 0.960219C-0.1495 1.55822 -0.1495 2.52775 0.4485 3.12575L4.64062 7.31787L0.4485 11.51C-0.1495 12.108 -0.1495 13.0775 0.4485 13.6755C0.7475 13.9745 1.13938 14.124 1.53125 14.124C1.92313 14.124 2.31503 13.9745 2.614 13.6755L6.80616 9.48341L10.9983 13.6755C11.2973 13.9745 11.6892 14.124 12.081 14.124C12.4729 14.124 12.8648 13.9745 13.1638 13.6755C13.7618 13.0775 13.7618 12.108 13.1638 11.51L8.97169 7.31787Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}

export default ChorePending;
