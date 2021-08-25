import React, { useState } from "react";
import styles from "../../styles/ParentStore/requestsAndHistorySection.module.scss";
import PendingRequests from "./PendingRequests";
function RequestsAndHistorySection({ setshowmodal }) {
  const [type, settype] = useState("Requests");
  const d = ["", "", "", ""];
  return (
    <div className={styles.requestsAndHistorySection}>
      <div className={styles.switch}>
        <p
          className={`${styles.tabs} ${
            type === "Requests" ? styles.selected : ""
          }`}
          onClick={() => {
            if (type !== "Requests") settype("Requests");
          }}
        >
          Requests
        </p>
        <p
          className={`${styles.tabs} ${
            type === "History" ? styles.selected : ""
          }`}
          onClick={() => {
            if (type !== "History") settype("History");
          }}
        >
          History
        </p>
      </div>
      <div className={styles.wrapper}>
        {d.map((item) => {
          return <PendingRequests setshowmodal={setshowmodal} />;
        })}
      </div>
    </div>
  );
}

export default RequestsAndHistorySection;
