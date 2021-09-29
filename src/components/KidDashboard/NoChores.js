import React from "react";
import styles from "../../styles/Dashboard/noapproval.module.scss";
import MascotSvg from "../SVGcomponents/MascotSvg";
export default function NoChores() {
  return (
    <div className={styles.noapproval}>
      <MascotSvg className={styles.mascot} />
      <p>Currently there are no Chores pending.</p>
    </div>
  );
}
