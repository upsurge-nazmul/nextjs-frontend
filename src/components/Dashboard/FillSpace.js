import React from "react";
import styles from "../../styles/Dashboard/fillspace.module.scss";
import MascotSvg from "../SVGcomponents/MascotSvg";

export default function FillSpace({ text, extrastyle }) {
  return (
    <div className={styles.fillspace} style={extrastyle}>
      <MascotSvg className={styles.mascot} />
      <p>{text}</p>
    </div>
  );
}
