import React from "react";
import styles from "../../styles/Dashboard/noapproval.module.scss";
import MascotSvg from "../SVGcomponents/MascotSvg";
function NoApproval() {
  return (
    <div className={styles.noapproval}>
      <MascotSvg className={styles.mascot} />
      <p>Currently there are no Approval pending.</p>
    </div>
  );
}

export default NoApproval;
