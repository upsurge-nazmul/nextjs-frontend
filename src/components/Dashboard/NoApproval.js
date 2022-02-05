import React from "react";
import styles from "../../styles/Dashboard/noapproval.module.scss";
import Jasper from "../SVGcomponents/Jasper";
function NoApproval() {
  return (
    <div className={styles.noapproval}>
      <Jasper className={styles.mascot} />
      <p>Currently there are no Approval pending.</p>
    </div>
  );
}

export default NoApproval;
