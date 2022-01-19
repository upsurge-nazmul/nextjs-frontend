import React, { useState } from "react";
import styles from "../../styles/ParentStore/requestsAndHistorySection.module.scss";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import PendingRequests from "./PendingRequests";
function RequestsAndHistorySection({
  setshowmodal,
  setbuydata,
  childRequests,
  setChildRequests,
}) {
  const [type, settype] = useState("Requests");
  const [history, sethistory] = useState([]);
  return (
    <div className={styles.requestsAndHistorySection}>
      <h2 className={styles.heading}>
        Requests
        <HeadingArrow />
      </h2>
      <div className={styles.wrapper}>
        {childRequests.length > 0 ? (
          childRequests.map((item, index) => {
            return (
              <PendingRequests
                key={item.id}
                data={item}
                setshowmodal={setshowmodal}
                setbuydata={setbuydata}
              />
            );
          })
        ) : (
          <div className={styles.norequest}>No requests</div>
        )}
      </div>
    </div>
  );
}

export default RequestsAndHistorySection;
