import React, { useState } from "react";
import styles from "../../styles/ParentStore/requestsAndHistorySection.module.scss";
import FillSpace from "../Dashboard/FillSpace";
import HeadingArrow from "../SVGcomponents/HeadingArrow";
import PendingRequests from "./PendingRequests";
function RequestsAndHistorySection({
  setshowmodal,
  setbuydata,
  childRequests,
  setChildRequests,
  id,
}) {
  console.log(childRequests);
  const [type, settype] = useState("Requests");
  const [history, sethistory] = useState([]);
  return (
    <div className={styles.requestsAndHistorySection} id={id}>
      <h2 className={styles.heading}>Requests</h2>
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
          <FillSpace text="No requests" extrastyle={{ marginTop: 0 }} />
        )}
      </div>
    </div>
  );
}

export default RequestsAndHistorySection;
