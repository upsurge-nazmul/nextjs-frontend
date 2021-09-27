import React, { useEffect, useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import { getCookie } from "../../actions/cookieUtils";
import styles from "../../styles/Chores/addassigneemodal.module.scss";
import { AddAssignees } from "../ManageChore/AddAssignee";

export default function AddAssigneeModal({
  assignees,
  onConfirm,
  setassignees,
  settoastdata,
  onCancel,
}) {
  const [children, setchildren] = useState([]);
  useEffect(() => {
    u();
    async function u() {
      let res = await DashboardApis.getkids(null, getCookie("accesstoken"));
      if (res && res.data && res.data.success) {
        setchildren(res.data.data);
        console.log(res.data.data);
      } else {
        console.log(res.data);
      }
    }
  }, []);

  return (
    <div className={styles.addassigneemodal}>
      <div className={styles.background} onClick={onCancel}></div>
      <div className={styles.box}>
        <h2>Add Assignee</h2>
        <div className={styles.assigneewrapper}>
          {children.map((child) => {
            return (
              <AddAssignees
                data={child}
                setassignees={setassignees}
                key={child.id}
                added={assignees.some((item) => item.id === child.id)}
              />
            );
          })}
        </div>

        <div className={styles.wrapper}>
          <div className={styles.close} onClick={onCancel}>
            Done
          </div>
        </div>
      </div>
    </div>
  );
}
