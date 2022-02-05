import React from "react";
import styles from "../../styles/Dashboard/fillspace.module.scss";
import Jasper from "../SVGcomponents/Jasper";
import Curve1 from "../SVGcomponents/Curve1";
import Curve2 from "../SVGcomponents/Curve2";

export default function FillSpace({ text, extrastyle }) {
  return (
    <div className={styles.fillspace} style={extrastyle}>
      <Curve1 className={styles.curve1} />
      <Curve2 className={styles.curve2} />
      <Jasper className={styles.mascot} />
      <p>{text}</p>
    </div>
  );
}
